const path = require('path');
const { promises: fsp }  = require("fs");

const xmljs = require('xml-js');


class SvgParsingException extends Error {
  name = 'FlattenSvgDirException'
}


module.exports = async function flattenSvgDir(svgDirPath) {
  const dirName = path.parse(svgDirPath).name

  const files = await fsp.readdir(svgDirPath)

  let prevViewBox = undefined
  const flatSvgEs = (await Promise.all(
    files.map(async function(filename) {
        const svgBuffer = await fsp.readFile(path.resolve(svgDirPath, filename))
        const root = xmljs.xml2js(svgBuffer)
        if (!root.hasOwnProperty('elements'))
          throw new SvgParsingException('No root elements')

        const svg = root.elements[0]
        if (!svg)
          throw new SvgParsingException('No svg element')

        if (!svg.hasOwnProperty('attributes'))
          throw new SvgParsingException('No svg attributes')

        const attributes = svg.attributes
        if (!attributes.hasOwnProperty('viewBox'))
          throw new SvgParsingException('No svg viewBox attribute')
        
        const viewBox = attributes.viewBox

        if (!svg.hasOwnProperty('elements') || svg.elements.length === 0)
          throw new SvgParsingException('No svg elements')
        
        const elements = svg.elements

        let eGroup = undefined
        const e0 = elements[0]
        if (elements.length === 1 && e0.name === 'g') {
          eGroup = e0
        } else {
          eGroup = {
            'type': 'element',
            'name': 'g',
            'attributes': {},
            'elements': elements
          }
        }

        eGroup.attributes.fill = '#fff'
        eGroup.attributes.id = `flatsvg-${dirName}-${filename}`

        return data = {
          'filename': filename,
          'viewBox': viewBox,
          'group': eGroup
        }
      }
    )
  )).reduce((prev, curr) => {
    if (prevViewBox && prevViewBox !== curr.viewBox) {
      //throw new SvgParsingException(`Different viewBox for ${curr.filename} ("${curr.viewBox}" vs "${prevViewBox}")`)
    }
    prevViewBox = curr.viewBox
    return prev.concat(curr.group)
  }, [])

  const svg = {
    type: 'element',
    name: 'svg',
    attributes: {
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1',
      viewBox: prevViewBox
    },
    elements: flatSvgEs
  }
  const root = {
    elements: [svg]
  }

  const xml = xmljs.js2xml(root)
  
  await fsp.writeFile(path.resolve(svgDirPath, 'flatsvg.svg'), xml)
}
