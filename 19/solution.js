// needed help!
// again, much thanks to 
// https://www.youtube.com/watch?v=UcRsWkIyix0&ab_channel=thibpat

const fs = require('fs');
let lines = fs.readFileSync('./rules.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let messages = fs.readFileSync('./messages.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

let rules = new Map();

let regexedRules = {};

function parser(value,map) {
  if (value in regexedRules) {
    return regexedRules[value]
  }

  let regex = '';

  if (/[ab]/.test(value)) {
    regex = value.replace(/"/g,"")
  } else if (/\|/.test(value)) {
      let values = value.split(" | ")
      regex = `(${parser(values[0],map)}|${parser(values[1],map)})`;
  } else {
      let values = value.split(" ");
      regex = values.map(key => parser(rules.get(key),rules)).join('');
  }
  regexedRules[value] = regex;
  return regex;
}

// set rules
lines.forEach(line => {
  let parsed = line.split(": ").map(item => {
    return item.replace(/\"/g,"")
  });
  rules.set(parsed[0],parsed[1])
});

let tester = new RegExp(`^`+parser(rules.get('0'),rules)+`$`);

let sum=0;

messages.forEach(message => {
    if (tester.test(message)) {
        sum++
    }
})

console.log(sum)

rules.set('8', '42 | 42 8');
rules.set('11', '42 31 | 42 11 31');
const rule = new RegExp('^(?<group42>('+parser(rules.get('42'),rules)+')+)(?<group31>('+parser(rules.get('31'),rules)+')+)$');

sum=0;
for (const message of messages) {
    const matches = rule.exec(message);
    if(matches) {
        const {groups} = matches;
        const matches42 = groups.group42.match(new RegExp(parser(rules.get('42'),rules), 'g')).length;
        const matches31 = groups.group31.match(new RegExp(parser(rules.get('31'),rules), 'g')).length;
        if(matches42 > matches31) {
            sum++;
        }
    }
}
console.log(sum);