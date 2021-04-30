const recursive = require("recursive-readdir");
const path = require('path');
const fs = require('fs').promises;

if (process.argv.length < 3) throw Error("Usage: postprocess-prerendered.js <baseUrl>")
const baseUrl = process.argv[2]
console.info(`Using baseUrl="${baseUrl}"`)

recursive('prerendered', async (err, files) => {
  const htmlFiles = files.filter(file => path.extname(file) === '.html');
  const jsEnabledClassRe = /(?<=class=")js-enabled(?=")/g
  const prodDistOriginRe = /(?<=data-proddistorigin=")(?=")/g
  const localUrlRe = /http:\/\/(content\.local|dist\.local|localhost)(:\d+)?/g
  const htmlFileWasChangedList = await Promise.all(htmlFiles.map(async htmlFile => {
    const content = await fs.readFile(htmlFile)
    const contentStr = content.toString()
    const jsEnabledClassReplaced = contentStr.replaceAll(jsEnabledClassRe, '')
    const prodDistOriginSet = jsEnabledClassReplaced.replaceAll(prodDistOriginRe, baseUrl)
    const localUrlsRewritten = prodDistOriginSet.replaceAll(localUrlRe, baseUrl)
    await fs.writeFile(htmlFile, localUrlsRewritten)
    return contentStr.length !== localUrlsRewritten.length
  }))
  const nbroHtmlFilesChanged = htmlFileWasChangedList.filter(changed => changed).length
  console.info(`Processed ${htmlFiles.length} html files (changed ${nbroHtmlFilesChanged})`)
});



// cd dist-prerendered
// find . -type f -name "*.html" -exec sed -E -i 's/http:\/\/(content.local|dist.local|localhost):8000/https:\/\/pfiers.net/g' {} +
// echo "Prerender origin set to production"

// find . -type f -name "*.html" -exec sed -E -i 's/(?<=class=")js-enabled(?=")//g' {} +
// echo "js-enabled class removed from body"
