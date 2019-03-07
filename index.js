const server = require('./assists/server');

const port = 5000;
server.listen(port, () => console.log(`\n***** Running on port ${port} *****\n`));
