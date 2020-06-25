import { createFilter } from 'rollup-pluginutils';
import istanbul from 'istanbul-lib-instrument';

export default function (options = {}) {
  options.include = options.include || [];
  options.exclude = options.exclude || [];
  options.instrumenterConfig = options.instrumenterConfig || {};

  const filter = createFilter(options.include, options.exclude);

  return {
    transform (code, id) {
      if (!filter(id)) return;

      let instrumenter;
      const sourceMap = !!options.sourceMap;
      const opts = Object.assign({}, options.instrumenterConfig);

      opts.esModules = true;
      instrumenter = new (options.instrumenter || istanbul).createInstrumenter(opts);

      code = instrumenter.instrumentSync(code, id);

      const map = sourceMap ?
        instrumenter.lastSourceMap().toJSON() :
        {mappings: ''};

      return { code, map };
    }
  };
}
