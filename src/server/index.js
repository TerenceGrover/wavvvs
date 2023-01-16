import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './router.js';
import seedScript from './seedScript.js';
import removeExpiredTracksCronJob from './cronJob.js';

const { PORT, HOST_NAME } = process.env;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('./public'));
app.use(router);

app.get('*', (req, res) => {
  res.status(404);
  res.send('Not Found');
});

seedScript();

const intervalID = removeExpiredTracksCronJob();

app.listen(PORT, () => {
  console.log(`Web server running: ${HOST_NAME}:${PORT}`);
});

export default app;
