import { Router } from "express";
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

export default router;