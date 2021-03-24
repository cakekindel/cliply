module Main where

import Prelude

import Effect (Effect)
import Effect.Class (class MonadEffect)
import Effect.Aff.Class (class MonadAff)
import Effect.Console (log)
import Web.HTML (window)
import Data.Newtype (wrap)
import Data.Traversable (sequence)
import Data.Maybe (Maybe(..))
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Halogen.VDom.Driver (runUI)

import Video (Video(..))
import Halogen.Utils (classes, renderHtml)
import Common.Card (card, defaultCardProps)
import Section.Header as Header
import Section.Body as Body
import FileSystem as FS
import Ffmpeg as Ff

main :: Effect Unit
main = HA.runHalogenAff do
         body <- HA.awaitBody
         runUI component unit body

type State = {videos :: Array Video}
data Action = NewVideo | ExportAll

component :: ∀ q i o m. MonadEffect m => MonadAff m => H.Component q i o m
component =
  let
    initialState _ = {videos: []}
    render {videos} = HH.div [classes ["app"]]
                             [ Header.render onHeaderAction
                             , appLogo
                             , Body.render videos
                             ]
    onHeaderAction Header.NewVideo  = NewVideo
    onHeaderAction Header.ExportAll = ExportAll
    appLogo  = card (defaultCardProps { classes = ["grid-logo"] })
                    []
  in H.mkComponent { initialState
                   , render
                   , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
                   }

handleAction :: ∀ cs o m. MonadEffect m => MonadAff m => Action -> H.HalogenM State Action cs o m Unit
handleAction = case _ of
                 NewVideo -> do
                   win <- eff window
                   newFiles <- await $ pickFile win
                   newVideos <- sequence $ fileToVideo <$> newFiles
                   H.modify_ (\{videos} -> {videos: videos <> newVideos})
                 _ -> mempty
  where
    eff = H.liftEffect
    await = H.liftAff
    pickFile win = FS.openFilePicker win filePickerOpts
    fileToVideo file = do
      runtime <- pure $ wrap 10.0 --Ff.runtime file
      thumbnailUri <- pure "" --Ff.thumbnail file
      title <- pure "" --fileName file
      pure $ Video { thumbnailUri, title, runtime, file }
    filePickerOpts = { excludeAcceptAllOption: pure true
                     , multiple: pure true
                     , types: [FS.fileTypes.mp4]
                     }
