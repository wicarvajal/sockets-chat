var params = new URLSearchParams(window.location.search);
var userName = params.get('name');
var room = params.get('room');

var divUsers = $('#divUsuarios');
var messageForm = $('#messageForm');
var txtMessage = $('#txtMessage');
var divChatbox = $('#divChatbox');

function renderUsers(people) {
  // console.log(people);

  var html = '';

  html += '<li>';
  html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
  html += '</li>';

  for (let i = 0; i < people.length; i++) {
    html += '<li>'
    html += '<a data-id="' + people[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + people[i].name + '<small class="text-success">online</small></span></a>'
    html += '</li>'

  }

  // console.log(html);
  divUsers.html(html);
}

function renderMessages(message, mine) {
  var chatBoxHtml = '';
  var date = new Date(message.date);
  var hour = date.getHours() + ':' + date.getMinutes();
  var adminClass = 'info';

  if (message.name == 'Admin') {
    adminClass = 'danger';
  }

  if (mine) {
    chatBoxHtml += '<li class="reverse">'
    chatBoxHtml += '  <div class="chat-content">'
    chatBoxHtml += '    <h5>' + message.name + '</h5>'
    chatBoxHtml += '    <div class="box bg-light-inverse">' + message.message + '</div>'
    chatBoxHtml += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
    chatBoxHtml += '  </div>'
    chatBoxHtml += '  <div class="chat-time">' + hour + '</div>'
    chatBoxHtml += '</li>'
  } else {
    chatBoxHtml += '<li class="animated fadeIn">';
    if (message.name !== 'Admin') {
      chatBoxHtml += '  <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    }
    chatBoxHtml += '  <div class="chat-content">';
    chatBoxHtml += '    <h5>' + message.name + '</h5>';
    chatBoxHtml += '    <div class="box bg-light-' + adminClass + '">' + message.message + '</div>';
    chatBoxHtml += '  </div>';
    chatBoxHtml += '  <div class="chat-time">' + hour + '</div>';
    chatBoxHtml += '</li>';
  }

  divChatbox.append(chatBoxHtml);
}

function scrollBottom() {

  // selectors
  var newMessage = divChatbox.children('li:last-child');

  // heights
  var clientHeight = divChatbox.prop('clientHeight');
  var scrollTop = divChatbox.prop('scrollTop');
  var scrollHeight = divChatbox.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      divChatbox.scrollTop(scrollHeight);
  }
}

divUsers.on('click', 'a', function () {
  var id = $(this).data('id');
  console.log(id);
})

messageForm.on('submit', function (e) {
  // previene recarga de pagina
  e.preventDefault();

  if (txtMessage.val().trim().length === 0) {
    return;
  }

  socket.emit('createMessage', {
    name: userName,
    message: txtMessage.val().trim()
  }, function (resp) {
    txtMessage.val('').focus();
    renderMessages(resp, true);
    scrollBottom();
  });
})
