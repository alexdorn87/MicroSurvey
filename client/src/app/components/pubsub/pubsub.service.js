'strict';
class PubSub {
  constructor(Socket) {
    'ngInject';
    this.Socket = Socket;
    this.container = [];
  }

  pushContainer(subscriptionName) {
    this.container.push(subscriptionName);
  }

  unSubscribeAll() {
    for (var i = 0; i < this.container.length; i++) {
      this.Socket.removeAllListeners(this.container[i]);
    }
    //Now reset the this.container..
    this.container = [];
  }

  subscribe(options, callback) {
    if (options) {
      let collectionName = options.collectionName;
      let modelId = options.modelId;
      let method = options.method;
      let name;
      if (method === 'POST') {
        name = '/' + collectionName + '/' + method;
        this.Socket.on(name, callback);
      } else {
        name = '/' + collectionName + '/' + modelId + '/' + method;
        this.Socket.on(name, callback);
      }
      //Push the this.container..
      this.pushContainer(name);
    } else {
      throw 'Error: Option must be an object';
    }
  }


}

export default PubSub;
