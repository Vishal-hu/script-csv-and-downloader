const csv = require("csv-parser");
const fs = require("fs");
module.exports = function () {
  this.loadFiles = async function (input) {
    function readContent(fileName) {
      return new Promise((resolve, reject) => {
        const rows = [];
        try {
          fs.createReadStream(fileName)
            .pipe(csv())
            .on("data", (row) => {
              rows.push(row);
            })
            .on("end", () => {
              resolve(rows);
            });
        } catch (error) {
          console.log(error);
        }
      });
    }
    try {
      var data = await readContent(
        `${__dirname}/csvFiles/${input.filename}.csv`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};
