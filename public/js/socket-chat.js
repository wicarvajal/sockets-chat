var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
  window.location = 'index.html';
  throw new Error('El nombre de usuario y sala son necesarios');
}

var user = {
  name: params.get('name'),
  room: params.get('room')
}

socket.on('connect', function () {
  console.log('Conectado al servidor');

  socket.emit('chatIn', user, function (res) {
    console.log('Usuarios conectados', res);
  })
});

socket.on('disconnect', function () {
  console.log('Perdimos conexión con el servidor');
});

socket.emit('sendMessage', {
  usuario: 'Fernando',
  mensaje: 'Hola Mundo'
}, function (resp) {
  console.log('respuesta server: ', resp);
});

socket.on('createMessage', function (mensaje) {
  console.log('Servidor:', mensaje);
});

socket.on('peopleList', function (people) {
  console.log(people);
});

// msg privado

socket.on('privateMessage', function(msg) {
  console.log('Private Message: ', msg);
})