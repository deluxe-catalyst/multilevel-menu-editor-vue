const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('menu_db', 'user', 'password', {
    host: 'db',
    dialect: 'postgres'
})

const User = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rules: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

const MenuItem = sequelize.define('menu_items', {
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

sequelize.sync();

module.exports = {sequelize, User, MenuItem};