//할 것 : 리스트 개수 및 페이지 설정, mongoDB, 찾기기능, 번호 부여하기, 로그인기능

$(document).ready(function () {
  showProductList();
});

function registerMember() {
  let useremail = $('#useremail').val();
  let username = $('#username').val();
  let userpassword = $('#userpassword').val();
  let userpassword2 = $('#userpassword2').val();
  let CheckValue = $('input:checkbox[id="agreement"]').is(":checked");

  if (useremail.length == 0) {
    alert("이메일을 입력해 주세요")
  } else if (!useremail.includes('@daangnservice.com')) {
    alert("당근서비스 메일 형식이 아닙니다.")
  } else if (username.length == 0) {
    alert("이름을 입력해 주세요")
  } else if (userpassword.length == 0) {
    alert("비밀번호를 입력해 주세요")
  } else if (userpassword2.length == 0) {
    alert("비밀번호를 다시 입력해 주세요")
  } else if (userpassword !== userpassword2) {
    alert("비밀번호가 일치하지 않아요")
  } else if (CheckValue == false) {
    alert("회원가입 동의를 해주세요")
  } else {
    // $.ajax({
    //   type: "POST",
    //   url: "/reg",
    //   data: {
    //     userEmail_give: useremail,
    //     userName_give: username,
    //     userPW_give: userpassword,
    //     userPW_give2: userpassword2,
    //     userStatus_give: CheckValue
    //   },
    //   success: function (response) {
    //     alert(response["msg"]);
    //     window.location.href = "/";
    //   }
    // })
    const result = await fetch('/api/register',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        useremail, username, userpassword, CheckValue
      })
    }).then(res => res.json)
    console.log(result)
  }
}

function emailConfirm() {
  let useremail = $('#useremail').val();
  if (useremail.length == 0) {
    alert("이메일을 입력해 주세요")
  } else if (!useremail.includes('@daangnservice.com')) {
    alert("당근서비스 메일 형식이 아닙니다.")
  } else{
    alert(useremail + " 로 이메일이 전송 되었습니다!")
    $('#useremail').attr('readonly',true);
    $('#emailsend').hide();
    $('#nonDiv').show();
}
}
  // function login() {
  //   let userid = $('#userid').val();
  //   let userpassword = $('#userpassword').val();
  //   let userStatus = '';
  //   if (userid.length == 0) {
  //     alert("아이디를 입력해 주세요")
  //   } else if (userpassword.length == 0) {
  //     alert("비밀번호를 입력해 주세요")
  //   } else if (CheckValue != active) {
  //     alert("관리자가 승인해야만 로그인 가능합니다.")
  //   } else {
  //     $.ajax({
  //       type: "GET",
  //       url: "/login",
  //       data: {
  //         userID_give: userid,
  //         userPW_give: userpassword,
  //         userStatus_give: userStatus
  //       },
  //       success: function (response) {
  //         alert(response["msg"]);
  //         location.href = "http://localhost:5000/index";
  //       }
  //     })
  //   }
  // }

  function deleteAll() {
    let useremail = $('#useremail').val('');
    let username = $('#username').val('');
    let userpassword = $('#userpassword').val('');
    let userpassword2 = $('#userpassword2').val('')
  }

  function registerProduct() {
    let sort = $('#sort').val();
    let compName = $("#compName").val();
    let prodName = $("#prodName").val();
    let regDate = new Date().toLocaleString();
    if (sort == null) {
      alert("제품 유형을 선택해 주세요!")
    } else if (compName.length == 0) {
      alert("제조사를 입력하세요!")
    } else if (prodName.length == 0) {
      alert("제품명을 입력하세요!")
    } else {
      $.ajax({
        type: "POST",
        url: "/list",
        data: {
          sort_give: sort,
          compName_give: compName,
          prodName_give: prodName,
          regDate_give: regDate
        },
        success: function (response) {
          alert(response["msg"]); //데이터 
          window.location.reload();
        }
      })
    }

  }

  function showProductList() {
    $.ajax({
      type: "GET",
      url: "/list",
      data: {},
      success: function (response) {
        let lists = response['all_lists']
        for (let i = 0; i < lists.length; i++) {
          let index = lists[i];
          let sort = lists[i]['sort']
          let compName = lists[i]['compName']
          let prodName = lists[i]['prodName']
          let regDate = lists[i]['regDate']

          var temp_html = `<tr>
                              <td>${sort}</td>
                              <td>${compName}</td>
                              <td>${prodName}</td>
                              <td>${regDate}</td>
                              <td></td>
                              <td><a href="#" onclick="deleteConfirm('${prodName}')" class="deletebutton">삭제</a></td>
                            </tr>`;
          //등록순에 따라 순서 삽입하기.
          $("#medList").append(temp_html);
          console.log(lists[i])
        }
      }
    })
  }

  function deleteConfirm(prodName) {
    let confirmAction = confirm("정말로 삭제하시겠어요?");
    if (confirmAction == true) {
      $.ajax({
        type: 'POST',
        url: '/delete',
        data: {
          name_give: prodName
        },
        success: function (response) {
          alert(response['msg']);
          window.location.reload();
        }
      })
    } else {
      alert("삭제가 취소되었어요!")
    }
  }

  function search() {
    let txt = $("#search").val();
    if (txt == '') {
      alert('텍스트를 입력하세요!')
    } else {
      checked
      alert(txt);
      console.log(checked)
    }
  }