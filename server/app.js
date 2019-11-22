const Tesseract = require('tesseract.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', parameterLimit: 10000, extended: true}));

app.post('/convert',(req,res) => {
  const { url } = req.body;
  Tesseract.recognize(
    url,
    'eng',
    { logger: log => console.log(log) }
  ).then( ocrResult => {
    const { data: {text} } = ocrResult;
    res.send(text);
  }).catch( err => {
    console.error(err);
    res.send('Failed to recognize text');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});