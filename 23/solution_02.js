let cups = `158937462`.split('').map(x => Number(x))
let SIZE = 1000000;

class ListNode {
    constructor(data) {
        this.label = data
        this.next = null;
        this.previous = null;
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head;
    }
}

let Dictionary = {

}

for (let i = 0; i < cups.length; i++) {
    Dictionary[cups[i]] = new ListNode(cups[i]);
    if (cups[i-1]in Dictionary) {
        Dictionary[cups[i-1]].next = Dictionary[cups[i]];
        Dictionary[cups[i]].previous = Dictionary[cups[i-1]];
    }

    if (i === SIZE - 1) {
            Dictionary[cups[i]].next = Dictionary[cups[0]]
            Dictionary[cups[0]].previous = Dictionary[cups[i]]
        }  
}

for (let i = Math.max(...cups) + 1; i <= SIZE; i++) {
    Dictionary[i] = new ListNode(i);
    // do this only for the first time
    if (i === Math.max(...cups) + 1) {
        Dictionary[cups[cups.length-1]].next = Dictionary[i];
        Dictionary[i].previous =  Dictionary[cups[cups.length-1]];
    } else {
        Dictionary[i-1].next = Dictionary[i];
        Dictionary[i].previous = Dictionary[i-1];
    }
    if (i === SIZE) {
            Dictionary[i].next = Dictionary[cups[0]]
            Dictionary[cups[0]].previous = Dictionary[i]
        }   
}

let turns = 1;
let nextCup = null;

while (turns <= 10000000) {
    let currentCup;

    if (nextCup === null) {
        currentCup = {...Dictionary[cups[turns-1]]}
    } else {
        currentCup = {...nextCup};
    }

    let cup1Label = currentCup.next.label
    let cup2Label = currentCup.next.next.label
    let cup3Label = currentCup.next.next.next.label

    let targetCup = {...Dictionary[currentCup.label - 1]};

    if (!targetCup.label || targetCup.label < 1 ) {
        targetCup = Dictionary[SIZE];
    }

    let targetCupLabel = {...targetCup}.label;

    while (targetCupLabel === cup1Label || targetCupLabel === cup2Label || targetCupLabel === cup3Label) {
        if (targetCupLabel - 1 < 1) {
            targetCupLabel = {...Dictionary[SIZE]}.label;
        } else {
            targetCupLabel--;
        }
    }

    nextCup = Dictionary[cup3Label].next;

    Dictionary[currentCup.label].next = Dictionary[cup3Label].next;
    Dictionary[cup1Label].previous = Dictionary[targetCupLabel];
    Dictionary[cup3Label].next = Dictionary[targetCupLabel].next;
    Dictionary[targetCupLabel].next = Dictionary[cup1Label];

    turns++;
}

console.log(Dictionary[1].next.label * Dictionary[1].next.next.label)

