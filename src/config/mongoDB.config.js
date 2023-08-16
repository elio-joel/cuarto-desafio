import mongoose from 'mongoose';

export default function configureMongo() {
  const mongo = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
  mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
      console.log(`MongoDB connection successful to ${process.env.DB_NAME} database`);
  })
  .catch(err => {
      console.log(`Cannot connect to MongoDB ${process.env.DB_NAME} database - ${err}`);
  });
}


// import dotenv from 'dotenv';

// const MONGO_URL = 'mongodb+srv://elio22arg:NeWuUBfJmPpQSeqo@cluster0.zgfhncr.mongodb.net/?retryWrites=true&w=majority'

// const MongoComppas = "mongodb://localhost:27017";


// dotenv.config();

// export default { 
//     MONGO_URL: 
//     DB_USER: elio22arg,
//     DB_PASSWORD:NeWuUBfJmPpQSeqo,
//     DB_HOST: localhost,
//     DB_NAME: process.env.DB_NAME,
//     SESSION_SECRET: process.env.SESSION_SECRET,
//     PORT: 27017
// };