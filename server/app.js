const Tesseract = require('tesseract.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', parameterLimit: 50000, extended: true}));

app.post('/convert',(req,res) => {
  let { base64 } = req.body;
  
  Tesseract.recognize(
    base64,
    'eng',
  ).then( ocrResult => {
    res.send(ocrResult.paragraphs[0].text);
  }).catch( err => {
    console.error(err);
    res.send('Failed to recognize text');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});