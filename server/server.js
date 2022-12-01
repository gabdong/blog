import express from 'express'; 
import path from 'path';

const app   = express();
const PORT  = process.env.port || 3000;

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(PORT, () => {
    console.log(`server on PORT:${PORT}`);
});