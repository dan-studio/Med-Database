
from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('mongodb://test:test@localhost', 27017)
# client = MongoClient('localhost', 27017)
db = client.medDB

#HTML을 주는 부분
@app.route('/')
def home():
    return render_template('login.html')

#로그인 페이지
@app.route('/index')
def login():
    return render_template('index.html')

#회원가입 페이지
@app.route('/register')
def register():
    return render_template('register.html')

#회원가입 기능
@app.route('/reg', methods=['POST', 'GET'])
def register_member():
  userID_receive = request.form['userID_give']
  userPW_receive = request.form['userPW_give']
  userPW_receive2 = request.form['userPW_give2']
  userName_receive = request.form['userName_give']
  userStatus_receive = request.form['userStatus_give']
  userInfo = {
    'userID' : userID_receive,
    'userPW' : userPW_receive,
    'userPW2' : userPW_receive2,
    'userName' : userName_receive,
    'userStatus' : userStatus_receive
  }

  db.members.insert_one(userInfo)
  #아이디 중복체크 만들어보기***
  # if db.members.find_one({"userID": userInfo['userID']}):
  #   return jsonify({'error':"이미 존재하는 아이디 입니다"})
  # else:
  #   return jsonify({'msg':'회원가입 완료! 승인을 기다려주세요!'})
  return jsonify({'msg':'회원가입 완료! 승인을 기다려주세요!'})

#로그인 기능

#제품 리스트 가져오기
@app.route('/list', methods=['GET'])
def list_product():
  lists = list(db.products.find({}, {'_id': False}))
  return jsonify({'all_lists': lists})

#API 역할을 하는 부분
#제품 등록
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
#제품 삭제
@app.route('/delete', methods=['POST'])
def delete_product():
    name_receive = request.form['name_give']
    db.products.delete_one({'prodName':name_receive})
    return jsonify({'msg': '삭제가 완료되었어요!'})  

if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)