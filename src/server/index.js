require('dotenv').config();

import express from "express";
import https from 'https';
import fs from 'fs';
import bodyParser from "body-parser";
import cors from "cors";
import {OAuth2Client} from 'google-auth-library';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router-dom';

// APP related
import App from '../shared/index';
import template from './template';
import routes from '../shared/routes';

const app = express();
const port = 3000;

var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
  };

const key = {
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    secret_id: process.env.GOOGLE_OAUTH_SECRET_CLIENT_ID,
    redirect_uri: 'https://localhost:3000/oauth2callback' // CHANGE THIS WHEN IN PRODUCTIOOOON
};

function generateAuthUrl(){
        const oauthClient = new OAuth2Client(key.client_id, key.secret_id, key.redirect_uri);
        let scopes = [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/spreadsheets',
        ];
        const authorizeUrl = oauthClient.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
          });

        return authorizeUrl;
}

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('dist'));

// HERE WE USE '*' BECAUSE WE WILL RENDER REACT FOR EVERY ROUTE 
app.get('*', (req, res, next) => {
    const activeRoute = routes.find((route) => matchPath(req.url, route));
    const data = 'Mikelu';
    const domString = renderToString(  
        <StaticRouter location={req.url} context={{}}>
            <App data={data}/>
        </StaticRouter>
    ); 

    res.send(template({
        title: 'Requestorm',
        body: domString,
        data
    }));

    next();

});

app.get('/oauth2callback', (req, res) => {
    res.send(`Refresh token, ${req.query.code}`);   
    // We receive the token --> send it to the DB --> we redirect to auth page
});

app.listen(3001, (err) => {
    if(err) console.error(err);
    console.log(`My Blog App listening on port 3001!`)

});

var httpsServer = https.createServer(options, app);
httpsServer.listen(port, (err) => {
    if(err) console.error(err);
    console.log(`My Blog App listening on port ${port}!`)

});

