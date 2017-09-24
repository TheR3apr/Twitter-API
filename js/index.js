var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "bgujbvghjnbvcfghbvcx"];

usernames.forEach(function(username){
  currentStatus(username);
});

    function currentStatus(username){
    var streamRequest = "https://wind-bow.gomix.me/twitch-api/streams/" + username + "?callback=?";

    $.getJSON(streamRequest, function(streamData) {
      channelInformation(username, streamData);
    });
  };

function channelInformation(username, streamData){
    var channelRequest = "https://wind-bow.gomix.me/twitch-api/channels/" + username + "?callback=?";
    $.getJSON(channelRequest, function(data){

console.log(streamData);
      var gameStatus, status;

      if (streamData.stream === null) {
        gameStatus = "Offline";
        status = "offline";
      } else if (streamData.stream === undefined) {
        gameStatus = "Account Closed";
        status = "offline";
      } else {
        gameStatus = streamData.stream.channel.status;
        status = "online";
      };

      $("#btn1").click(function(){
        $('.offline, .online').css('display', 'block');
      });
      $("#btn2").click(function(){
        $('.offline').css('display', 'none');
        $('#btn3').css('display', 'block');
      });
      $(".inactive").click(function(){
        $('.online').css('display', 'none');
        $('.offline').css('display', 'block');
      });
      console.log(data);

      var logo, name, url;

        if (data.error === "Not Found") {
          logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F?";
          gameStatus = "Account Closed";
        } else {
          logo = data.logo;
        };

        var imageHtml = '<div class="col-xs-3 colDesign logo">' +
          '<img src=' + logo + ' class="image"></div>';

        if (data.display_name && data.url === null) {
          name = "Does not exist";
        } else {
          name = username;
          url = data.url;
        };

        var nameHtml = '<div class="col-xs-8 colDesign name">' +
                       '<a href=' + url + ' target="_blank">'
                       + name + '</a></div>';

        var row = '<div class="row ' + status +'">' +
                    imageHtml + nameHtml + gameStatus + '</div>';

        $('#importSpot').append(row);
    });
};

$("#menu-icon, .fa, .fa-bars").click(function(){
  $("ul").toggleClass("ulToggle");
});

//I copied a portion of this code from a friends project. Unfortunately, he deleted his old CodePen profile so I cannot credit him.