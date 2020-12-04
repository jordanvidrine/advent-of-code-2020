const fs = require('fs');
let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(`\n\n`);
let testInput = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split('\n\n');

let passports = {};
let curPassPort = 0;

let passportKeys = {};

let reqValues = [ "byr","iyr","eyr","hgt","hcl","ecl","pid"]

// build passport
for (let i = 0; i < input.length; i++) {

    let line = input[i].split(/\s/)

    line.forEach(item => {
      let key = item.split(":")[0]
      let value = item.split(":")[1];
      passportKeys[key] = value;
    })

    let isValid = true;

    reqValues.forEach(req => {
      if (!passportKeys.hasOwnProperty(req)) {
        isValid = false;
      }
    })

    let passport = {
      isValid,passportKeys
    }

    passports[curPassPort] = passport;
    passportKeys = {};
    curPassPort++;
}

let validPassports = 0;

for (let passport in passports) {
  if (passports[passport]["isValid"]) {
    validPassports++
  }
}

console.log(validPassports)