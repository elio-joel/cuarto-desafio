import { CartsDaoFactory, MessagesDaoFactory, ProductsDaoFactory } from '../dao/factory.js';
import ProductsRepository from './products.repository.js';
import MessagesRepository from './messages.repository.js';
import CartsRepository from './carts.repository.js';

const cartsManager = CartsDaoFactory.getDao();
const messagesManager = MessagesDaoFactory.getDao();
const productsManager = ProductsDaoFactory.getDao();

export const productsRepository = new ProductsRepository(productsManager);
export const messagesRepository = new MessagesRepository(messagesManager);
export const cartsRepository = new CartsRepository(cartsManager);