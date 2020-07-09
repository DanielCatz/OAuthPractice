const express = require('express');
require('dotenv').config();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const app = express();



const checkjwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://'+ process.env.REACT_APP_AUTH0_DOMAIN + '/.well-known/jwks.json'
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: 'https://'+ process.env.REACT_APP_AUTH0_DOMAIN+'/',
  algorithms: ['RS256']
});


app.get('/public', (req, res)=>{
    res.json({
        message: 'Response from a public API!'
    });
});

app.get('/private', checkjwt, (req, res)=>{
    res.json({
        message: 'Response from a private API!'
    });
});

app.listen(3001);
console.log("Api Server listenening on " + process.env.REACT_APP_API_URL);