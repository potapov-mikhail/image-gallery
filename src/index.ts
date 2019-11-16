import cors from 'cors';
import { resolve } from 'path';
import express, { Application, Request, Response } from 'express';

import { ApiResponse } from './interfaces';
import { getImagesByPage, searchImage } from './unsplash.api';

const PORT = process.env.PORT || 3000;
const ACCESS_KEY: string = process.env.ACCESS_KEY || '';

if (!ACCESS_KEY) {
  throw new Error('ACCESS KEY IS REQUIRED');
}

const app: Application = express();
app.use(cors());
app.use(express.static(resolve(__dirname, '..', 'client', 'dist', 'picture-gallery')));

app.get('/api/images', async (req: Request, res: Response) => {
  let result: ApiResponse;
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || '';

  try {
    if (search) {
      result = await searchImage(search, page, ACCESS_KEY);
    } else {
      result = await getImagesByPage(page, ACCESS_KEY);
    }

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Internal Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on PORT=${PORT} PID=${process.pid}`));
