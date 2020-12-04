const fs = require('fs');
let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(`\n\n`);
let testInput = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split('\n\n');

let passports = {};
let curPassPort = 0;

let passportKeys = {};

let reqValues = [ "byr","iyr","eyr","hgt","hcl","ecl","pid"]

const VALIDATORS = {
  byr: function(year) {
    return year.length === 4 && Number(year) >= 1920 && Number(year) <= 2002;
  },
  iyr: function (year) {
    return year.length === 4 && Number(year) >= 2010 && Number(year) <= 2020;
  },
  eyr: function (year) {
    return year.length === 4 && Number(year) >= 2020 && Number(year) <= 2030;
  },
  hgt: function (hgt) {
    let number = Number(hgt.match(/(\d*)(\w{2})/)[1])
    let unit = hgt.match(/(\d*)(\w{2})/)[2]

    if (unit === "cm") {
      return number >= 150 && number <= 193
    } else if (unit === "in") {
      return number >= 59 && number <= 76
    }
  },
  hcl: function(color) {
    let test = color.match(/[#][\w\d]{6}/);
    if (test) {
      return test[0] === color;
    } else {
      return false;
    }
  },
  ecl: function(color) {
    return color === "amb" ||
      color === "blu" ||
      color === "brn" ||
      color === "gry" ||
      color === "grn" ||
      color === "hzl" ||
      color === "oth";
  },
  pid: function(number) {
    let isNumber = Number.isInteger(Number(number));
    let isNineDigits = number.length === 9;

    return isNumber && isNineDigits;
  }
}

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
      } else {
        if (!VALIDATOR[req](passportKeys[req])) {
          isValid = false;
        }
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