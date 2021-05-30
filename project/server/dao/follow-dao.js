let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error")

async function followVacation(follow) {
    let sql = "INSERT INTO following (user_id , vacation_id)  values(?, ?, ?, ?)";
    let parameters = [follow.user_id, follow.vacation_id];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}


async function getVacations(userId) {
    let sql = "SELECT vacation_id FROM vacations WHERE vacationID = (SELECT vacation_id FROM following WHERE userID = ?)"
    let parameters = [userId];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}
module.exports = {
    getVacations,
    followVacation
}