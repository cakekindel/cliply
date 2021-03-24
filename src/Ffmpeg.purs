module Ffmpeg where

import Prelude

import Data.Array as A
import Data.Either (Either(..))
import Data.Maybe (Maybe)
import Data.Newtype (class Newtype, wrap)
import Effect (Effect)
import Effect.Uncurried ( EffectFn2
                        , runEffectFn2
                        )
import Effect.Aff (Aff, launchAff_, delay)
import Effect.Class (liftEffect)
import Effect.Aff.Link as Link
import Control.Promise (Promise, toAffE)
import Web.File.File (File)
import Data.Time.Duration (Milliseconds(..))

newtype Err = Err String
derive newtype instance showErr :: Show Err
derive instance newtypeErr :: Newtype Err _

type FfEither ok = Either (Array Err) ok

data Output = Debug  String
            | Error  String
            | Output String

instance showOutput :: Show Output where
  show (Debug s)  = "Debug (" <> s <> ")"
  show (Error s)  = "Error (" <> s <> ")"
  show (Output s) = "Output (" <> s <> ")"

type OutputCtor = String -> Output
type OutputCtors = { debug :: OutputCtor
                   , out   :: OutputCtor
                   , err   :: OutputCtor
                   }

outputCtors :: OutputCtors
outputCtors =  {debug: Debug, out: Output, err: Error}

getStr :: Output -> String
getStr (Debug s)  = s
getStr (Error s)  = s
getStr (Output s) = s

getErrs :: Array Output -> Array Err
getErrs os = A.filter isErr os <#> (getStr >>> Err)

isErr :: Output -> Boolean
isErr (Error _) = true
isErr _         = false

isOutput :: Output -> Boolean
isOutput (Output _) = true
isOutput _          = false

type CreateFfOptions = { corePath     :: String
                       , logToConsole :: Boolean
                       , onOutput     :: Output -> Effect Unit
                       , onProgress   :: Number -> Effect Unit
                       }

data Ff = Ff { client   :: FfClient
             , progress :: Link.Channel Number
             , output   :: Link.Channel (Array Output)
             }

corePath = "https://github.com/cakekindel/ffmpeg.wasm-core/releases/download/v0.1.0/ffmpeg-core.js"

new :: Aff Ff
new = do
        progress <- Link.newChannel :: Aff (Link.Channel Number)
        output   <- Link.newChannel :: Aff (Link.Channel (Array Output))
        Link.put [] output

        let opts = { corePath
                   , logToConsole: true
                   , onOutput: \o -> launchAff_
                                   $ do
                                       arr <- Link.read output
                                       Link.put (arr `A.snoc` o) output
                   , onProgress: \p -> launchAff_ $ Link.put p progress
                   }
        client <- liftEffect (createClient opts)
        pure $ Ff {client, progress, output}

progress :: Ff -> Aff (Maybe Number)
progress (Ff {progress}) = Link.snap progress

output :: Ff -> Aff (Array Output)
output (Ff {output}) = Link.read output

result :: Ff -> Aff (FfEither (Array String))
result ff@(Ff {progress, output}) = do
              p <- Link.read progress
              o <- Link.read output

              if A.any isErr o then do
                pure $ Left (getErrs o)
              else if p == 100.0 then do
                _ <- Link.take progress
                _ <- Link.take output
                pure $ Right (getStr <$> A.filter isOutput o)
              else do
                delay $ wrap 50.0 -- poll every 50ms
                result ff

-- videoLength :: FfClient -> File -> Aff Milliseconds
-- videoLength client file = Milliseconds <$> (toAffE $ videoLength_ client file)

createClient :: CreateFfOptions -> Effect FfClient
createClient = (runEffectFn2 create_) outputCtors

exec :: Ff -> Array String -> Aff (FfEither (Array String))
exec ff@(Ff {client}) args = do
                               toAffE $ runEffectFn2 exec_ client args
                               result ff

foreign import data FfClient :: Type
foreign import create_ :: EffectFn2 OutputCtors CreateFfOptions FfClient
foreign import exec_   :: EffectFn2 FfClient (Array String) (Promise Unit)
