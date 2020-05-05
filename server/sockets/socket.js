const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {
  console.log('Usuario conectado');

  client.on('chatIn', (user, callback) => {
    if (!user) {
      return callback({
        error: true,
        msg: 'Nombre es necesario'
      })
    }

    console.log(user);
    client.join(user.room);

    users.addUsers(client.id, user.name, user.room);

    client.broadcast.to(user.room).emit('listUsers', users.getPeopleByRoom(user.room));
    client.broadcast.to(user.room).emit('createMessage', createMessage('Admin', `${user.name} ingresó al chat`));
    callback(users.getPeopleByRoom(user.room));
  });

  client.on('createMessage', (data, callback) => {
    let user = users.getUserById(client.id);

    let message = createMessage(user.name, data.message);
    client.broadcast.to(user.room).emit('createMessage', message);
    callback(message);
  });

  client.on('disconnect', () => {
    let deletdUser = users.deleteUser(client.id);

    console.log(deletdUser);

    client.broadcast.to(deletdUser.room).emit('createMessage', createMessage('Admin', `${deletdUser.name} abandonó el chat`));
    client.broadcast.to(deletdUser.room).emit('listUsers', users.getPeopleByRoom(deletdUser.room));

  })

  client.on('privateMessage', data => {
    let user = users.getUserById(client.id);
    client.broadcast.to(data.to).emit('privateMessage', createMessage(user.name, data.message));
  });

  
});