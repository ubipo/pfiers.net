const recursive = require("recursive-readdir");
const path = require('path');
const fs = require('fs').promises;

recursive("prerendered", async (err, files) => {
  const htmlFiles = files.filter(file => path.extname(file) === '.html');
  const jsEnabledClassRe = /(?<=class=")js-enabled(?=")/g
  const prodDistOriginRe = /(?<=data-proddistorigin=")(?=")/g
  const htmlFileWasChangedList = await Promise.all(htmlFiles.map(async htmlFile => {
    const content = await fs.readFile(htmlFile)
    const contentStr = content.toString()
    const jsEnabledClassReplaced = contentStr.replaceAll(jsEnabledClassRe, '')
    const prodDistOriginSet = jsEnabledClassReplaced.replaceAll(prodDistOriginRe, 'https://pfiers.net')
    await fs.writeFile(htmlFile, prodDistOriginSet)
    return contentStr.length !== prodDistOriginSet.length
    // const 
    // console.log(contentStr.length, replaced.length)
    // fs.writeFileSync(path.format({
    //   dir: parsed.dir,
    //   name: parsed.name + '-schema',
    //   ext: '.d.ts'
    // }), ts)
  }))
  const nbroHtmlFilesChanged = htmlFileWasChangedList.filter(changed => changed).length
  console.info(`Processed ${htmlFiles.length} html files (changed ${nbroHtmlFilesChanged})`)
});



// cd dist-prerendered
// find . -type f -name "*.html" -exec sed -E -i 's/http:\/\/(content.local|dist.local|localhost):8000/https:\/\/pfiers.net/g' {} +
// echo "Prerender origin set to production"

// find . -type f -name "*.html" -exec sed -E -i 's/(?<=class=")js-enabled(?=")//g' {} +
// echo "js-enabled class removed from body"
