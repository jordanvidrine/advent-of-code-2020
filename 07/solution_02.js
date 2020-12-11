// with help from https://dev.to/thibpat/solving-day-7-of-advent-of-code-2020-in-javascript-1ohh

const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLinesTwo = fs.readFileSync('./test_input_02.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

const map = new Map();

for (const line of lines) {
  const [bag, bags] = line.split (' bags contain ');

  bags.replace(/\./, '').split(', ').map(text => {
    const {groups} = /((?<number>\d+) )?(?<color>.*)/.exec(text.replace(/ bags?/, ''))
    if (!map.has(bag)) {
      map.set(bag, [])
    }
      if (!groups.number) groups.number = 0;
      map.set(bag, [...map.get(bag), groups])
  })

}

function sumBags(topBag) {
  if (topBag.number == 0) return 0;
  console.log(topBag)

  const bagsWithin = map.get(topBag.color);
  let sum = 1;
  for (const bag of bagsWithin) {
    sum += bag.number * sumBags(bag);
  }
  return sum;
}