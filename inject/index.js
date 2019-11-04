__webpack_public_path__ = "test";

import { browserRegexps } from "../src/runtime-info/buildInfo";
import injectScript from "./injectScript";
import { toStaticHostUrl, isLocal } from "../src/runtime-info/envInfo";

const legacyRegexp = new RegExp(browserRegexps.legacy)
const modernRegexp = new RegExp(browserRegexps.modern)

const ua = window.navigator.userAgent
const isLegacyOrBetter = legacyRegexp.test(ua)
const isModernOrBetter = modernRegexp.test(ua)
const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(ua)

console.info(`leg: ${isLegacyOrBetter}, mod: ${isModernOrBetter}, bot: ${isBot}`)

window.onload = function() {
  if (isModernOrBetter) {
    injectScript(toStaticHostUrl('/dist/main.modern.bundle.js'))
  } else {
    injectScript(toStaticHostUrl('/dist/main.bundle.js'))
    if (!isLegacyOrBetter && !isBot) {
      const eUnsupportedBrowserWarning = document.createElement('div');
      eUnsupportedBrowserWarning.setAttribute('class', 'unsupported-browser-warning');
      eUnsupportedBrowserWarning.innerHTML = 'It looks like you\'re using an outdated browser, you should consider upgrading! This may not actually be true but we loaded a more compatible version of the site just in case.';
      const head = document.body;
      head.insertBefore(eUnsupportedBrowserWarning, head.firstChild);
      console.log('inserted')
    }
  }
}
