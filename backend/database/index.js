const mongo = require("./mongo");
const dynamo = require("./dynamo");

let DB;
// if (process.NODE_ENV === "PRODUCTION") {
if (false) {
  DB = dynamo;
} else {
  DB = mongo;
}

module.exports = DB;
