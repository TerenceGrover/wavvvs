import express from 'express';
import cors from 'cors';
import router from './router.js';

const app = express();

const port = 3001;
app.use(express.json());
app.use(cors());
app.use(express.static('./public'));
app.use(router);

app.get('/', (req, res) => {
  res.status(200);
  res.send('ok');
});

app.listen(port, () => {
  console.log(`Web server running: http://localhost:${port}`);
});

export default app;
