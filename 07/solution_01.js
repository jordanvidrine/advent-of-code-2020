const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

const map = new Map();

function containsColor(color) {
  if (color === 'shiny gold') return true;
  if (!map.has(color)) return false;

  const bagsWithin = map.get(color);
  for (const bag of bagsWithin) {
    if (containsColor(bag)) {
      return true;
    }
  }
  return false;
}

for (const line of lines) {
  const [bag, bags] = line.split (' bags contain ');

  bags.replace(/\./, '').split(', ').map(text => {
    const {groups} = /((?<number>\d+) )?(?<color>.*)/.exec(text.replace(/ bags?/, ''))
    if (!map.has(bag)) {
      map.set(bag, [])
    }
      map.set(bag, [...map.get(bag), groups.color])
  })

}

const colors = map.keys();
let total = 0;

for (const color of colors) {
  if(containsColor(color) && color !== 'shiny gold') total++;
}

console.log(total);

// PREVIOUS TRIES
// let bagRules = {};

// let regexMult = RegExp(/^(\w+ \w+) bags? contain (\d+) (\w+ \w+) bags?(?:, (\d+) (\w+ \w+) bags?)/);
// let regexSingle = RegExp(/^(\w+ \w+) bags? contain (\d+) (\w+ \w+) bags?/);
// let none = RegExp(/^(\w+ \w+) bags? contain no other bags/);

// input.forEach(line => {
//   let mult = regexMult.exec(line)
//   let single = regexSingle.exec(line)
//   let zero = none.exec(line);

//   if (mult) {
//     mult.shift();
//     let bag = null;
//     let bags = {};
//     mult.forEach((line,idx) => {
//       if (idx === 0) {
//         bag = line;
//       // if line is odd, it is a number indicating
//       // the amount of bags on the next line
//       } else if (idx > 0 && idx % 2) {
//         bags[mult[idx+1]] = Number(mult[idx]);
//       }
//       bagRules[bag] = bags;
//     })

//   } else if (single) {
//     let bag = single[1];
//     let bags = {};
//     bags[single[3]] = Number(single[2]);
//     bagRules[bag] = bags    
//   } else {
//     let bag = zero[1];
//     bagRules[bag] = 0;
//   }
// })

// function contains(bags, bag, name) {
//   debugger;
//   for (let item in bag) {
//       return item == name || contains(bags, bags[item], name)
//   }
// }

// let count = 0;

// for (let bags in bagRules) {
//   if (contains(bagRules, bagRules[bags], 'shiny gold')) {
//       count++;
//   }
// }

// console.log(count)

// for (let rule in bagRules) {
//   let color = rule;
// }

// let bagsContainingGold = [];

// for (let rule in bagRules) {
//   if (bagRules[rule].hasOwnProperty('shiny gold')) {
//     bagsContainingGold.push(rule)
//   }
// }

// let finished = false;

// while (!finished) {
//   let foundAtLeastOne = false;
//   for (let rule in bagRules) {
//     // continue to cycle through all bags, adding colors,
//     // until none are left
//     bagsContainingGold.forEach(color => {
//       if (bagRules[rule].hasOwnProperty(color)) {
//         if (bagsContainingGold.indexOf(rule) === -1) {
//           bagsContainingGold.push(rule)
//           foundAtLeastOne = true;
//         }
//       }
//     })
//   }
//   if (!foundAtLeastOne) {
//     finished = true;
//   }
// }

