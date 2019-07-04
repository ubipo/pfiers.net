const jstt = require('json-schema-to-typescript');
const recursive = require("recursive-readdir");
const path = require('path');
const fs = require('fs');

recursive("src", (err, files) => {
  const jschemas = files.filter(file => path.extname(file) === '.jschema');
  console.log(`Compiling: ${jschemas.join(', ')}`)
  for (const jschema of jschemas) {
    jstt.compileFromFile(jschema, {
      style: {
        semi: false
      }
    }).then(ts => {
      const parsed = path.parse(jschema);
      fs.writeFileSync(path.format({
        dir: parsed.dir,
        name: parsed.name + '-schema',
        ext: '.d.ts'
      }), ts)
    });
  }
});

// compile from file
//