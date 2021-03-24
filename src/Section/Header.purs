module Section.Header where

import Prelude

import Effect (Effect)
import Data.Maybe (Maybe)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Halogen.HTML.Events as HE
import Halogen.VDom.Driver (runUI)

import Video as V
import Halogen.Utils (classes, renderHtml)
import Common.Card (card, defaultCardProps)

data HeaderAction = NewVideo | ExportAll

render :: forall w i. (HeaderAction -> i) -> HH.HTML w i
render cb = card (defaultCardProps { classes = ["grid-title"] })
                 [ HH.h1_ [HH.text "Videos"]
                 , HH.button [HE.onClick \_ -> cb NewVideo]
                             [HH.text "New Video"]
                 ]
