let usersDao = require("../dao/users-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const { secret } = require("../config.json");
const jwt = require("jsonwebtoken");
const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";


async function addUser(user) {
    await validateAddUser(user)
    await usersDao.addUser(user);
}

async function validateAddUser(user) {
    // Validations
    if (await usersDao.isUserExistByName(user.userName)) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
}

// Only by admin
async function updateUser(user) {
    // Validations
    await usersDao.updateUser(user);
}

async function getUser(id) {
    let user = await usersDao.getUser(id);
    return user;
}

async function deleteUser(id) {
    await usersDao.deleteUser(id);
}



async function changePassword(user) {
    // Validations
    await usersDao.deleteUser(user);
}

async function login(user) {
    let userLoginData = await usersDao.login(user);
    const token = jwt.sign({ sub: saltLeft + user.userName + saltRight, userId: userLoginData.userId }, secret)
    let successfullLoginResponse = { token: token, user: userLoginData };
    return successfullLoginResponse;
}

module.exports = {
    addUser,
    updateUser,
    getUser,
    deleteUser,
    changePassword,
    login
};