const fs = require('fs');
let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(/\r?\n/);
let testInput = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split(/\r?\n/);

let validPasswords = 0;

for (let i = 0; i < input.length; i++) {
  let line = input[i];
  let rule = line.split(":")[0];
  let password = line.split(":")[1].trim().split("")

  let ruleChar = rule.split(" ")[1];
  let pos1 = Number(rule.split(" ")[0].split("-")[0]);
  let pos2 = Number(rule.split(" ")[0].split("-")[1]);

  let accuratePositions = 0;

  if (password[pos1 - 1] === ruleChar) {
    accuratePositions++
  }

  if (password[pos2 - 1] === ruleChar) {
    accuratePositions++
  }

  if (accuratePositions === 1) {
    validPasswords++
  }
}

console.log(validPasswords)