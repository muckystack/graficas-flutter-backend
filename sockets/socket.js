const { io } = require('../index');
const Band = require('../models/Band.model');
const Bands = require('../models/Bands.model');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('ACDC'));

console.log(bands);

// Mensajes de sockets
io.on('connection', (client) => {
  console.log('Cliente conectado');

  client.emit('active-bands', bands.getBands());

  client.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  client.on('mensaje', (payload) => {
    console.log(payload);
    io.emit('mensaje', { admin: 'Nuevo mensaje' });
  });

  client.on('emitir-mensaje', (payload) => {
    // io.emit('nuevo-mensaje', 'Hey!!!!'); // Emite a todos
    client.broadcast.emit('nuevo-mensaje', payload); // Emite a todos menos el que lo emitió
  });
});
