import express from 'express'
import { json } from 'body-parser';
import cors from 'cors';


const app = express();

app.use(json());


app.use(cors());


app.get('/purchase/', (req: express.Request, res: express.Response) => {
    res.send('purchase: i am alive')
})


app.listen(3002, () => {
    console.log('listening on port 3002');
})