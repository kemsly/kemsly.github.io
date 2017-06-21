$(document).ready(function() {
  startTime();
});
var loc = "Sarnia, Ontario, Canada";
function getLocation(position) {
  var x=position.coords.latitude;
  var y=position.coords.longitude;
  var request=new XMLHttpRequest();
  var url='http://maps.googleapis.com/maps/api/geocode/json?latlng='+x+','+y+'&sensor=true';
  request.onreadystatechange=function() {
    if(request.readyState==4&&request.status==200) {
      var data=JSON.parse(request.responseText);
      var addressComponents=data.results[0].address_components;
      loc=addressComponents[2].long_name+", "+addressComponents[4].long_name+", "+addressComponents[5].long_name;
      getWeather();
    }
  }
  request.open('GET',url,true);
  request.send();
}
navigator.geolocation.getCurrentPosition(getLocation);

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
  $('#clock').html(h+':'+m+':'+s);
  $('#day').html(days[cTime.getDay()]+'day');
  $('#date').html(months[cTime.getMonth()]+' '+cTime.getDate()+', '+cTime.getFullYear());

  setTimeout(function(){startTime()}, 500);
}

function getWeather() {
  $.simpleWeather({
    location:loc,
    woeid:'',
    unit:'c',
    success: function(weather) {
      html='<h2><i class="icon-"'+weather.code+'"></i>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html+='<h3>'+weather.city+'</h3>';
      html+='<h2>'+weather.currently+'</h2>';
      html+='<h2>'+weather.wind.direction+' '+Math.round(weather.wind.speed*0.868976)+' KNTS</h2>';
      $("#weather").html(html);
    }
  });
}

function checkTime(i) {
  i=i<10?i='0'+i:i;
  return i;
}
