const {strike, match, _} = require('@matchbook/ts');

const iff = pred => ok => els => pred() ? ok() : els();
const tapAsync = del => v => del().then(v);

const scrubLogMsg = ({out, debug, err}) =>
                    ({type, message}) => strike( type
                                               , match('fferr', err(message))
                                               , match('ffout', out(message))
                                               , _(debug(message))
                                               );

const scrubOpts = msgCtors =>
                  opts => ({ corePath: opts.corePath
                           , log: opts.logToConsole
                           , logger: iff (() => !opts.onLog)
                                         (undefined)
                                         (msg => opts.onLog(scrubLogMsg(msgCtors)(msg)))
                           , progress: iff (() => !opts.onProgress)
                                           (undefined)
                                           (({ratio}) => opts.onProgress(ratio))
                           });

exports.exec_ = client => args => client.run(...args);
exports.videoLength_ = client => file => client.run(...args);
exports.create_ = msgCtors => opts => createFfmpeg(scrubOpts(msgCtors)(opts))
                                        .then(tapAsync(client => client.load()));
