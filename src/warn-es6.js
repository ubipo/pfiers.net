/**
 * Warns non-es6 (no type="module") users.
 */

console.error("Non-es6 compatible browser, showing warning...")
document.getElementById('es6-warning').classList.remove('hidden')
