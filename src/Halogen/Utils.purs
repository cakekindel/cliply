module Halogen.Utils where

import Prelude

import Unsafe.Coerce (unsafeCoerce)
import Data.Array (head)
import Data.Newtype (unwrap)
import Data.Maybe (Maybe(..), maybe)
import Data.Foldable (findMap)
import Data.String (joinWith, split, Pattern(..))
import Halogen.HTML.Core (ClassName(..), HTML(..))
import Halogen.Query.Input (Input)
import Halogen.VDom (VDom(..))
import Halogen.VDom.DOM.Prop (Prop(..), propFromString)
import Halogen.HTML.Properties as HP

class ShowClass a where
  showClass :: a -> ClassName

class RenderHtml a where
  renderHtml :: forall w i. a -> HTML w i

type PropArray i = Array (Prop (Input i))

mapElemProps :: forall w i. (PropArray i -> PropArray i) -> HTML w i -> HTML w i
mapElemProps f (HTML (Elem ns name attrs children)) = HTML (Elem ns name (f attrs) children)
mapElemProps _ html = html

propValueWhenName :: forall i. String -> Prop (Input i) -> Maybe String
propValueWhenName name prop
  | Property name' val <- prop
  , name == name' = Just (unsafeCoerce val)
  | otherwise = Nothing

-- newtype ShowableProp i = ShowableProp (Prop i)
-- instance showProp :: Show (ShowableProp i) where
--   show (ShowableProp (Attribute ns k v)) = "Attribute "
--                                         <> "(Namespace " <> (show (unwrap <$> ns)) <> ") "
--                                         <> k
--                                         <> " "
--                                         <> v
--   show (ShowableProp (Property k v)) = "Property "
--                                         <> k
--                                         <> " "
--                                         <> (isString v)
--   show _ = "unsupported prop type"

elemClasses :: forall w i. HTML w i -> Array String
elemClasses html = unjoinClasses classPropValue
  where
    classPropValue = maybe "" identity $ attrs >>= findMap (propValueWhenName "className")
    attrs = case html of
              HTML (Elem  _ _ attrs' _) -> Just attrs'
              HTML (Keyed _ _ attrs' _) -> Just attrs'
              _                        -> Nothing

unjoinClasses :: String -> Array String
unjoinClasses = split (Pattern " ")

mapClasses :: forall w i. (Array String -> Array String) -> HTML w i -> HTML w i
mapClasses f =
  let
    updateClass (Property "className" value) = Property "className" $ propFromString (mapJoined $ unsafeCoerce value)
    updateClass prop = prop

    mapJoined cs = joinWith " " (f $ unjoinClasses cs)
  in
    mapElemProps (map updateClass)

classes :: forall r i. Array String -> HP.IProp (class :: String | r) i
classes strings = HP.classes (strings <#> ClassName)
