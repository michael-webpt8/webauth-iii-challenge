const server = require('./server');

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

server.listen(port, host, () => {
  console.log(`\n *** server listening on http:${host}:${port} *** \n`);
});
