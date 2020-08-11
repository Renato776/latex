#!/usr/bin/env node
/*Latex holds special meaning for the following characters:
 # $ % & ~ _ ^ \ { }
 This script is meant to automatically scape them if they are within a plain text block
 defined like: %--% Some stuff %--% However, it will only escape:
 _,&,#
 If you need to automatically escape the other remaining characters, use an estrict 
 plain text block defined like:
 %%__% Some stuff %__%%
 The above block will automatically escape all special characters. 
 Use it with caution as latex commands would not work within that block!
 * */
const plain_text = /%--%(([^\s]|\s)+)%--%/gm;
const estrict_plain_text = /%%__%(([^\s]|\s)+)%__%%/gm;
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
  let result = data.replace(plain_text, function(match){
	  match = match.slice(4,match.length-4);
  	return `%--%${match.replace(/_|&|#/gm,(m)=>'\\'+m)}%--%`;
  });
  result = result.replace(estrict_plain_text,function(match){
            match = match.slice(5,match.length-5);
	    return '%%__%' + match.replace(/#|\$|%|&|~|\\|_|\^|{|}/gm,   m=>m=='\\'?'$\\backslash$':'\\'+m) +'%__%%';
  });
  fs.writeFile(target, result, 'utf8', function (err) {
     if (err) return console.log(err);
	  process.exit(0);
  });
});
