import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import connect from './database/dbconnection.js';
import router from './router/route.js';

const app = express();

/** middilewares */

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); //for security purpose

const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home get request");
});

/** api routes */
app.use('/api',router);

/** start the server -- on valid db connection*/
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on http://localhost:${port}`);
        })
    } catch (error) {
        console.log('db connection not established');
    }
}).catch(error =>{
    console.log('invalid db connection...')
})