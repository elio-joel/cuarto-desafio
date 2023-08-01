import dotenv from 'dotenv';
dotenv.config();

export default { 
    APP_ID: process.env.APP_ID,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
};