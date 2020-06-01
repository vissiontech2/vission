import express from 'express'
import { json } from 'body-parser';
import cors from 'cors';


const app = express();

app.use(json());


app.use(cors());


app.get('/issue-tracking/', (req: express.Request, res: express.Response) => {
    res.send('issue tracking: i am alive')
})


app.listen(3004, () => {
    console.log('listening on port 3004');
})