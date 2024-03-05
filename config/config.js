require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": 'mysql',
        "seederStorage": "sequelize",
        "seederStorageTableName": "sequelize_meta"
    },
    "production": {
      "username": process.env.USER,
      "password": process.env.PASSWORD,
      "database": process.env.DB,
      "host": process.env.HOST,
      "port": process.env.DB_PORT,
      "dialect": 'mysql',
        "seederStorage": "sequelize",
        "seederStorageTableName": "sequelize_meta"
    },
};