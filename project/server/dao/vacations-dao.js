const connection = require("./connection-wrapper");

async function getAll() {
    const vacations = await connection.execute("select * from vacations");
    return vacations;
}

async function getAllFollowing(userId) {
    const following = await connection.execute(`select * from following where user_id = ${userId}`);
    return following;
}

const parseDate = (dateStr) => {
    const dateParts = dateStr.split('/')
    return new Date(parseInt(dateParts[2]), parseInt(dateParts[1]), parseInt(dateParts[0]))
}

async function addVacation(dest, description, startDate, endDate, price, picture) {
    await connection.executeWithParameters(`insert into vacations (dest, description, startDate, endDate, price, picture) values (?, ?, ?, ?, ?, ?)`, [dest, description, parseDate(startDate), parseDate(endDate), price, picture]);
}

async function editVacation(vacationId, dest, description, startDate, endDate, price, picture) {
    
    await connection.executeWithParameters(`update vacations set dest=?, description=?, startDate=?, endDate=?, price=?, picture=? where vacationId =? ` , [dest, description, startDate, endDate, price, picture, vacationId]);
}

async function addFollowing(vacationId, userId) {
    await connection.executeWithParameters(`insert into following values (?, ?)`, [userId, vacationId]);
}

async function removeFollowing(vacationId, userId) {
    await connection.executeWithParameters(`delete from following where user_id = ? and vacation_id = ?`, [userId, vacationId]);
}

async function deleteVacation(vacationId) {
    await connection.executeWithParameters(`delete from vacations where vacationId = ?`, [vacationId]);
}

async function getVacations(userId) {
    let sql = "SELECT vacation_id FROM vacations WHERE vacationID = (SELECT vacation_id FROM following WHERE userID = ?)"
    let parameters = [userId];
    const userVacations = null
    try {
        userVacations = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
        userVacations = null;
    }
    return userVacations
}

async function getFollowingCount(userId) {
    let sql = "select vacation_id vacationId, count(*) count from following  group by vacation_id"
    let userVacations = null
    try {
        userVacations = await connection.executeWithParameters(sql, []);
    }
    catch (e) {
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
        userVacations = null;
    }
    return userVacations
}


module.exports = {
    getAll,
    getFollowingCount,
    getAllFollowing,
    addVacation,
    editVacation,
    addFollowing,
    removeFollowing,
    deleteVacation,
    getVacations
}