require('dotenv').config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {OAuth2Client} from 'google-auth-library';
const app = express();
const port = 3000;

console.log();

const key = {
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    secret_id: process.env.GOOGLE_OAUTH_SECRET_CLIENT_ID,
    redirect_uri: 'https://maily-test.herokuapp.com'
};

function logOauth(){
        const oauthClient = new OAuth2Client(key.client_id, key.secret_id, key.redirect_uri);
        let scopes = [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/spreadsheets',
        ];
        const authorizeUrl = oauthClient.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
          });

          console.log(authorizeUrl);
}

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1>Welcoming</h1>');
    logOauth();
});

app.get('/oauth2callback', (req, res) => {
    console.log(require('util').inspect(req.body));
    res.send(`Refresh t`);
});
  
app.listen(port, (err) => {
    if(err) console.error(err);
    console.log(`My Blog App listening on port ${port}!`)

})