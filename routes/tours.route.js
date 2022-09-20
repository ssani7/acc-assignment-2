const express = require("express");
const { postTour, getAllTours, getTourById, getTrendingTour, getCheapestTour } = require("../controllers/tours.controller");

const router = express.Router();

router.route("/")
    .post(postTour)
    .get(getAllTours)

router.route('/trending')
    .get(getTrendingTour)

router.route('/cheapest')
    .get(getCheapestTour)

router.route('/:id')
    .get(getTourById)

module.exports = router;