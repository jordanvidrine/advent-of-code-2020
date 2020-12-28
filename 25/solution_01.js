// for i < loop size
//// value = value * subject number
//// value = remainder of value / 20201227

// For example, suppose you know that the card's public key is 5764801.
// With a little trial and error, you can work out that the card's loop size must be 8,
// because transforming the initial subject number of 7 with a loop size of 8 produces 5764801.

let cardSubject = 7;
let cardValue = 1;
let cardLoopSize = 0;

while (cardValue !== 19241437) {
    cardValue = cardValue * cardSubject;
    let remainder = cardValue % 20201227
    cardValue = remainder;
    cardLoopSize++;
}

console.log(cardLoopSize)

let doorSubject = 7;
let doorValue = 1;
let doorLoopSize = 0;

while (doorValue !== 17346587) {
    doorValue = doorValue * doorSubject;
    let remainder = doorValue % 20201227
    doorValue = remainder;
    doorLoopSize++;
}

console.log(doorLoopSize)

let doorPublicKey = 17346587;
let encryptionValue = 1;

for (let i = 0; i < cardLoopSize; i++) {
    encryptionValue = encryptionValue * doorPublicKey;
    let remainder = encryptionValue % 20201227;
    encryptionValue = remainder;
}

console.log(encryptionValue)
