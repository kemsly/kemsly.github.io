function KeyPress(e) {
      var evtobj = window.event? event : e
      if (evtobj.keyCode == 79 && evtobj.ctrlKey) {
        $.ajax({
          url: "https://ptpb.pw",
          type: 'POST',
          data: {'c': $("#paste").val()},
          success: function(data) {
            $("#paste").val(data);
          },
          error: function() {
            $("#paste").append("\nERROR COULD NOT POST DATA");
          }
        });
        evtobj.preventDefault();
      }
}

document.onkeydown = KeyPress;
$(document).ready(function() {
  $("#terminal").keydown(function(event) {
    if(event.which==13) {
      rncmd($("#terminal").val());
      $("#terminal").val("");
    }
  });
  $(".two-thirds").on("click", function() {
    $("#terminal").focus();
  });
});
function rncmd(i) {
  i=i.toUpperCase();
  if(i=="HELP") {
    $("#result").append("[guest@computer ~]$ help"
    +"<br>Help - Display a list of commands"
    +"<br>Clear - Erase previous terminal text"
    +"<br>Goto [address] - Redirects to entered address");
  }
  else if(i=="CLEAR") {
    $("#result").html("");
  }
  else if(i.startsWith("GOTO")) {
    if(i.slice(4)=="") {
      $("#result").append("[guest@computer ~]$ goto<br>Invalid command usage! Use \"Goto [address]\"");
    }
    else {
      if(i.slice(5).startsWith("http") == false) {
        window.location.href = "http\:\/\/" + i.slice(5);
      }
      else {
        window.location.href = i.slice(5);
      }
    }
  }
  else {
    $("#result").append("[guest@computer ~]$ "+i.toLowerCase()+"<br>Invalid command! Use \"Help\" for a list of commands");
  }
  if(i!="CLEAR") {
    $("#result").append("<br>");
  }
}
