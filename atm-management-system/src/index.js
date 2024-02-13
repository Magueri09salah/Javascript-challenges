// index.js

const readline = require('readline');
const auth = require('./auth');
const eventEmitter = require('./eventHandler');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function prompt(question) {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function authenticate() {
    const accountID = await prompt('Enter your account ID: ');
    const pin = await prompt('Enter your PIN: ');

    const users = auth.getUsers();
    const user = users.find(user => user.accountID === accountID && user.pin === pin);

    if (user) {
        console.log('Authentication successful.');
        return user.accountID;
    } else {
        console.log('Authentication failed. Invalid account ID or PIN.');
        return null;
    }
}

async function main() {
    const accountID = await authenticate();
    if (accountID) {
        console.log('Choose an option:');
        console.log('1. Check Balance');
        console.log('2. Deposit Money');
        console.log('3. Withdraw Money');
        console.log('4. View Transaction History');

        const choice = await prompt('Enter your choice: ');

        switch (choice) {
            case '1':
                eventEmitter.emit('checkBalance', accountID);
                break;
            case '2':
                const amountToDeposit = parseFloat(await prompt('Enter amount to deposit: '));
                eventEmitter.emit('deposit', accountID, amountToDeposit);
                break;
            case '3':
                const amountToWithdraw = parseFloat(await prompt('Enter amount to withdraw: '));
                eventEmitter.emit('withdraw' , accountID, amountToWithdraw);
                break;
            case '4':
                eventEmitter.emit('viewTransactions', accountID);
                break;
            default:
                console.log('Invalid choice.');
        }
    }
    rl.close();
}

main();
