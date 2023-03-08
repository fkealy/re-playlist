import express from 'express';
import cors from 'cors';
import { join } from 'path';
import routes from './routes';

import { App_Name } from '@replaylist/common';
const clientPath = '../../client/build';
const app = express();
app.use(cors())
  .use('/', routes);
const port = process.env.port || 3000;

// Serve static resources from the "public" folder (ex: when there are images to display)
app.use(express.static(join(__dirname, clientPath)));

// start the Express server
app.listen(port, () => {
    console.log(`app ${App_Name} started at http://localhost:${port}` );
});
  