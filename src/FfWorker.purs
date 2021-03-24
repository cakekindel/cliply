module Workers.Ffmpeg where

import Prelude

import Ffmpeg (FfEither)
import Effect (Effect)
import Effect.Worker (Worker)
import Effect.Aff (Aff, launchAff_)
import Effect.Aff.Link as Link
import Effect.Aff.Worker.Link (parentLink)

data Action = Exec (Array String)
type Out = (FfEither (Array String))
newtype FfWorker = FfWorker (Worker Action Out)

main :: Effect Unit
main = launchAff_
     $ do
         link <- parentLink :: Aff (Link.Link Out Action)
         pure unit
