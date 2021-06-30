const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2021-03-25',
    header: "Content-Type: application/json",
    authenticator: new IamAuthenticator({
      apikey: process.env.API_KEY,
    }),
    serviceUrl: process.env.API_URL,
  });

const app = new express();

app.use(express.static('build'));

const cors_app = require('cors');
app.use(cors_app());

app.get("/text", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': {
                'emotion': true,
                'sentiment': true,
            },
            'keywords': {
                'emotion': true,
                'sentiment': true,
            },
        },
    };
    return naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        return res.send(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
        console.log("err: ",err)
        return res.send(err);
    });
});

app.get("/url", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
                'emotion': true,
                'sentiment': true,
            },
            'keywords': {
                'emotion': true,
                'sentiment': true,
            },
        },
    };
    return naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        return res.send(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
        return res.send(err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

