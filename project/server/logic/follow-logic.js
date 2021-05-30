let followDao = require("../dao/follow-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");




async function followVacation(user) {
    await followDao.addFollower(user);
}

async function addFollower(user) {
    
}

module.exports = {
    followVacation
}