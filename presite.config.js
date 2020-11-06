module.exports = {
  port: 8000,
  wait: 4000,
  // manually: true,
  async onBrowserPage(page) {
    await page.exposeFunction('__isPrerender', () => true)
  },
}
