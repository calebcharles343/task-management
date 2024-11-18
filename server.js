const mongoose = require("mongoose");
const dotenv = require("dotenv"); // for 'config.env' file

//////////////////////////////////////////////////////////////////////////////////////////
//GLOBAL UNCAUGHT EXCEPTION ERROR HANDLER as (Last Safety Net) i.e. SYNCHRONOUSE CODE
/////////////////////////////////////////////////////////////////////////////////////////
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...", err.stack);
  console.log(err.name, err.message);
  process.exit(1); //graceful shutdown
});

dotenv.config({ path: "./config.env" }); // use for 'config.eng' file $ Its available everywhere
// console.log(app.get('env')); //to get working environment
// console.log(process.env); //to get working environment

const app = require("./app");

///////////////////////////////
//CONNECTING TO DATABASE
///////////////////////////////

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(() => console.log("DB connection successful!"));

////////////////////
//START SERVER
//////////////////
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

////////////////////////////////////////////////////////////////////////////////////
//GLOBAL UNHANDLED REJECTION ERROR HANDLER as (Last Safety Net)
//for rejected promises not handled i.e. ASYNCHRONOUSE CODE
/////////////////////////////////////////////////////////////////////////////////////
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
