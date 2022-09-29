import { assert } from "console"
import fs from "fs/promises"
import path from "path"
import xml2js from "xml2js"


const ICONS_DIR = "src/lib/assets/img/icons/sprite"
const VIEW_BOX = "0 0 128 128"

const iconPaths = await fs.readdir(ICONS_DIR)
// const iconNames = icons.map(icon => icon.replace(".svg", ""))
// const iconNamesString = iconNames.map(iconName => `"${iconName}"`).join(" | ")
const symbols = await Promise.all(iconPaths.map(async iconPath => {
  const icon = await fs.readFile(path.join(ICONS_DIR, iconPath), "utf-8")
  const iconName = iconPath.replace(".svg", "")
  const { svg } = await xml2js.parseStringPromise(icon)
  assert(svg, `Icon ${iconName} has no svg element`)
  assert(svg.$, `Icon ${iconName} has attributes`)
  assert(svg.$.viewBox === VIEW_BOX, `Icon ${iconName} viewBox is not ${VIEW_BOX} (was: '${svg.$.viewBox}')`)
  const paths = Object.entries(svg).filter(([key]) => {
    if (key === "$") return false
    assert(['g', 'path'].includes(key), `Icon ${iconName}: unexpected child element '${key}`)
    return true
  })
  return {
    $: {
      'id': iconName,
      'viewBox': VIEW_BOX
    },
    ...Object.fromEntries(paths)
  }
}))

const svg = {
  'svg': {
    $: {
      'width': '0',
      'height': '0',
      'style': 'display: none;'
    },
    'symbol': symbols
  }
}

var builder = new xml2js.Builder({
  renderOpts: {
    pretty: false,
  },
  headless: true,
});
var xml = builder.buildObject(svg);

console.log(xml)

// return {
//   'svg': {
//     $: {
//       'width': '0',
//       'height': '0',
//       'style': 'display: none;'
//     },
//     ...paths.map(path => ({
//       'symbol': {
//         $: {
//           'id': iconName,
//           'viewBox': VIEW_BOX
//         },
//         ...path
        
//   }

// const sprite = `
//   <svg width="0" height="0" style="display: none;">
//     ${symbols.join("")}
//   </svg>
// `
