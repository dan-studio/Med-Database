from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

from pymongo import MongoClient

# client = MongoClient('mongodb://test:test@localhost', 27017)
client = MongoClient('localhost', 27017)
db = client.medDB

#HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/list', methods=['GET'])
def list_product():
  lists = list(db.products.find({}, {'_id': False}))
  return jsonify({'all_lists': lists})

#API 역할을 하는 부분
@app.route('/list', methods=['POST'])
def register_product():
  sort_receive = request.form['sort_give']
  compName_receive = request.form['compName_give']
  prodName_receive = request.form['prodName_give']
  regDate_receive = request.form['regDate_give']

  doc = {
    'sort': sort_receive,
    'compName': compName_receive,
    'prodName': prodName_receive,
    'regDate': regDate_receive,
  }
  db.products.insert_one(doc)
  return jsonify({'msg': '등록 성공!'})
  
@app.route('/delete', methods=['POST'])
def delete_product():
    name_receive = request.form['name_give']
    db.products.delete_one({'prodName':name_receive})
    return jsonify({'msg': '삭제가 완료되었습니다!'})  

if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)