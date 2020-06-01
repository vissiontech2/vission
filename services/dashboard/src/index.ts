import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

const app = express();


app.use(cors());

app.use(json())


app.get('/dashboard/', (req: express.Request, res: express.Response) => {
    res.send('dashboard: i am alive')
})


app.listen(3003, () => {
    console.log('listening on port 3003');
})