const mongoose = require("mongoose");


const tourScema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
        minLength: [5, "Name is too short"],
        maxLength: [200, "Name is too large"]
    },
    location: {
        type: String,
        required: true,
        minLength: [5, "location name is too short"],
        maxLength: [100, "location name is too large"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    entryFee: {
        type: Number,
        required: true,
        min: [0, "Entry fee is not valid"],

    },
    capacity: {
        type: Number,
        required: true,
        min: [0, "capacity is not valid"],
        validate: {
            validator: (value) => {
                const integer = Number.isInteger(value);
                return integer;
            }
        },
        message: "capacity is not valid"
    },
    status: {
        type: String,
        required: [true, "Tour status is required"],
        enum: {
            values: ["accepting", "full", "expired"],
            message: "tour status is not valid"
        }
    },
    starting: {
        type: Date,
        required: [true, "Tour starting date is required"]
    },
    ending: {
        type: Date,
        required: [true, "Tour ending date is required"]
    },
    views: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

const Tour = new mongoose.model('Tour', tourScema);


module.exports = Tour;