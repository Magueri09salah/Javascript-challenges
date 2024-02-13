// auth.js

const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

function addUser(user) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
}

function getUsers() {
    try {
        const usersData = fs.readFileSync(usersFilePath);
        return JSON.parse(usersData);
    } catch (error) {
        return [];
    }
}

function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

module.exports = {
    addUser,
    getUsers,
    saveUsers
};
