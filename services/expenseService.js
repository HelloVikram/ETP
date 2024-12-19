const expensedb = require('../Model/expense');
const user = require('../Model/signup');
const savedUrl = require('../Model/savedurl');
const AWSService = require('../services/awsServices');
const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const createExpense = (amount, description, category, userId, transaction) => {
    return expensedb.create({ amount, description, category, userId }, { transaction });
};

const findUserById = (userId, transaction) => {
    return user.findOne({ where: { id: userId }, transaction });
};

const updateUserExpense = (user, totalExpense, transaction) => {
    return user.update({ totalExpense }, { transaction });
};

const findExpenses = (userId, limit, offset) => {
    return expensedb.findAll({ where: { userId }, limit, offset });
};

const countExpenses = (userId) => {
    return expensedb.count({ where: { userId } });
};

const findExpenseById = (id, userId, transaction) => {
    return expensedb.findOne({ where: { id, userId }, transaction });
};

const deleteExpenseById = (id, userId, transaction) => {
    return expensedb.destroy({ where: { id, userId }, transaction });
};

const uploadToS3 = (bucketName, filename, data) => {
    return AWSService.uploadToS3(bucketName, filename, data);
};

const saveUrl = (userId, url) => {
    return savedUrl.create({ userId, url });
};

const getSavedUrls = (userId) => {
    return savedUrl.findAll({ where: { userId } });
};

module.exports = {
    createExpense,
    findUserById,
    updateUserExpense,
    findExpenses,
    countExpenses,
    findExpenseById,
    deleteExpenseById,
    uploadToS3,
    saveUrl,
    getSavedUrls,
};
