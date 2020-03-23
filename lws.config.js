module.exports = {
  stack: [ 'lws-cors', 'lws-static', 'lws-spa' ],
  directory: 'dist',
  port: 8000,
  spa: 'index.html',
  cors: {
    origin: '*'
  }
}