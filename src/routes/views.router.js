import { Router } from "express";
<<<<<<< HEAD
import { ProductManager } from '../dao/managers/products.manager.js';
const router = Router();

router.get('/',async (req,res)=>{
    const productManager = new ProductManager();
    const products = await productManager.getProducts();
    res.render('home', {title: 'Productos de Comesticos', style: 'product.css', products: products});
})

router.get('/realtimeproducts', (req,res)=>{
    res.render('realTimeProducts', {title: 'Productos de Comesticos', style: 'productList.css'});
})

router.get('/webchat', (req,res)=>{
    res.render('chat', { style: 'chat.css', title: 'Webchat de Soporte'});
})
=======
import { ProductManager } from "../manager/productManager.js";


const router = Router();


router.get('/',async (req,res)=>{
    const productManager = new ProductManager('./src/data/products.json');
    const products = await productManager.getProducts();
    res.render('home', {title: 'Nuestros productos', style: 'product.css', products: products});
})
    // res.render('index', { style: 'chat.css', title: ' CHAT'});
// })

router.get('/realtimeproducts', (req,res)=>{
    res.render('realTimeProducts', {title: 'Nuestros Productos', style: 'productList.css'});
})



>>>>>>> 3feeede5e9f6072b2fae4c443063b1a836463d17

export default router;