const sequelizeImport = require ('sequelize');

require('dotenv').config();

 const sequelize = new sequelizeImport(process.env.DATBASE_URL, {
     dialect:'postgres' ,
     dialectOptions:{
         ssl: {
             require: true,
             rejectUnauthorized: false
         }
     }
 })

 module.exports = sequelize;