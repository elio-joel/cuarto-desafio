import { Router } from "express";
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




export default router;