module FontAwesome where

import Prelude

import Data.Newtype (wrap)
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP

import Halogen.Utils (class RenderHtml)

data Icon = Clock

instance renderIcon :: RenderHtml Icon where
  renderHtml icon = HH.i [HP.classes classes] []
    where classes = case icon of
                      Clock -> wrap <$> ["fas", "fa-clock"]
