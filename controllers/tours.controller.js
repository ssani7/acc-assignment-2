const { default: mongoose } = require("mongoose");
const Tour = require("../models/tour.model")

exports.getAllTours = async (req, res) => {
    try {
        const result = await Tour.find({});
        res.status(200).send({
            status: "success",
            message: "Data inserted",
            data: result
        });
    } catch (error) {

    }
}

exports.getTourById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({
            status: "failed",
            message: "id is not valid"
        })

        const result = await Tour.findById(id);
        const increaseView = await Tour.updateOne({ _id: id }, { $inc: { views: 1 } })

        if (!result) return res.status(400).send({
            status: "failed",
            message: "No user Found"
        })

        result.viewCount();
        res.status(200).send({
            status: "success",
            data: result
        });
    } catch (error) {

    }
}

exports.postTour = async (req, res) => {
    try {
        const tour = new Tour(req.body);
        if (tour.starting > tour.ending) {
            return res.status(400).send({
                status: "failed",
                message: "ending date cannot be before starting date"
            })
        }
        const result = await tour.save();

        res.status(200).send({
            status: "success",
            message: "Data inserted",
            data: result
        });
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}

exports.getTrendingTour = async (req, res) => {
    try {
        const result = await Tour.find({}).sort({ views: -1 }).limit(3);
        res.status(200).send({
            status: "success",
            data: result
        });
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}

exports.getCheapestTour = async (req, res) => {
    try {
        const result = await Tour.find({}).sort({ entryFee: 1 }).limit(3);
        res.status(200).send({
            status: "success",
            data: result
        });
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}