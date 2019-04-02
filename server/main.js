require('dotenv').config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {google} from "googleapis";

const app = express();
const port = 3000;

console.log(google);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1>Welcoming</h1>');
  });
  
app.listen(port, (err) => {
    if(err) console.error(err);
    console.log(`My Blog App listening on port ${port}!`)

})