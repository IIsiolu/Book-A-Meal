
export default (io) => {
  io.sockets.on('connection', (socket) => {
    console.log('>>>>>>>>>>>>>>>>>a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
