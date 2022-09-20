const app = require("./app")
const port = process.env.PORT || 5000;
const dotenv = require("dotenv").config();
const toursRouter = require("./routes/tours.route");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database is connected");
})


app.use('/api/v1/tours', toursRouter)

app.listen(port, () => {
    console.log("Listening to port")
})