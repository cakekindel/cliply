module Common.Card where

import Prelude

import Common (Theme(..), Color(..), Shade(..), colorFromClass)
import Data.Array (elem)
import Data.Newtype (unwrap)
import Data.Maybe (Maybe(..))
import Halogen.HTML as HH
import Halogen.HTML.Core (HTML)
import Halogen.Utils (classes, showClass, mapClasses, elemClasses)

type CardProps = { theme   :: Theme
                 , classes :: Array String
                 , depth   :: Int
                 }

defaultCardProps :: CardProps
defaultCardProps = { theme: Primary
                   , classes: []
                   , depth: 0
                   }

depthShade :: Int -> Shade
depthShade 0 = Lighter
depthShade 1 = Light
depthShade _ = Dark

isCard :: forall w i. HTML w i -> Boolean
isCard html = elemClasses html # elem "card"

markChildCardDepth :: forall w i. Int -> HTML w i -> HTML w i
markChildCardDepth parentDepth child =
  let
    childShade = depthShade (parentDepth + 1)
    updateColor c
      | Just (Color theme _) <- colorFromClass c
      = Color theme childShade # showClass # unwrap
      | otherwise = c
  in
    if isCard child then
      mapClasses (map updateColor) child
    else
      child

card :: forall w i. CardProps
                 -> Array (HTML w i)
                 -> HTML w i
card props children =
  let
    children' = children <#> markChildCardDepth props.depth
    theme = unwrap $ showClass (Color props.theme (depthShade props.depth))
    classAttr = classes (["card", theme] <> props.classes)
  in
    HH.div [classAttr] children'
