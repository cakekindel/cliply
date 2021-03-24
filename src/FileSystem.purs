module FileSystem ( FileType
                  , FileHandle
                  , WritableFileStream
                  , FileTypeDescriptor
                  , OpenFilePickerOptions
                  , openFilePicker
                  , fileTypes
                  ) where

import Prelude

import Effect (Effect)
import Effect.Aff (Aff)
import Control.Promise (Promise, toAffE)
import Web.HTML (Window)
import Web.File.File (File)
import Data.Maybe (Maybe, maybe)

type FileType = { mimeType   :: String
                , extensions :: Array String
                }
type FileTypeDescriptor = { description :: Maybe String
                          , accept      :: Array FileType
                          }

type OpenFilePickerOptions = { multiple               :: Maybe Boolean
                             , excludeAcceptAllOption :: Maybe Boolean
                             , types                  :: Array FileTypeDescriptor
                             }

foreign import data FileHandle :: Type
foreign import data WritableFileStream :: Type

fileTypes :: { mp4 :: FileTypeDescriptor }
fileTypes  = { mp4: { description: pure "MP4 Video"
                    , accept: [ { mimeType: "video/mp4"
                                , extensions: ["mp4"]
                                }
                              ]
                    }
             }

openFilePicker :: Window -> OpenFilePickerOptions -> Aff (Array FileHandle)
openFilePicker win opts = _showOpenFilePicker orDefault win opts # toAffE
  where orDefault def = maybe def identity

foreign import _showOpenFilePicker :: forall a
                                    . (a -> Maybe a -> a)
                                   -> Window
                                   -> OpenFilePickerOptions
                                   -> Effect (Promise (Array FileHandle))

foreign import getFile :: FileHandle -> Effect (Promise File)
foreign import getWritable :: FileHandle -> Effect (Promise WritableFileStream)
