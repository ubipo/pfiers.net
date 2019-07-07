import Main from './components/Main'
import { version, buildMode } from './versionInfo'

console.info(`piterfiers.net@${version} ${buildMode}`) // eslint-disable-line no-console

const main = new Main()

window.addEventListener('load', () => {
  main.$mount('#app')
})
