let indexBox = 1;

var myID = "";

url = "ws://192.168.22.59:55000";
socket = new WebSocket(url);

socket.onopen = function () {
  console.log("포트 접속함");
};
socket.onmessage = function (e) {
  // console.log("이전 데이터 " + str);
  var msgData = e.data.split(":");
  console.log("보낸사람 ID: ", msgData[0]);
  if (msgData[0] !== myID) {
    console.log("메세지 왔어요!!!", msgData[1]);
    contextData_receive(msgData[0], msgData[1]);
  } else {
    console.log("내가 메세지 보냇어요!!!", e.data);
  }
};
socket.onclose = function (e) {
  console.log("closed");
};

/*console.log(data);
  for(var index = 0; index < data.length; index++){
    contextData(data.data[index].userid, data.data[index].message);
  }
}*/

$(function () {
  fetch("")
  .then(response => response.json())
  .then(json => inputChatData(json))
  //클릭이벤트
  $("#click").on("click", function () {
    alert2();
    $("#click").val("눌렀음");
    $("a").attr("href", "http://daum.net");
    $("a").css("font-size", "large");
  });
  //클릭이벤트 2 트리거를 사용해서 간접으로 불러올수있음
  // $("#target").on("click", function () {
  //   alert("Handler for `click` called.");
  // });
  $("#other").on("click", function () {
    alert("마우스 이미지 변경");
    $("#target").trigger("click");
  });

  // $("#target2").on("contextmenu", function () {
  //   alert("Handler for `contextmenu` called.");
  // });
  // 줄여서 사용가능
  $("#target2").trigger("contextmenu");

  // context 바꾸기
  let div = $("#diff").first();
  div.on("contextmenu", function () {
    div.toggleClass("contextmenu");
  });

  $("#target3").on("dblclick", function () {
    alert("Handler for `dblclick` called.");
  });
  $("#other").on("click", function () {
    $("#target").trigger("dblclick");
  });

  $("#clickButton").one("click", function () {
    if ($("#inputText").val() == "") {
      alert("값을 입력하세요");
    } else {
      $("#inputText").css("font-size", "30px");
      $("#box").append("<input type='button' id='redButton' value='빨강'>");
      $("#box").append("<input type='button' id='blueButton' value='파랑'>");
      $("#box").append("<input type='button' id='greenButton' value='초록'>");
      $("#redButton").on("click", function () {
        alert("빨강");
      });
      $("#blueButton").on("click", function () {
        alert("파랑");
      });
      $("#greenButton").on("click", function () {
        alert("초록");
      });
    }
  });

  // 채팅방
  $("#IDclickButton").on("click", function () {
    myID = $("#IDinputText").val();
  });

  $("#boxTyping").on("keydown", function (event) {
    // console.log($(this).val());
    if ($(this).val() === " ") {
      // console.log("여기 왔니??");
    }
    if (event.key == "Enter") {
      if ($(this).val() !== "" || $(this).val() !== " ") {
        var myMsg = myID + ":" + $(this).val();
        // console.log("내아이디: ", myMsg);
        contextData_send(myID, $(this).val());
        socket.send(myMsg);
      }
      $(this).val("");
    }
  });
  $("#boxAssign").on("click", function () {
    if ($("#boxTyping").val() !== "") {
      contextData_send($("#boxTyping").val());
    }
    $("#boxTyping").val("");
  });
});

function alert2() {
  alert("hi");
}

function contextData_send(ID, msg) {
  // console.log("여기까지오나요?   ", msg, "\n박스 숫자: ", indexBox);
  fetch("http://localhost:8080/dev/server/dataInsert.jsp?userid=" + ID + "&message=" + msg);
  $("#boxContents").append(
    "<div class='textContents' id='messageBox" +
      indexBox +
      "'>" +
      "<div class='textEditBox'>" +
      "<input type='button' onclick='removeContent(" +
      indexBox +
      ")' value='x'/>" +
      "</div>" +
      "<span><span class='textBox' id='textBox" +
      indexBox +
      "'>" +
      msg +
      "</span> <span class='idBox'>" +
      ID +
      "</span> </span></div>"
  );
  console.log("보낸거: " + ID);
  str = msg;
  // console.log(indexBox);
  indexBox++;
}

function contextData_receive(ID, msg) {
  // console.log("여기까지오나요?   ", msg, "\n박스 숫자: ", indexBox);
  fetch("http://localhost:8080/dev/server/dataInsert.jsp?userid=" + ID + "&message=" + msg);
  $("#boxContents").append(
    "<div class='textContents' id='messageBox" +
      indexBox +
      "'> <span class='idBox'>" +
      ID +
      "</span>" +
      "<span class='textBox2' id='textBox" +
      indexBox +
      "'>" +
      msg +
      "</span>" +
      "<div class='textEditBox'>" +
      "</div>" +
      " </div>"
  );
  // console.log(indexBox);
  indexBox++;
}
function removeContent(index) {
  console.log("메세지 삭제");
  $("#messageBox" + index).remove();
}
function chatColorActive() {
  var toYellow = $("#boxAssign")
    .css("background-color", "rgb(242, 218, 0)")
    .css("border", "1px rgb(255, 226, 2)");
}
function chatColorInactive() {
  var toGray = $("#boxAssign")
    .css("background-color", "rgba(93, 93, 93, 0.112)")
    .css("border", "1px rgb(255, 226, 2)");
}
