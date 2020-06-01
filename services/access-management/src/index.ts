import express from 'express'
import { json } from 'body-parser';
import cors from 'cors';


const app = express();

app.use(json());


app.use(cors());


app.get('/access-management/', (req: express.Request, res: express.Response) => {
    res.send('access management: i am alive')
})


app.listen(3005, () => {
    console.log('listening on port 3005');
})