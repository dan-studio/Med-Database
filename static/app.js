//할 것 : 리스트 개수 및 페이지 설정, mongoDB, 찾기기능, 번호 부여하기, 로그인기능

$(document).ready(function () {
  show();
});

function getListValue(){
  let listValue = $('#sort').val();
  console.log(listValue)
}

function register() {
  var sort = $('#sort').val();
  var compName = $("#compName").val();
  var prodName = $("#prodName").val();
  var regDate = new Date().toLocaleString();
  console.log(sort, compName, prodName);
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
      if (sort == null) {
        alert("제품 유형을 선택해 주세요!")
      } else if (compName.length == 0) {
        alert("제조사를 입력하세요!")
      } else if (prodName.length == 0) {
        alert("제품명을 입력하세요!")
      } else {
        alert(response["msg"]);//데이터 
        
        window.location.reload();
      }
    }
  })
}

function show() {
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
                              <td>${index}</td>
                              <td>${sort}</td>
                              <td>${compName}</td>
                              <td>${prodName}</td>
                              <td>${regDate}</td>
                              <td></td>
                            </tr>`;
        //등록순에 따라 순서 삽입하기.
        $("#medList").append(temp_html);
        console.log(lists[i])
      }
    }
  })
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