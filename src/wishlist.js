import io from 'socket.io-client';

export default function Wishlist(onConnect, onConnectError) {
  const socket = io('ws://80.217.101.63:1338');

  socket.on('connect', onConnect);
  socket.on('connect_error', onConnectError);

  return new Proxy(socket, {
    get: (target, property) => function() {
      const args = Array.from(arguments);
      const argCount = args.length;
      const remoteArgs = args.slice(0, argCount - 1);
      const done = args[argCount - 1];

      target.once('message', message => {
        if (message.error) {
          const err = message.error;
          const name = err.name;
          const args = err.args;
          return done(new Error(`${name}: ${args}`));
        }

        const result = message.result;
        done(undefined, result);
      });

      target.emit('message', JSON.stringify({
        method: property,
        args: remoteArgs
      }));
    }
  });
}
