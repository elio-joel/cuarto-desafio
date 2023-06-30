import express from 'express';
<<<<<<< HEAD
import productsRouter from './routes/productsRouter.js';
import router from './routes/cartRouter.js';
import __dirname from './utils/utils.js';
import { ProductManager} from './manager/productManager.js';

const productManager = new ProductManager ('./data/products.json');

const app = express();
=======
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import productsRouter from './routes/productsRouter.js'
import cartsRouter from './routes/cartRouter.js'
import path from 'path';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js'
import { productsUpdated } from './socketUtils.js';

//Express config
const app = express()
>>>>>>> 3feeede5e9f6072b2fae4c443063b1a836463d17

app.use(express.json());
app.use(express.urlencoded({extended:true}));

<<<<<<< HEAD
app.use('/files', express.static(__dirname + '/public'));
app.use('/api/products', productsRouter);
// app.use('/api/carts', router);

const port = 8080;
app.listen(port, () => console.log(`Servidor funcionando en el puerto ${port}`));

export {productManager};
=======
//Handlebars config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/files', express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const port = 8080;
const serverHttp = app.listen(port, () => console.log(`Servidor disponible en el puerto ${port}`));

//Socket.io config: link http server to socket.io server
const io = new Server(serverHttp);

app.set('io', io);

// let messages = [];

io.on('connection', socket => {
    console.log('Tienes clientes conectados al Webiste', socket.id);

    // socket.on('authenticated', data => {
    //     socket.emit('messageLogs', messages); //solo al creador de la conexión
    //     socket.broadcast.emit('newUserConnected', data); //a todos menos al creador de la conexión
    // });

    // socket.on('message', data => {
    //     messages.push(data);
    //     io.emit('messageLogs', messages); //a todos
    // });

    productsUpdated(io);
});
>>>>>>> 3feeede5e9f6072b2fae4c443063b1a836463d17
