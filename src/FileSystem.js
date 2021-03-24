const const_ = val => () => val;

const catchE = fun => err => {
  try {
    return fun();
  } catch (e) {
    return err(e);
  }
};

const set_ = obj => k => v => {
  const cloned = Object.assign(obj, {});
  cloned[k] = v;
  return cloned;
};

const scrubType = unwrap =>
                  ({ description, accept }) =>
                  ({ description: unwrap(undefined)(description)
                   , accept: accept.reduce( (obj, {mimeType, extensions}) => set_(obj)(mimeType)(extensions)
                                          , {}
                                          )
                   });

const scrubOpts = unwrap =>
                    opts => ({ multiple: unwrap(undefined)(opts.multiple)
                             , excludeAcceptAllOption: unwrap(undefined)(opts.excludeAcceptAllOption)
                             , types: opts.types.map(scrubType)
                             });

exports.getFile = handle => handle.getFile();
exports.getWritable = handle => handle.createWritable();
exports._showOpenFilePicker = unwrap =>
                                 win =>
                                opts =>
                                  () => win.showOpenFilePicker(scrubOpts(unwrap)(opts))
                                           .catch(const_([]));
