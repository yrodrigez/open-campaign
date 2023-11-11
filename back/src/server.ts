import express, { Request, Response } from 'express';
import * as path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '..', 'webapp')));
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'webapp', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
