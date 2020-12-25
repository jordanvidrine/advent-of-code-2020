let lines = ``.split(/\n/).filter(x => x)

let regex = /(se|sw|w|nw|ne|e)/g;

let tiles = {

}

lines.forEach(line => {
    let matches = line.match(regex);

    let x = 0;
    let y = 0;

    matches.forEach(direction => {
        if (direction === "ne") {
            x+=1
            y+=1
        } else if (direction === "e") {
            x+=2
        } else if (direction === "se") {
            y-=1
            x+=1
        } else if (direction === "sw") {
            y-=1
            x-=1
        } else if (direction === "w") {
            x-=2
        } else { // direction === "nw"
            y+=1
            x-=1
        }
    })

    if (`${x},${y}` in tiles) {
        let status = tiles[`${x},${y}`];
        if (status === 0) {
            tiles[`${x},${y}`] = 1
        } else {
            tiles[`${x},${y}`] = 0
        }
    } else {
        tiles[`${x},${y}`] = 1
    }
})

let sum = 0;

for (let tile in tiles) {
    sum+= tiles[tile]
}

console.log(sum)
