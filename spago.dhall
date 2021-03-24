{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "cliply"
, dependencies = [ "console"
                 , "effect"
                 , "avar"
                 , "aff-promise"
                 , "halogen"
                 , "psci-support"
                 , "strings"
                 , "stringutils"
                 , "web-file"
                 , "argonaut-core"
                 , "argonaut-codecs"
                 , "workly"
                 ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
