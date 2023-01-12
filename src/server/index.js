import express from 'express';
import cors from 'cors';

const app = express();

const port = 3001;

app.use(express.json()).use(cors()).use(express.static('./public'));

app.listen(port, () => {
  console.log(`Web server running: http://localhost.com:${port}`);
});

export default app;
