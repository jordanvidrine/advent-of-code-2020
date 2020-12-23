let cups = `158937462`.split('').map(x => Number(x))

let turns = 1;

while (turns <= 100) {
    let currentCup = cups.shift();
    let targetCup = currentCup - 1;
    let takenCups = [...cups.splice(0,3)];

    if (targetCup < Math.min(...cups)) {
            targetCup = Math.max(...cups);
    }

    while (takenCups.includes(targetCup)) {
        if (targetCup - 1 < Math.min(...cups)) {
            targetCup = Math.max(...cups);
        } else {
            targetCup--;
        }
    }

    cups = [...cups].splice(0,cups.indexOf(targetCup)+1)
    .concat(...takenCups)
    .concat([...cups].splice(cups.indexOf(targetCup)+1,cups.length))
    .concat(currentCup);

    turns++;
}

console.log([...cups].splice(cups.indexOf(1)+1).concat([...cups].splice(0,cups.indexOf(1))))