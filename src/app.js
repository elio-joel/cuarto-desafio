import express from 'express';
import productsRouter from './routes/productsRouter.js'
import router from './routes/cartRouter.js'
import __dirname from './utils.js'
import { ProductManager} from './manager/productManager.js';

const productManager = new ProductManager ('./data/products.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/files', express.static(__dirname + '/public'));
app.use('/api/products', productsRouter);
// app.use('/api/carts', router);

const port = 8080;
app.listen(port, () => console.log(`Servidor funcionando en el puerto ${port}`));

export {productManager};