module Common where

import Prelude

import Data.String.Utils (startsWith, endsWith)
import Data.Maybe (Maybe(..))
import Halogen.HTML.Core (ClassName(..))
import Halogen.Utils (class ShowClass)

data Shade = Light | Lighter | Dark | Accent
data Theme = Primary | Secondary

data Color = Color Theme Shade

colorFromClass :: String -> Maybe Color
colorFromClass str =
  let
    theme = if startsWith "theme-primary" str then
              Just Primary
            else if startsWith "theme-secondary" str then
              Just Secondary
            else Nothing
    shade = if endsWith "-lighter" str then
              Lighter
            else if endsWith "-light" str then
              Light
            else if endsWith "-dark" str then
              Dark
            else
              Accent
  in (\t -> Color t shade) <$> theme

instance colorClass :: ShowClass Color where
  showClass (Color theme shade) =
    let
      suffix = case shade of
                 Lighter -> "-lighter"
                 Light   -> "-light"
                 Dark    -> "-dark"
                 _       -> ""
      theme' = case theme of
                 Primary   -> "primary"
                 Secondary -> "secondary"
    in
      ClassName ("theme-" <> theme' <> suffix)
