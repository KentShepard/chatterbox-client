const app = {};
$(document).ready(function() {
  app.server = 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages';
  app.handleUsernameClick = function(event) {
    event.preventDefault();
    var $username = $(event.target).text()
    app.friends[$username] = $username;
    $(`.message-block:contains(${$username})`).addClass('friend')
    localStorage.setItem('friends', JSON.stringify(app.friends));
  };
  app.messages = {};
  app.friends = {};
  app.handleSubmit = function() {
    var message = {
      username: _.escape(app.parseUser(window.location.search)),
      text: _.escape($('input[name=message]').val()),
      roomname: _.escape($('#roomSelect').val())
    };
    app.send(message);
    app.fetch();
    $('input[name=message]').val('')
  };

  app.init = function() {
    $('#main').on('click', '.username', app.handleUsernameClick);
    $('form').on('submit', function(e) {
      $('.spinner').removeClass('hidden');
      e.preventDefault();
      app.handleSubmit();
    });
    $('select').on('change', function() {
      if ($('select').val() === 'New Room...') {
        var roomName = prompt('Enter your room name');
        if (roomName) {
          app.renderRoom(roomName);
          $('select').val(roomName);
        } else {
          $('select option[value=lobby]').prop('selected', true)
        }
      }
      var filteredMessages = _.filter(app.messages, function(message) {
        return message.roomname === $('select').val()
      });
      $('#chats').empty();
      app.addNewMessages(filteredMessages)
    });
    var savedFriends = localStorage.getItem("friends");
    if (savedFriends) {
      app.friends = JSON.parse(savedFriends);
    } else {
      localStorage.setItem('friends', '{}');
    }

    app.fetch();
    setInterval(app.fetch, 10000);
  };

  app.send = function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: message,
      success: function (data) {
        console.log('chatterbox: Message sent. DATA: ', data);
        $('.spinner').addClass('hidden');
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

  app.renderMessage = (message) => $(`<div class="message-block" data-username="${_.escape(message.username)}" data-room="${_.escape(message.roomname)}"><a href="#"><span class="username">${_.escape(message.username)}</span></a><span class="message">${_.escape(message.text)}</span></div>`).prependTo($('#chats'));

  app.renderRoom = (room) => $('#roomSelect').append(`<option value="${room}">${room}</option>`);

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
    array.reverse().forEach(message => {
      var $newMessage = app.renderMessage(message);
      if (app.friends[message.username]) {
        $newMessage.addClass('friend');
      }
      if (!app.messages[message.objectId]) {
        app.messages[message.objectId] = message;
      }
      if ($('#chats').children().length > 50) {
        $('#chats .message-block:last-child').remove();
      }
    });
  };
  app.init();
});