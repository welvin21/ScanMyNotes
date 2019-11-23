from flask import Flask, request
from io import BytesIO
from PIL import Image
import requests

app = Flask(__name__)
app.debug = True

@app.route('/convert', methods=['POST'])
def index():
  url = request.form['url']
  res = requests.get(url)
  file = BytesIO(res.content)
  img = Image.open(file)
  #import text_detection module
  #return output
  return 'ok'
  
if(__name__ == '__main__'):
  app.run(port=3000)
