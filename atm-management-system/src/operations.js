// operations.js

const { EventEmitter } = require('events');
const auth = require('./auth');
const fs = require('fs');
const path = require('path');

const transactionsFilePath = path.join(__dirname, '../data/transactions.json');

const eventEmitter = new EventEmitter();

eventEmitter.on('checkBalance', (accountID) => {
    const user = auth.getUsers().find(user => user.accountID === accountID);
    if (user) {
        console.log(`Your balance is: $${user.balance}`);
    } else {
        console.log('User not found!');
    }
});

eventEmitter.on('deposit', (accountID, amount) => {
    const users = auth.getUsers();
    const userIndex = users.findIndex(user => user.accountID === accountID);
    if (userIndex !== -1) {
        users[userIndex].balance += amount;
        auth.saveUsers(users);
        const transaction = {
            accountID,
            type: 'deposit',
            amount,
            timestamp: new Date().toISOString()
        };
        saveTransaction(transaction);
        console.log(`$${amount} deposited successfully.`);
    } else {
        console.log('User not found!');
    }
});

eventEmitter.on('withdraw', (accountID, amount) => {
    const users = auth.getUsers();
    const userIndex = users.findIndex(user => user.accountID === accountID);
    if (userIndex !== -1) {
        if (users[userIndex].balance >= amount) {
            users[userIndex].balance -= amount;
            auth.saveUsers(users);
            const transaction = {
                accountID,
                type: 'withdrawal',
                amount,
                timestamp: new Date().toISOString()
            };
            saveTransaction(transaction);
            console.log(`$${amount} withdrawn successfully.`);
        } else {
            console.log('Insufficient funds.');
        }
    } else {
        console.log('User not found!');
    }
});

eventEmitter.on('viewTransactions', (accountID) => {
    const transactions = getTransactions().filter(transaction => transaction.accountID === accountID);
    if (transactions.length > 0) {
        console.log('Transaction History:');
        transactions.forEach(transaction => {
            console.log(`Type: ${transaction.type}, Amount: $${transaction.amount}, Date: ${transaction.timestamp}`);
        });
    } else {
        console.log('No transactions found.');
    }
});

function getTransactions() {
    try {
        const transactionsData = fs.readFileSync(transactionsFilePath);
        return JSON.parse(transactionsData);
    } catch (error) {
        return [];
    }
}

function saveTransaction(transaction) {
    const transactions = getTransactions();
    transactions.push(transaction);
    fs.writeFileSync(transactionsFilePath, JSON.stringify(transactions, null, 2));
}

module.exports = eventEmitter;
