let followLogic = require("../logic/follow-logic");
const express = require("express");
const router = express.Router();


router.post("/:id", async (request, response, next) => {

    // Extracting the JSON from the packet's BODY
    let vacationId = request.params.id;

    try {
        let followVacation = await followLogic.followVacation(vacationId);
        response.json(followVacation);
    }
    catch (error) {
        console.error(error);
        return next(error);
    }
});