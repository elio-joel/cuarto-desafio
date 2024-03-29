import MessagesModel from '../models/messages.model.js';
import EnumErrors from '../../utils/errorHandler/enum.js';
import CustomError from '../../utils/errorHandler/customError.js';
class MessageMongoManager {
  async getMessages() {
    try {
      const messages = await MessagesModel.find();
      return messages;
    } catch (error) {
      CustomError.createError({
        name: 'getMessages Error',
        message: `Failed to retrieve messages: ${error.message}`,
        type: EnumErrors.DATABASE_ERROR.type,
        statusCode: EnumErrors.DATABASE_ERROR.statusCode
      });            
    }
  }

  async addMessage(user, message) {
    try {
      const newMessage = await MessagesModel.create({ user, message });
      return newMessage;
    } catch (error) {
      CustomError.createError({
        name: 'addMessage Error',
        message: `Failed to add message: ${error.message}`,
        type: EnumErrors.DATABASE_ERROR.type,
        statusCode: EnumErrors.DATABASE_ERROR.statusCode
      });            
    }
  }
}

export default MessageMongoManager;