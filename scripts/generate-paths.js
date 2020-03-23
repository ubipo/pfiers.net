const path = require('path');
const fs = require("fs");

function makeUrlSafe(str) {
  return encodeURIComponent(str.toLowerCase().replace(/ ?[ -] ?/g, '-'))
}

module.exports = () => {
  const content = fs.readFileSync(path.resolve(__dirname, "../content/site-data.json"));
  const data = JSON.parse(content)
  projectNames = data.projects.map(p => p.urlSafeName === undefined ? makeUrlSafe(p.name) : p.urlSafeName)
  technologyNames = data.technologies.map(t => t.urlSafeName === undefined ? makeUrlSafe(t.name) : t.urlSafeName)
  projectPaths = projectNames.map(p => `/projects/${p}`)
  technologyPaths = technologyNames.map(t => `/technologies/${t}`)
  paths = ['/', '/projects', '/technologies', ...projectPaths, ...technologyPaths]
  return paths
};
