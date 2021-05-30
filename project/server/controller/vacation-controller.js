let vacationsLogic = require("../logic/vacations-logic");
const express = require("express");
const subscribers = require('../../realtime');
const authenticateJwtRequestToken = require("../middleware/auth");
// const { use } = require("./user-controller");


const router = express.Router();

// regular user: 
// 1. view all vacations with follow data
// 2. toggle of following a vacation

// admin user:
// 1. view all vacations
// 2. support CRUD on vacation
// [{ id: '123', description: 'rome', startDate: 'whatever / 4', isFollowing: false }]
router.get("/", authenticateJwtRequestToken, async (request, response, next) => {
    let vacations;
    if (request.user.userType === 'ADMIN') {
        vacations = await vacationsLogic.getAllForAdmin()
    } else {
        vacations = await vacationsLogic.getAllForUser(request.user.userId)
    }
    response.json(vacations);


    // try {
    //     await usersLogic.getAll()
    //     response.json();
    // }
    // catch (error) {
    //     return next(error);
    // }

});

// [{ description: 'rome', startDate: 'whatever / 4', isFollowing: false }]
router.get("/newendpoint", async (request, response, next) => {
    const userId = '1';
    let vacations = await vacationsLogic.getAll(userId);
    const socket = subscribers[userId];

    if (socket) {
        socket.emit("vacationUpdated");
    }
    response.json(vacations);


    // try {
    //     await usersLogic.getAll()
    //     response.json();
    // }
    // catch (error) {
    //     return next(error);
    // }

});

router.put("/follow/:vacationId", async (request, response, next) => {
    const { vacationId } = request.params;
    const { isFollowing } = request.body;
    const userId = 1;
    await vacationsLogic.updateVacationFollowing(vacationId, userId, isFollowing);
    response.json({});
});
router.put("/:vacationId", async (request, response, next) => {
    const { vacationId } = request.params;
    const data = request.body;
    const userId = 1;
    await vacationsLogic.editVacation(vacationId,
        data[0].dest, data[0].description, data[0].startDate, data[0].endDate, data[0].price, data[0].picture);
    response.json({});
});
router.post("/", async (request, response, next) => {
    const data = request.body;
    const userId = 1;
    await vacationsLogic.addVacation(data);
    response.json({});
});

router.delete("/:vacationId", async (request, response, next) => {
    const { vacationId } = request.params;
    const userId = 1;
    await vacationsLogic.deleteVacation(vacationId);
    response.json({});
});

module.exports = router;