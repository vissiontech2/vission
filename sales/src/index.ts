import express from 'express'
import { json } from 'body-parser';
import cors from 'cors';


const app = express();

app.use(json());


app.use(cors());


app.get('/sales/', (req: express.Request, res: express.Response) => {
    res.send('sales: i am alive')
})


app.listen(3001, () => {
    console.log('listening on port 3001');
})