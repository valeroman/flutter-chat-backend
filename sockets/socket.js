const { io } = require('../index');



// Mensaje de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('diconnect', () => {
        console.log('Cliente desconectado');
    });

    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje!!!', payload);

    //     io.emit('mensaje', { admin: 'Nuevo Mensaje' });
    // });
});