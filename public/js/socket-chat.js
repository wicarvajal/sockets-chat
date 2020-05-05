var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
  window.location = 'index.html';
  throw new Error('El nombre y sala son necesarios');
}

var user = {
  name: params.get('nombre'),
  room: params.get('sala')
};



socket.on('connect', function () {
  // console.log('Conectado al servidor');

  socket.emit('chatIn', user, function (resp) {
    console.log(resp);
    renderUsers(resp);
  });

});

// escuchar
socket.on('disconnect', function () {

  console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// }); 

// Escuchar información
socket.on('createMessage', function (message) {
  console.log('Servidor:', message);
  renderMessages(message, false);
  scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listUsers', function (personas) {
  renderUsers(personas);
  console.log(personas);
});

// Mensajes privados
socket.on('privateMessage', function (mensaje) {

  console.log('Mensaje Privado:', mensaje);

});