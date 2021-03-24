module Video where

import Prelude

import Data.Time.Duration (class Duration, Milliseconds(..), Hours(..), Minutes(..), Seconds(..), convertDuration, fromDuration)
import Data.Array (catMaybes)
import Data.Foldable (intercalate)
import Data.Map (lookup)
import Data.Maybe (Maybe(..), maybe)
import Data.Newtype (class Newtype, unwrap, over)
import Data.Int as Int
import Data.String as S
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Halogen.HTML.Core (HTML)

import Common.Card (card, defaultCardProps)
import Halogen.Utils (classes, class RenderHtml, renderHtml)
import FileSystem as FS
import FontAwesome as FA

newtype Video = Video { thumbnailUri :: String
                      , title        :: String
                      , runtime      :: Milliseconds
                      , file         :: FS.FileHandle
                      }

--| format a duration in the form of HR:MIN:SEC
--| if hours is 0, formats as MIN:SEC
--| and ensures segments always 2 digits long (leading zero)
durationPretty :: Milliseconds -> String
durationPretty millis = intercalate ":" (catMaybes segments)
  where
    segments = [fmt <$> hours, fmt <$> minutes, fmt <$> seconds]

    fmt :: forall a. Newtype a Number => a -> String
    fmt seg = seg # unwrap
                  # Int.floor
                  # show
                  # addLeadingZero

    addLeadingZero s | S.length s == 1 = "0" <> s
                     | otherwise       = s

    hours :: Maybe Hours
    hours = if millis < convertDuration (Hours 1.0) then
              Nothing
            else
              Just $ convertDuration millis
    minutes = Just $ (remainder Minutes 60.0) (convertDuration millis)
    seconds = Just $ (remainder Seconds 60.0) (convertDuration millis)

    remainder :: forall a. Newtype a Number => (Number -> a) -> Number -> a -> a
    remainder ctor denominator = over ctor (\n -> mod n denominator)

instance renderVideo :: RenderHtml Video where
  renderHtml (Video {thumbnailUri, title, runtime})
    = card (defaultCardProps { classes = ["flex-vert"] })
           [ renderThumbnail
           , renderTitle
           , renderRuntime
           ]
    where
      renderThumbnail = HH.img [HP.src thumbnailUri]
      renderTitle = HH.h3_ [HH.text title]
      renderRuntime = HH.div [classes ["labelled-icon", "type-details"]]
                             [renderHtml FA.Clock, HH.p_ [HH.text (durationPretty runtime)]]
