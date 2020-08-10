#!/usr/bin/env node
const target = process.argv[2];
if (!target) {
	console.log('You must specify the file to process.');
	process.exit(-1);
}
const fs = require('fs')
fs.readFile(target, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  const result = data.replace(/replace text/g, 'I replaced it!!');

  fs.writeFile(target, result, 'utf8', function (err) {
     if (err) return console.log(err);
	  process.exit(0);
  });
});
