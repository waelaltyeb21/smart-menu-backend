const mongo = require("mongoose");
mongo.connect(process.env.DB_MONGO_URI)
.then(() => console.log("Connected To DB"))
.catch(() => console.log("Something Went Wrong"));