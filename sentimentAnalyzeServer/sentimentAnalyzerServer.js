const express = require('express');
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

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
        'text': 'Leonardo DiCaprio won Best Actor in a Leading Role for his performance.',
        'features': {
            'entities': {
                'emotion': true,
                'sentiment': true,
                'limit': 2,
          },
          'keywords': {
                'emotion': true,
                'sentiment': true,
                'limit': 2,
          },
        },
    };
    return naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        return res.send(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
    });
});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
        'features': {
          'relations': {}
        },
        'text': 'Leonardo DiCaprio won Best Actor in a Leading Role for his performance.'
    };
    return naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        return res.send(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

