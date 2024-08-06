import express from 'express';
import appendroutes from './routes';

// Get port from the enviroment or use default
const port = process.env.PORT || 5000;

// create the app from the express
const server = express();

// parse the requests
server.use(express.json());

appendroutes(server);
// listen from the given port
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
