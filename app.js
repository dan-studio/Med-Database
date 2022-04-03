function addNum() {
  const byNum = new Array();

  for (var i = 0; i < byNum.length; i++) {
    byNum.push(i);
  }
}

function getListValue() {
  //var selectedValue = document.getElementById('list').value;
  //const selected = selectedValue.val();
  var listChecked = $('#list').val();
  console.log(listChecked)
}

function register() {
  var listChecked = $('#list').val();
  var compName = $("#compName").val();
  var prodName = $("#prodName").val();
  console.log(listChecked, compName, prodName);
  if(listChecked == null){
    alert("제품 유형을 선택해 주세요!")
  } else if(compName.length == 0) {
    alert("제조사를 입력하세요!")
  } else if (prodName.length == 0) {
    alert("제품명을 입력하세요!")
  } else {
    var date = new Date().toLocaleString();
    //등록순에 따라 순서 삽입하기.
    var append = `<tr>
                    <td></td>
                    <td>${listChecked}</td>
                    <td>${compName}</td>
                    <td>${prodName}</td>
                    <td>${date}</td>
                    <td></td>
                  </tr>`;
    $("#addList").append(append);
    $('#list option:eq(0)').prop('selected', true);//select option 초기화
    $("#compName").val('');//인풋박스 초기화
    $("#prodName").val('');
    addNum();//??
  }
}

function search() {
  getListValue();
  let txt = $("#search").val();
  if (txt == '') {
    alert('텍스트를 입력하세요!')
  } else {
    checked
    alert(txt);
    console.log(checked)
  }

}