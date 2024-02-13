// eventHandler.js

const eventEmitter = require('./operations');

eventEmitter.on('checkBalance', (accountID) => {
    console.log(`Checking balance for accountID: ${accountID}`);
});

eventEmitter.on('deposit', (accountID, amount) => {
    console.log(`Depositing $${amount} into accountID: ${accountID}`);
});

eventEmitter.on('withdraw', (accountID, amount) => {
    console.log(`Withdrawing $${amount} from accountID: ${accountID}`);
});

eventEmitter.on('viewTransactions', (accountID) => {
    console.log(`Viewing transactions for accountID: ${accountID}`);
});

module.exports = eventEmitter;
