'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var pluginutils = require('@rollup/pluginutils');
var istanbul = _interopDefault(require('istanbul-lib-instrument'));

function index (options = {}) {
  const filter = pluginutils.createFilter(options.include, options.exclude);

  return {
    transform (code, id) {
      if (!filter(id)) return;

      var instrumenter;
      var sourceMap = !!options.sourceMap;
      var opts = Object.assign({}, options.instrumenterConfig);

      if (sourceMap) {
        opts.codeGenerationOptions = Object.assign({},
          opts.codeGenerationOptions || {format: {compact: !opts.noCompact}},
          {sourceMap: id, sourceMapWithCode: true}
        );
      }

      opts.esModules = true;
      instrumenter = new (options.instrumenter || istanbul).createInstrumenter(opts);

      code = instrumenter.instrumentSync(code, id);

      var map = sourceMap ?
        instrumenter.lastSourceMap().toJSON() :
        {mappings: ''};

      return { code, map };
    }
  };
}

module.exports = index;
