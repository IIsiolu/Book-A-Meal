export default (io) => {
  io.sockets.on('connection', (socket) => {
    socket.on('disconnect', () => {
    });

    socket.on('private room', (roomId, fn) => {
      socket.join(`${roomId}`);
      fn('true');
    });

    socket.on('user order', (order) => {
      socket.broadcast.in(`${order.catererId}`).emit('meal ordered', order);
      socket.leave(`${order.catererId}`);
    });

    socket.on('order confirmation', (order) => {
      socket.broadcast.in(`${order.userId}`).emit('order notification', order);
      socket.leave(`${order.userId}`);
    });

  });
};

// // sending to sender-client only
// socket.emit('message', "this is a test");

// // sending to all clients, include sender
// io.emit('message', "this is a test");

// // sending to all clients except sender
// socket.broadcast.emit('message', "this is a test");

// // sending to all clients in 'game' room(channel) except sender
// socket.broadcast.to('game').emit('message', 'nice game');

// // sending to all clients in 'game' room(channel), include sender
// io.in('game').emit('message', 'cool game');

// // sending to sender client, only if they are in 'game' room(channel)
// socket.to('game').emit('message', 'enjoy the game');

// // sending to all clients in namespace 'myNamespace', include sender
// io.of('myNamespace').emit('message', 'gg');

// // sending to individual socketid
// socket.broadcast.to(socketid).emit('message', 'for your eyes only');