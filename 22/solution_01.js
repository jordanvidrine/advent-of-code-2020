let player1 = `9
2
6
3
1`.split(/\n/).map(x => Number(x))

let player2 = `5
8
4
7
10`.split(/\n/).map(x => Number(x))

while (player1.length !== 0 && player2.length !==0) {
    let card1 = player1.shift();
    let card2 = player2.shift();
    if (card1 > card2) {
        player1.push(card1,card2)
    } else {
        player2.push(card2,card1)
    }
}

let winner = (player1.length > player2.length) ? player1 : player2

let sum = 0;

for (let i = 0; i < winner.length; i++) {
    sum+= winner[i] * (winner.length - i);
}

console.log(sum)