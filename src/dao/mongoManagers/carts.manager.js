import CartsModel from '../models/carts.model.js';
import ProductsModel from '../models/products.model.js';
import EnumErrors from '../../utils/errorHandler/enum.js';
import CustomError from '../../utils/errorHandler/customError.js';
class CartMongoManager {
  constructor() {
    this.cartModel = CartsModel;
    this.productModel = ProductsModel;
  }

  createCart = async () => {
    try {
      const newCart = await this.cartModel.create({ products: [] });
      return newCart;
    } catch (error) {
      CustomError.createError({
        name: 'createCart Error',
        message: `Failed to add cart: ${error.message}`,
        type: EnumErrors.DATABASE_ERROR.type,
        statusCode: EnumErrors.DATABASE_ERROR.statusCode
      });        
    }
  }

  getCartById = async (cartId) => {
    try {
      const cart = await this.cartModel.findById(cartId).lean();
      return cart;
    } catch (error) {
      CustomError.createError({
        name: 'getCartById Error',
        message: `Failed to retrieve cart: ${error.message}`,
        type: EnumErrors.DATABASE_ERROR.type,
        statusCode: EnumErrors.DATABASE_ERROR.statusCode
      });      
    }
  }

  updateCartProducts = async (cartId, newCartProducts) => {
    try {
      const cart = await this.cartModel.findById(cartId);
      if (!newCartProducts) {
        CustomError.createError({
          name: 'updateCartProducts Error',
          message: 'Cart products are required',
          type: EnumErrors.DATABASE_ERROR.type,
          statusCode: EnumErrors.DATABASE_ERROR.statusCode
        });            
      }
      cart.products = newCartProducts;
      await cart.save();
      return cart;
    } catch (error) {
      CustomError.createError({
        name: 'updateCartProducts Error',
        message: `Failed to update cart's products: ${error.message}`,
        type: EnumErrors.DATABASE_ERROR.type,
        statusCode: EnumErrors.DATABASE_ERROR.statusCode
      });            
    }
  }
 
  deleteCart = async (cartId) => {
    try {
      const cart = await this.cartModel.findByIdAndDelete(cartId);
      if (!cart) {
        CustomError.createError({
          name: 'deleteCart Error',
          message: 'Cart not found',
          type: EnumErrors.DATABASE_ERROR.type,
          statusCode: EnumErrors.DATABASE_ERROR.statusCode
        });        
      }
    } catch (error) {
      CustomError.createError({
        name: 'deleteCart Error',
        message: `Failed to delete cart: ${error.message}`,
        type: EnumErrors.DATABASE_ERROR.type,
        statusCode: EnumErrors.DATABASE_ERROR.statusCode
      });            
    }
  }
}

export default CartMongoManager;