<<<<<<< HEAD
const socket = io();
let user;
let chatBox = document.getElementById('chatBox');

socket.on('newUserConnected', data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${data} se ha unido al chat`,
        showConfirmButton: false,
        timer: 10000
    })
});

Swal.fire({
    title: 'Bienvenido, gracias por tu visita!',
    input: 'text',
    text: 'Ingresa el usuario con el que te vas a idetificar en el chat',
    inputValidator: (value) => {
        return !value && 'Ingrese su usuario para continuar!'
    },
    allowOutsideClick: false
}).then((result) => {
    user = result.value;
    let title = document.getElementById('title');
    title.innerHTML = `Bienvenido ${user} a HelpChat de Cosmeticos!`;
    socket.emit('authenticated', user);
});    

chatbox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        if (chatbox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: chatbox.value });
            chatbox.value = "";
        }
    }
})

socket.on('messageLogs', data => {
    if (!user) return;
    let log = document.getElementById('messageLogs');
    let messages = "";
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message}<br/>`
    })
    log.innerHTML = messages;
})
=======
// const socket = io();
// let user;
// let chatBox = document.getElementById('chatBox');

// socket.on('newUserConnected', data => {
//     Swal.fire({
//         toast: true,
//         position: 'top-end',
//         icon: 'success',
//         title: `${data} se ha unido al chat`,
//         showConfirmButton: false,
//         timer: 10000
//     })
// });

// Swal.fire({
//     title: 'Bienvenido, gracias por tu visita!',
//     input: 'text',
//     text: 'Ingresa el usuario con el que te vas a idetificar en el chat',
//     inputValidator: (value) => {
//         return !value && 'Ingrese su usuario para continuar!'
//     },
//     allowOutsideClick: false
// }).then((result) => {
//     user = result.value;
//     let title = document.getElementById('title');
//     title.innerHTML = `Bienvenido ${user} a HelpChat de Cosmeticos!`;
//     socket.emit('authenticated', user);
// });    

// chatbox.addEventListener('keyup', evt => {
//     if (evt.key === "Enter") {
//         if (chatbox.value.trim().length > 0) {
//             socket.emit('message', { user: user, message: chatbox.value });
//             chatbox.value = "";
//         }
//     }
// })

// socket.on('messageLogs', data => {
//     if (!user) return;
//     let log = document.getElementById('messageLogs');
//     let messages = "";
//     data.forEach(message => {
//         messages += `${message.user} dice: ${message.message}<br/>`
//     })
//     log.innerHTML = messages;
// })
>>>>>>> 3feeede5e9f6072b2fae4c443063b1a836463d17
