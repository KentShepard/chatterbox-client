const app = {};
app.server = 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages';
app.handleUsernameClick = function() {};
app.handleSubmit = function() {
  var message = {
    username: app.parseUser(window.location.search),
    text: $('input[name=message]').val(),
    roomname: $('#roomSelect').val()
  };
  app.send(message);
};

$(document).ready(function() {
  $('#main').on('click', '.username', function() {
    app.handleUsernameClick();
  });
  $('form').on('submit', function() {
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
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Messages received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive messages', data);
    }
  });
};

app.clearMessages = () => $('#chats').empty();

app.renderMessage = (message) => $('#chats').append(`<div class="message-block" data-username="${message.username}" data-room="${message.roomname}"><a><span class="username">${message.username}</span></a><span class="message">${message.text}</span></div>`);

app.renderRoom = (room) => $('#roomSelect').append(`<div>${room}</div>`);

app.parseUser = function(username) {
  username.substr(username.indexOf('=') + 1);
};