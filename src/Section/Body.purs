module Section.Body where

import Prelude

import Effect (Effect)
import Data.Maybe (Maybe(..))
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Halogen.VDom.Driver (runUI)

import Video as V
import Halogen.Utils (classes, renderHtml)
import Common.Card (card, defaultCardProps)

render :: forall w i. Array V.Video -> HH.HTML w i
render videos = card (defaultCardProps { classes = ["grid-body"] })
                   $ renderHtml <$> videos
