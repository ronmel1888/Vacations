let usersLogic = require("../logic/users-logic");
const express = require("express");
const subscribers = require("../../realtime");
const jwt = require('jsonwebtoken');


const router = express.Router();

// POST http://localhost:3001/users/login
router.post("/login", async (request, response, next) => {

    let user = request.body;

    try {

        let successfullLoginData = await usersLogic.login(user);
        response.json(successfullLoginData);
    }
    catch (error) {
        console.error(error);
        return next(error);
    }
});

// ADD USER
// POST http://localhost:3001/users
router.post("/register", async (request, response, next) => {

    // Extracting the JSON from the packet's BODY
    let user = request.body;
    await sleep(3000);

    try {
        await usersLogic.addUser(user);
        response.json("user added");
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

router.get("/byMinAge", async (request, response, next) => {

    let minAge = request.query.minAge;
    console.log(minAge);
    try {
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

router.get("/:id", async (request, response, next) => {

    let id = request.params.id;
    console.log(id);
    try {
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

router.get("/updateVacationForAdmin/:vacationId", async (request, response, next) => {
    const data = request.body;
    const { vacationId } = request.params;
    const userId = '1';



    Object.keys(subscribers).forEach((subKey) => {
        subscribers[subKey].emit("vacationUpdated");
    });
});




module.exports = router;