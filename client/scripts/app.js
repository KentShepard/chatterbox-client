const app = {};
app.server = 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages';
app.handleUsernameClick = function() {};
app.messages = {};
app.handleSubmit = function() {
  var message = {
    username: _.escape(app.parseUser(window.location.search)),
    text: _.escape($('input[name=message]').val()),
    roomname: _.escape($('#roomSelect').val())
  };
  app.send(message);

  app.fetch();
};

$(document).ready(function() {
  $('#main').on('click', '.username', function() {
    app.handleUsernameClick();
  });
  $('form').on('submit', function(e) {
    e.preventDefault();
    app.handleSubmit();
  });
});

app.init = function() {

};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: message,
    success: function (data) {
      console.log('chatterbox: Message sent. DATA: ', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
/*curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -G \
  --data-urlencode 'include=game' \
  https://api.parse.com/1/classes/GameScore/Ed1nuqPvcm
  -------
curl -X GET \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  https://api.parse.com/1/classes/GameScore
  */


app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    data: {order: '-createdAt'},
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Messages received', data);
      app.addNewMessages(app.filterNewMessages(data));
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive messages', data);
    }
  });
};

app.clearMessages = () => $('#chats').empty();

app.renderMessage = (message) => $('#chats').append(`<div class="message-block" data-username="${_.escape(message.username)}" data-room="${_.escape(message.roomname)}"><a href="#"><span class="username">${_.escape(message.username)}</span></a><span class="message">${_.escape(message.text)}</span></div>`);

app.renderRoom = (room) => $('#roomSelect').append(`<div>${room}</div>`);

app.parseUser = function(username) {
  return username.substr(username.indexOf('=') + 1);
};

app.filterNewMessages = function(data) {
  var newMessages = data.results.filter(function(value, index) {
    if (!app.messages[value.objectId]) {
      return true;
    }
  });
  return newMessages;
};

app.addNewMessages = function(array) {
  array.forEach(message => {
    app.renderMessage(message);
    if (!app.messages[message.objectId]) {
      app.messages[message.objectId] = message;
    }
  });
};
app.fetch();