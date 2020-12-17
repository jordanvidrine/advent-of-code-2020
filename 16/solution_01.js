const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x)
// let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

let nearbyTickets = [];
let myTicket = [];
let fieldRules = [];

let rejects = [];

let currentSection = "fieldRules";

lines.forEach(line => {

  let field = /(?<field>^\w*[ * \w*]*:) (?<lowerOne>\d+)-(?<upperOne>\d+) or (?<lowerTwo>\d+)-(?<upperTwo>\d+)/s;

  if (currentSection === "fieldRules") {
    if (field.test(line)) {
      let {groups} = field.exec(line)
      fieldRules.push([
        Number(groups.lowerOne),
        Number(groups.upperOne),
        Number(groups.lowerTwo),
        Number(groups.upperTwo)])
    } else {
      currentSection = "myTicket"
    }
  } else if (line === "nearby tickets:") {
    currentSection = "nearbyTickets";
  } else {
    if (currentSection === "myTicket") {
      myTicket = [...line.split(",").map(x => Number(x))]
    } else {
      nearbyTickets.push([...line.split(",").map(x => Number(x))])
    }
  }  
})

nearbyTickets.forEach(ticket => {
  ticket.forEach(number => {
  let isValid = false;
    for (let i = 0; i < fieldRules.length; i++) {
      let rule = fieldRules[i];
      if (
        number >= rule[0] && number <= rule[1] ||
        number >= rule[2] && number <= rule[3]
      ) {
        isValid = true;
        break;
      }
    }
    if (!isValid) {
        rejects.push(number)
    }
  })
})

console.log(rejects.reduce((a,b) => {
  return a+b
},0))