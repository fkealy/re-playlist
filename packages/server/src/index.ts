import express from 'express';
import cors from 'cors';
import { join } from 'path';
import routes from './routes';

const clientPath = '../../client/build';
const app = express();
app.use(cors())
  .use('/', routes);
const port = process.env.port || 3000;
const App_Name = process.env.APP_NAME;

// Serve static resources from the "public" folder (ex: when there are images to display)
app.use(express.static(join(__dirname, clientPath)));

// Serve the React application for any routes that don't match a static resource
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, clientPath, 'index.html'));
});

// start the Express server
app.listen(port, () => {
    console.log(`app ${App_Name} started at http://localhost:${port}` );
});