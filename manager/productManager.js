import fs from 'fs';
class Product {

    constructor ({title, price, code, stock, id}) {
        if (!title || !price || !code || !stock === null || id === undefined) throw new Error('All parameters should be specified');

        if (typeof title !== 'string' || typeof price !== 'number' || typeof code !== 'string' || typeof stock !== 'number' || typeof code !== 'string') {
            throw new Error('Invalid parameter datatype');
        }

        if (price < 0) throw new Error('Price cannot be negative');

        if (stock < 0) throw new Error('Stock cannot be negative');

        this.id = id;
        this.title = title;
        this.price = price;
        this.code = code;
        this.stock = stock;
    }

}

class ProductManager {

    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
        this.lastProductId = 0;
    }

    initialize = async () => {
        if(fs.existsSync(this.filePath)) {
            const data = await fs.promises.readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);
        } else {
            this.products = [];
        }
        const lastProduct = this.products[this.products.length - 1];
        this.lastProductId = lastProduct ? lastProduct.id + 1 : 1;        
    }

    save = async () => {
        await fs.promises.writeFile(this.filePath, JSON.stringify(this.products, null, '\t'));
    }
    
    getProducts = async () => {
        await this.initialize()
        return this.products;
    }

    addProduct = async ({title, price, code, stock,}) => {
        await this.initialize();
        if (this.products.some((product) => product.code === code)) {
            throw new Error('The specified code is in use by another existant product');
          }
        const newProduct = new Product({title, price,  code, stock, id: this.lastProductId++});
        this.products.push(newProduct);
        await this.save()
    }

    getProductById = async (id) => {
        await this.initialize();
        const returnProduct = this.products.find((product) => product.id === id);
        if(!returnProduct) throw new Error("Product not found");
        return returnProduct;
    }

    deleteProduct = async (id) => {
        await this.initialize();
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
            throw new Error("Product not found");
        }
        this.products.splice(index, 1);
        await this.save();
    }

    updateProduct = async (id, updatedFields) => {
        await this.initialize();
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) throw new Error("Product not found");

        const updatedProduct = { ...this.products[index], ...updatedFields };
        if (updatedProduct.price < 0) throw new Error('Price cannot be negative');
        if (updatedProduct.stock < 0) throw new Error('Stock cannot be negative');
        if (updatedProduct.id !== id) throw new Error('Id cannot be updated');        

        const allowedFields = ['title', 'price', 'code', 'stock'];
        const invalidFields = Object.keys(updatedFields).filter(field => !allowedFields.includes(field));
        if (invalidFields.length > 0) {
            throw new Error(`Invalid updatable fields: ${invalidFields.join(', ')}`);
        }

        if (this.products.some((product) => product.code === updatedProduct.code && product.id !== updatedProduct.id )) {
            throw new Error('The specified code is in use by another existant product');
          }

        this.products[index] = updatedProduct;
        await this.save();
        return this.products[index];
    }

};

export { ProductManager };