const fs = require('fs');
let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(/\r?\n/);
let testInput = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split(/\r?\n/);

let validPasswords = 0;

for (let i = 0; i < input.length; i++) {
  let line = input[i];
  let rule = line.split(":")[0];
  let password = line.split(":")[1].trim().split("")

  // store password character counts in an object
  let passwordContents = {};

  password.forEach(char => {
    if (!passwordContents[char]) {
      passwordContents[char] = 1;
    } else {
      passwordContents[char]++
    }
  });

  let ruleChar = rule.split(" ")[1];
  let min = Number(rule.split(" ")[0].split("-")[0]);
  let max = Number(rule.split(" ")[0].split("-")[1]);

  // compare character min + max counts to the character counts
  // in the password contents object
  if (passwordContents[ruleChar] >= min && passwordContents[ruleChar] <= max) {
    validPasswords++;
  }
}

console.log(validPasswords)