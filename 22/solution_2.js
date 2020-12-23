let player1 = `13
25
18
6
42
8
37
27
44
38
10
28
50
5
16
47
30
29
39
21
2
4
12
35
32`.split(/\n/).map(x => Number(x))

let player2 = `20
14
46
34
7
26
15
43
36
49
11
23
31
48
1
19
45
22
24
40
41
17
33
9
3`.split(/\n/).map(x => Number(x))


let deckStorage = [];

function recursiveCombat(player1Deck,player2Deck) {
    const alreadyPlayed = new Set();

    while (player1Deck.length > 0 && player2Deck.length > 0) {
        let state = player1Deck.join(',') + `-` + player2Deck.join(',');

        if(alreadyPlayed.has(state)) {
            return {
                winner: 1,
                deck: player1Deck
                }
        }

        alreadyPlayed.add(state)

        let card1 = player1Deck.shift();
        let card2 = player2Deck.shift();

        let player;
        if (player1Deck.length >= card1 && player2Deck.length >= card2) {
            // recursive combat here.
            let newDeck1 = [...player1Deck.slice(0,card1)];
            let newDeck2 = [...player2Deck.slice(0,card2)];
            let {winner, deck} = recursiveCombat(newDeck1,newDeck2);
            player = winner;
        } else {
            player = card1 > card2 ? 1 : 2
        }

        if (player == 1) {
                player1Deck.push(card1,card2)
        } else {
            player2Deck.push(card2,card1)
        }
    }

    return {
        winner: player1Deck.length > 0 ? 1 : 2,
        deck: player1Deck.length > 0 ? player1Deck : player2Deck
    }
}

let {deck} = recursiveCombat(player1, player2);

let sum = 0;

for (let i = 0; i < deck.length; i++) {
    sum+= deck[i] * (deck.length - i);
}

console.log(sum)