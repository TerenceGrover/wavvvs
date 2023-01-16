import express from 'express';
import cors from 'cors';
import router from './router.js';
import seedScript from './seedScript.js';
import removeExpiredTracksCronJob from './cronJob.js';

const port = 3001;

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

app.listen(port, () => {
  console.log(`Web server running: http://localhost:${port}`);
});

export default app;
