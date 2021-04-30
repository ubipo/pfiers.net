module.exports = {
  wait: 5000,
  // manually: true,
  routes: ['/', '/donate'],
  async onBrowserPage(page) {
    await page.exposeFunction('__isPrerender', () => true)
  },
  outDir: 'prerendered'
}
