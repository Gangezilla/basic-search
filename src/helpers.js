const fs = require("fs");

const readdirAsync = dirname =>
  new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, filenames) => {
      if (err) reject(err);
      else resolve(filenames);
    });
  });

const readFileAsync = filename =>
  new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

module.exports = {
  readdirAsync,
  readFileAsync
};
