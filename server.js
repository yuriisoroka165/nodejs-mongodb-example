const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const application = express();

// parse application json
application.use(express.json());
application.use(cors());

const routerApi = require("./api/index");
application.use("/api", routerApi);

application.use((request, response, next) => {
    response.status(404).json({
        status: "error",
        code: 404,
        message: "Use api on routes: /api/tasks",
        data: "Not found",
    });
});

application.use((error, request, response, next) => {
    console.log(error.stack);
    response.status(500).json({
        status: "fail",
        code: 500,
        message: error.message,
        data: "Internal Server Error",
    });
});

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connection
    .then(() => {
        application.listen(PORT, function () {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    })
    .catch(error =>
        console.log(`Server not running. Error message: ${error.message}`)
    );
