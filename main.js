$(document).ready(function() {
  startTime();
});
function startTime() {
  var cTime=new Date();
  var h=cTime.getHours();
  var m=cTime.getMinutes();
  var s=cTime.getSeconds();
  var days=['Sun','Mon','Tues','Wednes','Thurs','Fri','Satur'];
  var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec'];

  h=checkTime(h);
  m=checkTime(m);
  s=checkTime(s);

  s=cTime.getHours()>12?s+' PM':s+' AM';
  h=h>12? parseInt(h)-12:h;
  $('#clock').html(h+'<span>:</span>'+m+'<span>:</span>'+s);
  $('#day').html(days[cTime.getDay()]+'day');
  $('#date').html(months[cTime.getMonth()]+' '+cTime.getDate()+', '+cTime.getFullYear());

  setTimeout(function(){startTime()}, 500);
}

function checkTime(i) {
  i=i<10?i='0'+i:i;
  return i;
}
