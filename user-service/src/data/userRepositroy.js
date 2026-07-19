const users = [];

function createUser(user) {
  users.push(user);
  return user;
}

function findUserById(id) {
  return users.find(u => u.id === id);
}

module.exports = { createUser, findUserById };