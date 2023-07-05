import express from 'express';
import __dirname from './utils/utils.js'
import handlebars from 'express-handlebars';
import cors from 'cors';
import path from 'path';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import messagesRouter from './routes/messages.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io';
import { productsUpdated, chat } from './utils/socketUtils.js';
import displayRoutes from 'express-routemap';
import mongoose from 'mongoose';
import { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } from './utils/mongoDBConfig.js';

//const
const PORT = 8080;

//Express middlewares
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors());

//Handlebars 
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Public folder 
app.use('/files', express.static(path.join(__dirname, './public')));

//Route
app.use('/api/alive', (req, res) => {
    res.status(200).json({ status: 1, message: 'Linea de ayuda en cosmeticos-en linea' });
});
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/messages', messagesRouter);
app.use('/', viewsRouter);

//mongoDB-connection
const mongo = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

mongoose.connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log(`MongoDB connection successful to ${DB_NAME} database`);
})
.catch(err => {
    console.log(`Cannot connect to MongoDB ${DB_NAME} database`);
});

//Server-config
const serverHttp = app.listen(PORT, () => {
    displayRoutes(app);
    console.log(`Cosmeticos Avon by Marcela esta escuchando en el puerto ${PORT}`)
});

//Socket.io config: link http server to socket.io server
const io = new Server(serverHttp);

app.set('io', io);

io.on('connection', socket => {
    console.log('Nuevo cliente  en linea', socket.id);
    productsUpdated(io);
    chat(socket, io);
});