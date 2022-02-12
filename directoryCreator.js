const path = require("path");
const fs = require("fs");

module.exports = function () {
  this.createDirectories = function (pathname) {
    return new Promise((resolve, reject) => {
      const __dirname = path.resolve();
      pathname = pathname.replace(
        /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
        ""
      ); // Remove leading directory markers, and remove ending /file-name.extension
      fs.mkdir(path.resolve(`${__dirname}/downloads`, pathname), { recursive: true }, (e) => {
        if (e) {
          console.error(e);
        } else {
          // console.log(pathname);
        }
        resolve(pathname);
      });
    });
  };
};
