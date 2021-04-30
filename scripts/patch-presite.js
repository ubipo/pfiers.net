const path = require('path');
const fs = require('fs').promises;

const patchedMainCall = `
main().catch((error) => {
  console.error(error);
  process.exit(1);
}).then(() => {
  process.exit()
});
`

const main = async (err, files) => {
  const mainCallRe = /main\(\)[^}]+?}\);/g
  const presiteFile = 'node_modules/presite/dist/cli.js'
  const content = await fs.readFile(presiteFile)
  const contentStr = content.toString()
  const mainCallPatched = contentStr.replaceAll(mainCallRe, patchedMainCall)
  if (contentStr.length === mainCallPatched.length) throw Error('Couldn\'t patch presite (main() call not found)')
  await fs.writeFile(presiteFile, mainCallPatched)
  console.info('Patched presite')
}

main()
