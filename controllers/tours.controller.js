const { default: mongoose } = require("mongoose");
const Tour = require("../models/tour.model")

exports.getAllTours = async (req, res) => {
    try {
        const filter = { ...req.query };

        const excludeQuery = ["limit", "sort", "skip", "page"];
        excludeQuery.forEach(field => delete filter[field]);

        let query = {};

        if (req.query.sort) {
            const sort = req.query.sort.replace(",", " ");
            query.sort = sort;
        }
        if (req.query.fields) {
            const fields = req.query.fields.replace(",", " ");
            query.fields = fields;
        }

        const { limit = 5, skip = 0, page = 1 } = req.query;
        const result = await Tour.find({})
            .select(query.fields)
            .skip((page - 1) * Number(limit)).limit(limit)
            .sort(query.sort)


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

exports.getTourById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({
            status: "failed",
            message: "id is not valid"
        });

        const result = await Tour.findById(id);

        if (!result) return res.status(400).send({
            status: "failed",
            message: "No user Found"
        })

        const increaseView = await Tour.updateOne({ _id: id }, { $inc: { views: 1 } });

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

exports.updateToolById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateDoc = req.body;
        const result = await Tour.updateOne({ _id: id }, { $set: updateDoc }, { runValidators: true });
        res.send(result);

    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
}