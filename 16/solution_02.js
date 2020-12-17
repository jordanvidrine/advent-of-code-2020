const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x)
// let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

let nearbyTickets = [];
let myTicket = [];
let fieldRules = {

};

let rejects = [];

let currentSection = "fieldRules";

lines.forEach(line => {

  let field = /(?<field>^\w*[ * \w*]*:) (?<lowerOne>\d+)-(?<upperOne>\d+) or (?<lowerTwo>\d+)-(?<upperTwo>\d+)/s;

  if (currentSection === "fieldRules") {
    if (field.test(line)) {
      let {groups} = field.exec(line)
      fieldRules[groups.field] = {
        rules: [
          Number(groups.lowerOne),
          Number(groups.upperOne),
          Number(groups.lowerTwo),
          Number(groups.upperTwo)],
          validIndex: null
      }
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
    for (let field in fieldRules) {
      let rule = fieldRules[field].rules;
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

// console.log(nearbyTickets.length)

nearbyTickets = nearbyTickets.filter(ticket => {
  let includes = false;
  for (let i = 0; i < rejects.length; i++) {
    if (ticket.indexOf(rejects[i]) !== -1) {
      includes = true;
      break;
    }
  }
  if (includes) {
    return false;
  } else {
    return true;
  }
})

// console.log(nearbyTickets.length)

function matchRule(number, rule) {
  let set = rule.rules;
  if ( number >= set[0] && number <= set[1] ||
    number >= set[2] && number <= set[3]
  ) {
    return true;
  } else {
    return false;
  }
}

let matches = [];

let findTrue = function(tickets,rules) {
  for (let i = 0; i < myTicket.length; i++) {
    for (let rule in rules) {
      let valid = true;
      for (let ticket of tickets) {
        let number = ticket[i];
        if (!matchRule(number,rules[rule])) {
          valid = false;
          break;
        } 
      }
      if (valid) {
        matches.push({rule, index:i})
      }
    }
  }
}

findTrue(nearbyTickets, fieldRules)

while (matches.length > Object.keys(fieldRules).length) {
  for (let i = 0; i < myTicket.length; i++) {
    let rulesMatchingIndex = matches.filter(m => m.index == i);
    console.log(rulesMatchingIndex)
    if (rulesMatchingIndex.length == 1) {
      console.log("ONLY ONE",rulesMatchingIndex)
      let currentRule = rulesMatchingIndex[0]
      matches = matches.filter(m => {
        if (m.rule === currentRule.rule) {
          // will delete matching rules where the rules.index
          // does not match the current rules index
          // we use the current rule, because it is the ONLY rule at this index, which means its the correct one
          return m.index === currentRule.index;
        }
        return true;
      })
    }
  }
}

matches = matches.filter(m => {
  return m.rule.split(" ")[0] === "departure"
})

console.log(myTicket[3]*myTicket[6]*myTicket[11]*myTicket[12]*myTicket[13]*myTicket[18])
