'strict';
class Socket {
  constructor(LoopBackAuth) {
    'ngInject';
    //Creating connection with server
    let socket = io.connect('http://localhost:3000');

    //This part is only for login users for authenticated socket connection between client and server.
    //If you are not using login page in you website then you should remove rest piece of code..
    let id = LoopBackAuth.accessTokenId;
    let userId = LoopBackAuth.currentUserId;
    socket.on('connect', function() {
      socket.emit('authentication', {id: id, userId: userId });
      socket.on('authenticated', function() {
        // use the socket as usual
        console.log('User is authenticated');
      });
    });
    return socket;
  }


}

export default Socket;
