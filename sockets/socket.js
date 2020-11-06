const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');



// Mensaje de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    // verificar autenticacion
    if (!valido) { return client.disconnect(); }

    // Cliente autenticado
    usuarioConectado(uid);

    // Ingresar un usuario a una sala particular
    // sala global, mensaje privado client.id, sala uid
    client.join(uid);

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async(payload) => {
        console.log(payload);

        // Grabar mensaje 
        await grabarMensaje(payload);

        // to = para mandar mensaje a un canal
        // payload.para es el canal (id de la persona que se unio == uid)
        // y se emite el mismo mensaje-personal
        // y se manda de regreso el payload
        io.to(payload.para).emit('mensaje-personal', payload);
    })

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

});