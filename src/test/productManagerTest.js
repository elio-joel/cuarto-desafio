import { ProductManager } from "./manager/productManager.js";

const productManager = new ProductManager('./src/products.json');

const desafio = async () => {
    //desafio  1: todos los parámetros obligatorios
    try {
        await productManager.addProduct({});    
    } catch (error) {
        console.log('desafio  1: ', error.message);
    }
    //desafio  2: todos deben ser obligatorios
    try {
        await productManager.addProduct({title: 'Perfume para hombre', price: 450});    
    } catch (error) {
        console.log('desafio  2: ', error.message);
    }

    //desafio  3: tipos de datos
    try {
        await productManager.addProduct({title: 'Perfume para hombre', price: 450, code: 'PPA', stock:'A'});    
    } catch (error) {
        console.log('desafio  3: ', error.message);
    }

    //desafio  4: stock negativo
    try {
        await productManager.addProduct({title: 'Perfume para hombre', price: 450, code: 'PPA', stock: -1});    
    } catch (error) {
        console.log('desafio  4: ', error.message);
    }

    //desafio  5: precio negativo
    try {
        await productManager.addProduct({title: 'Perfume para hombre', price: -450, code: 'PPA', stock: 15});    
    } catch (error) {
        console.log('desafio  5: ', error.message);
    }

    //desafio  6: Agrego tres productos
    try {
        await productManager.addProduct({title: 'Desodorante para mujer', price: 1500, code: 'PPF', stock: 10});
        await productManager.addProduct({title: 'Desodorante para mujer', price: 1500, code: 'PPG', stock: 10});
        await productManager.addProduct({title: 'Desodorante para mujer', price: 1500, code: 'PPH', stock: 10});
        console.log('desafio  6: 3 productos agregados exitosamente'); 
    } catch (error) {
        console.log('desafio  6: ', error.message); 
    }
    

    //desafio  7: Agrego producto con code duplicado
    try {
        await productManager.addProduct({title: 'Crema para manos', price: 1000, code: 'CAA', stock: 15});
    } catch (error) {
        console.log('desafio  7: ', error.message); 
    }

    //desafio  8: Busco la totalidad los productos
    console.log('desafio  8: ', await productManager.getProducts());

    //desafio  9: Agrego un producto
    try {
        await productManager.addProduct({title: 'Colonia para niños', price: 1000, code: 'PPI', stock: 7});
    } catch (error) {
        console.log('desafio  9: ', error.message); 
    }

    //desafio  9: Busco un producto por ID
    try {
        console.log('desafio  10: ', await productManager.getProductById('cremas-dos'));
    } catch (error) {
        console.log('desafio  10: ', error.message); 
    }

    //desafio  10: Busco un producto por ID que no existe
    try {
        console.log(await productManager.getProductById('cremas-cuatro'));
    } catch (error) {
        console.log('desafio  10: ', error.message); 
    }

    //desafio  11: elimino producto inexistente
    try {
        console.log(await productManager.deleteProduct(999));
    } catch (error) {
        console.log('desafio  11: ', error.message); 
    }

    //desafio  12: elimino producto existente
    try {
        await productManager.deleteProduct('perfumeria-dos');
        console.log('desafio  12: Producto eliminado'); 
    } catch (error) {
        console.log('desafio  12: ', error.message); 
    }

    //desafio  13: Agrego un nuevo producto
    try {
        await productManager.addProduct({title: 'Crema para piel seca', price: 1200, code: 'CCC', stock: 8});
    } catch (error) {
        console.log('desafio  13: ', error.message); 
    }

    //desafio  14: Actualizo un producto
    try {
        await productManager.updateProduct('perfumeria-cinco', {stock: 10, title: 'Desodorante unisex', id: 'perfumeria-cinco', code: 'PPE'});
    } catch (error) {
        console.log('desafio  14: ', error.message); 
    }

   //desafio  15: Agrego un nuevo producto para controlar ID
   try {
        await productManager.addProduct({title: 'perfumeria-cinco', price: 1500, code: 'PPPE', stock: 5});
    } catch (error) {
        console.log('desafio  15: ', error.message); 
    }

    //desafio  16: Actualizo un producto inexistente
    try {
        await productManager.updateProduct(1000, {stock: 5, title: 'Pintura de manos', id: 'pintura-manos', code: "PPM"});
    } catch (error) {
        console.log('desafio  16 ', error.message); 
    }

    //desafio  17: Actualizo ID de un producto existente
    try {
        await productManager.updateProduct('cremas-uno', {id: CAC});
    } catch (error) {
        console.log('desafio  17 ', error.message); 
    }

     //desafio  18: Actualizo stock a negativo
     try {
        await productManager.updateProduct('cremas-uno', {stock: -5});
    } catch (error) {
        console.log('desafio  18 ', error.message); 
    }

     //desafio  19: Actualizo con el mismo código que tenía
     try {
        await productManager.updateProduct('perfumeria-cuatro', {code: 'PPD'});
        console.log('desafio  19: Actualizado con éxito'); 
    } catch (error) {
        console.log('desafio  19 ', error.message); 
    }

     //desafio  20: Actualizo con un código existente en otro producto
     try {
        await productManager.updateProduct('perfumeria-tres', {code: 'PPPC'});
        console.log('desafio  20: Actualizado con éxito'); 
    } catch (error) {
        console.log('desafio  20 ', error.message); 
    }

     //desafio 21: Agrego nuevo campo
     try {
        await productManager.updateProduct('perfumeria-uno', {status: 'OK'});
        console.log('desafio  21: Actualizado con éxito'); 
    } catch (error) {
        console.log('desafio  21 ', error.message); 
    }
    // return desafio();

}

desafio();