const crypto = require('crypto');
const { createUser, findUserById } = require('../data/userRepositroy');

function addUser(email){
    if(!email){
        throw new Error('email 是必填欄位');
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        throw new Error('email 格式不正確');
    }

    const user = {
        id: crypto.randomUUID(),
        email,
    }

    return createUser(user);
}

function getUser(id){
    const user = findUserById(id);
    if(!user){
        throw new Error('找不到這個 user');
    }
    return user;
}

module.exports = { addUser, getUser };