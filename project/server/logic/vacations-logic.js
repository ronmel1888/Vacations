const vacationsDao = require("../dao/vacations-dao");

async function getAllForAdmin() {
    const vacations = await vacationsDao.getAll();
    const following = await vacationsDao.getFollowingCount();

    const vacationsWithFollowingData = vacations.map(data => {
        const followersData = following.find(({ vacationId }) => vacationId === data.vacationId)
        data.followersCount = followersData ? followersData.count : 0
        return data;
    })
    return vacationsWithFollowingData;
}

async function getAllForUser(userId) {
    const vacations = await vacationsDao.getAll();
    const following = await vacationsDao.getAllFollowing(userId);
    const followingVacationIds = following.map(({ vacation_id }) => vacation_id);

    const vacationsWithFollowingData = vacations.map(data => {
        data.isFollowing = followingVacationIds.includes(data.vacationId)
        return data;
    })
    return vacationsWithFollowingData;
}

async function updateVacationFollowing(vacationId, userId, isFollowingClient) {
    const followingList = await vacationsDao.getAllFollowing(userId);
    const followingVacationIds = followingList.map(({ vacation_id }) => vacation_id + '');
    const isFollowing = followingVacationIds.includes(vacationId);
    if (isFollowing && !isFollowingClient) {
        console.log('removeFollowing');
        await vacationsDao.removeFollowing(vacationId, userId);
    } else if (!isFollowing && isFollowingClient) {
        console.log('addFollowing');
        await vacationsDao.addFollowing(vacationId, userId);
    }
}

async function deleteVacation(vacationId) {
    await vacationsDao.deleteVacation(vacationId);
}
async function addVacation({ dest, description, startDate, endDate, price, picture }) {
    await vacationsDao.addVacation(dest, description, startDate, endDate, price, picture);
}
async function editVacation(vacationId, dest, description, startDate, endDate, price, picture) {
    await vacationsDao.editVacation(vacationId, dest, description, startDate, endDate, price, picture);
}

module.exports = {
    getAllForUser,
    getAllForAdmin,
    addVacation,
    editVacation,
    updateVacationFollowing,
    deleteVacation,
}