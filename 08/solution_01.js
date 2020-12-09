const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

let instructions = new Map();

lines.forEach((line,idx) => {
  [instruction, argument] = line.split(" ");
  instructions.set(idx, {instruction, argument: Number(argument), executed: false})
})

function runProgram(instructions) {
  let accumulator = 0;
  let i = 0;
  let finished = false;

  while (!finished) {
    let {instruction, argument, executed} = instructions.get(i);
  
    if (executed) {
      finished = true;
      return accumulator;
    }
  
    if (instruction === "acc") {
      accumulator += argument;
      instructions.set(i, {instruction, argument, executed: true})
      i++;
    } else if (instruction === "jmp") {
      instructions.set(i, {instruction, argument, executed: true})
      i = i + argument;
    } else {
      instructions.set(i, {instruction, argument, executed: true})
      i += 1;
    }
  }
}

console.log(runProgram(instructions));