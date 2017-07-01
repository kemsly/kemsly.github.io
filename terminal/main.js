var name = "guest";
var machine = "computer";
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
function startClock() {
  var cTime=new Date();
  var h=cTime.getHours();
  var m=cTime.getMinutes();
  var s=cTime.getSeconds();
  var days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  h=checkTime(h);
  m=checkTime(m);
  s=checkTime(s);
  $('#day').html(days[cTime.getDay()]);
  $('#clock').html("<span>"+days[cTime.getDay()]+"</span>"+h+':'+m+':'+s);
  setTimeout(function(){startClock()}, 500);
}
function checkTime(i) {
  i=i<10?i='0'+i:i;
  return i;
}
document.onkeydown = KeyPress;
$(document).ready(function() {
  startClock();
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
    $("#result").append("["+name+"@"+machine+" ~]$ help"
    +"<br>Help - Display a list of commands"
    +"<br>Clear - Erase previous terminal text"
    +"<br>Goto [address] - Redirects to entered address"
    +"<br>Name [new name] - Change username"
    +"<br>Machine [new machine name] - Change machine name"
    +"<br>Search [search query] - Search Google");
  }
  else if(i=="CLEAR") {
    $("#result").html("");
  }
  else if(i.startsWith("GOTO")) {
    if(i.slice(4)=="") {
      $("#result").append("["+name+"@"+machine+" ~]$ goto<br>Invalid command usage! Use \"Goto [address]\"");
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
  else if(i.startsWith("NAME")) {
    if(i.slice(4)=="") {
      $("#result").append("["+name+"@"+machine+" ~]$ name<br>Invalid command usage! Use\"Name [new name]\"");
    }
    else {
      name = i.slice(5).toLowerCase();
      $(".pcname").html(name + "@" + machine);
      $("#result").append("["+name+"@"+machine+" ~]$ name<br>Name changed to \"" + name + "\"");
    }
  }
  else if(i.startsWith("MACHINE")) {
    if(i.slice(7)=="") {
      $("#result").append("["+name+"@"+machine+" ~]$ machine<br>Invalid command usage! Use\"Machine [new machine name]\"");
    }
    else {
      machine = i.slice(8).toLowerCase();
      $(".pcname").html(name + "@" + machine);
      $("#result").append("["+name+"@"+machine+" ~]$ name<br>Machine name changed to \"" + machine + "\"");
    }
  }
  else if(i.startsWith("SEARCH")) {
    if(i.slice("6")=="") {
      $("#result").append("["+name+"@"+machine+" ~]$ search<br>Invalid command usage! Use\"Search [search query]\"");
    }
    else {
      window.location.href = "http\:\/\/google.com\/?q=" + i.slice(7);
    }
  }
  else {
    $("#result").append("["+name+"@"+machine+" ~]$ "+i.toLowerCase()+"<br>Invalid command! Use \"Help\" for a list of commands");
  }
  if(i!="CLEAR") {
    $("#result").append("<br>");
  }
}
