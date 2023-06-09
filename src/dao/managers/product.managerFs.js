import fs from 'fs';
import shortid from 'shortid';
class Product {
    constructor({ title, description, code, price, stock, category, thumbnails }) {  
        if (!title || !description || !code || !price || stock === null || category === undefined) throw new Error('All parameters should be specified');

        if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            typeof code !== 'string' ||
            (typeof price !== 'string' && typeof price !== 'number') ||
            (typeof stock !== 'string' && typeof stock !== 'number') ||
            typeof category !== 'string'
        ) {
            throw new Error('Invalid parameter datatype');
        }

        let parsedPrice = price;

        if (typeof price === 'string') {
          parsedPrice = parseFloat(price);
          
          if (isNaN(parsedPrice)) {
            throw new Error('Invalid parameter datatype');
          }
        }

        if (parsedPrice < 0) throw new Error('Price cannot be negative');

        let parsedStock = stock;

        if (typeof stock === 'string') {
            parsedStock = parseInt(stock);
          
          if (isNaN(parsedStock)) {
            throw new Error('Invalid parameter datatype');
          }
        }  

        if (parsedStock < 0) throw new Error('Stock cannot be negative');

        let thumbnailsArray = [];
        if (thumbnails) {
            if (typeof thumbnails === 'string') {
                thumbnailsArray = [thumbnails];
            } else if (Array.isArray(thumbnails)) {
                thumbnailsArray = thumbnails;
            } else {
                throw new Error('Las miniaturas deben ser una cadena o una matriz de cadenas');
            }
        }

        this.id = shortid.generate();
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = parsedPrice;
        this.status = true;
        this.stock = parsedStock;
        this.category = category;
        this.thumbnails = thumbnailsArray;
    }
}

class ProductManager {
    constructor(filePath) {
        this.filePath = path.resolve (__dirname, filePath);
        this.products = [];
        this.getProducts();
    }
    initialize = async () => {
        if(fs.existsSync(this.filePath)) {
            const data = await fs.promises.readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);
        } else {
            this.products = ["Si se lee este mensaje es que hay un problema"];
        }
    }
    save = async () => {
        await fs.promises.writeFile(this.filePath, JSON.stringify(this.products, null, '\t'));
    }
    getProducts = async () => {
        await this.initialize()
        return this.products;
    }
    addProduct = async (newFields) => {
        await this.initialize();
        const allowedFields = ['title', 'description', 'code', 'price', 'stock', 'category', 'thumbnails'];
        const invalidFields = Object.keys(newFields).filter(field => !allowedFields.includes(field));
        if (invalidFields.length > 0) {
            throw new Error(`Campo nuevo no valido: ${invalidFields.join(', ')}`);
        }
        const { title, description, code, price, stock, category, thumbnails } = newFields;
        if (code && this.products.some((product) => product.code === code)) throw new Error('The specified code is in use by another existing product');
        const newProduct = new Product({title, description, code, price, stock, category, thumbnails});
        this.products.push(newProduct);
        await this.save();
        return newProduct;
    }
    getProductById = async (productId) => {
        if (!shortid.isValid(productId)) throw new Error('ID del producto no valido');
        await this.initialize();
        const returnProduct = this.products.find((product) => product.id === productId);
        if(!returnProduct) throw new Error("El producto no encontrado");
        return returnProduct;
    } 
    deleteProduct = async (productId) => {
        if (!shortid.isValid(productId)) throw new Error('ID del producto no validado');
        await this.initialize();
        const index = this.products.findIndex((products) => products.id === productId);
        if (index === -1) {
            throw new Error("Producto no encontrado");
        }
        this.products.splice(index, 1);
        await this.save();
    }
    updateProduct = async (productId, updatedFields) => {
        if (!shortid.isValid(productId)) throw new Error('ID del producto no validado');
        await this.initialize();
        const index = this.products.findIndex((product) => product.id === productId);
        if (index === -1) throw new Error("Producto no encontrado");

        const existingProduct = this.products[index];
        const updatedProduct = { ...existingProduct, ...updatedFields };

        const allowedFields = ['category', 'title', 'description', 'code', 'price', 'stock', 'thumbnails'];
        const invalidFields = Object.keys(updatedFields).filter(field => !allowedFields.includes(field));
        if (invalidFields.length > 0) {
            throw new Error(`Invalid updatable fields: ${invalidFields.join(', ')}`);
        }

        if (updatedProduct.price < 0) throw new Error('El precio no puede ser negativo');
        if (updatedProduct.stock < 0) throw new Error('El numero de stock no puede ser negativo');
        if (updatedProduct.id !== productId) throw new Error('El Id no se pudo actualizar');        

        let thumbnailsArray = [];
        if (updatedProduct.thumbnails) {
            if (typeof updatedProduct.thumbnails === 'string') {
                thumbnailsArray = [updatedProduct.thumbnails];
            } else if (Array.isArray(updatedProduct.thumbnails)) {
                thumbnailsArray = updatedProduct.thumbnails;
            } else {
                throw new Error('Thumbnails must be a string or an array of strings');
            }
            updatedProduct.thumbnails = thumbnailsArray;
        }
        if (updatedFields.code && updatedFields.code !== existingProduct.code && this.products.some((product) => product.code === updatedProduct.code && product.id !== updatedProduct.id )) {
            throw new Error('The specified code is in use by another existant product');
        }
          
        this.products[index] = updatedProduct;
        await this.save();
        return this.products[index];
    }
}; 

export { ProductManager };
