const fs = require("fs");
request = require("request");
module.exports = function () {
  this.download = async function (uri, filename) {
    return new Promise((resolve, reject) => {
      request.head(uri, function (err, res, body) {
        try {
          request(uri)
            .pipe(fs.createWriteStream(filename))
            .on("close", () => {
              resolve(true);
            });
        } catch (error) {
          console.log(error);
        }
      });
    });
  };
};
