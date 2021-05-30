let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error")

// let user = { username: "Yossi", password: "1234", type: "CUSTOMER" };
// addUser(user);

async function addUser(user) {
    let sql = "INSERT INTO users (FirstName, LastName, userName, password)  values(?, ?, ?, ?)";
    let parameters = [user.firstName, user.lastName, user.userName, user.password];
    try {

        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

// Only by admin
async function updateUser(user) {
    // הסדר בפרמטרים של 2 השורות הבאות חייב להיות זהה
    let sql = "UPDATE users SET password = ?, company_id=?, type = ? where userId=? ";
    let parameters = [user.password, user.companyId, user.type, user.id];
    await connection.executeWithParameters(sql, parameters);
}

async function getUser(id) {
    let sql = "select * from users where userId=?";
    let parameters = [id];
    let user = await connection.executeWithParameters(sql, parameters);

    return user ? user[0] : null;
}

async function deleteUser(id) {
    let sql = "delete from users where userId=?";
    let parameters = [id];
    await connection.executeWithParameters(sql, parameters);
}


async function changePassword(user) {
    let sql = "UPDATE users SET password = ? where userId=?";
    let parameters = [user.password, user.id];
    await connection.executeWithParameters(sql, parameters);
}

async function isUserExistByName(username) {

    let usernameExistsResult;
    try {
        usernameExistsResult = await connection.executeWithParameters("select * from Users where username = ?", [username]);
    }
    catch (e) {
        // This is an example, for a situation where a TECHNICAL ERROR HAD OCCURED
        // that error threw an exception - WHICH WE WANT TO WRAP with a ServerError
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(username), e);
    }

    return !(usernameExistsResult == null || usernameExistsResult.length == 0)
}

async function login(user) {
    // UNCOMMENT IN ORDER TO SEE A GENERAL ERROR EXAMPLE
    // let sql = "SELECT * FROM users where username =? and password =?";
    let sql = "SELECT * FROM users where userName =? and password =?";

    let parameters = [user.userName, user.password];

    let usersLoginResult;
    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        // This is an example, for a situation where a TECHNICAL ERROR HAD OCCURED
        // that error threw an exception - WHICH WE WANT TO WRAP with a ServerError
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }

    // A functional (!) issue which means - the userName + password do not match
    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    console.log("All good ! ")
    return usersLoginResult[0];
}

// let user = {username:'Roni', password:'4444', type:'CUSTOMER', companyId: null};
// addUser(user);

// let user = {password:'5555', id: 2, companyId: 1, type:'ADMIN'};
// updateUser(user);

// let user = getUser(2);
// deleteUser(2);

// login({userName:"Avi", password:"6789"});

module.exports = {
    addUser,
    updateUser,
    getUser,
    deleteUser,
    changePassword,
    login,
    isUserExistByName
};