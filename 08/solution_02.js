const fs = require('fs');
let lines = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);
let testLines = fs.readFileSync('./test_input.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

let instructions = new Map();

lines.forEach((line,idx) => {
  [instruction, argument] = line.split(" ");
  instructions.set(idx, {instruction, argument: Number(argument), executed: false})
})

// isEdited is needed to know NOT to change any of the values of jmp or nop when doing a "test" iteration
// after having flipped a value
function runProgram(instructions, isEdited) {
  let accumulator = 0;
  let i = 0;
  let finished = false;

  while (!finished) {
    // if we get all the way to the end of the map, we know our flip worked properly
    if (i === instructions.size - 1) { 
      let {instruction} = instructions.get(i);
      if (instruction === "acc") {
        accumulator += instructions.get(i).argument;   
      }
      return {status:true, newAcc: accumulator};
    }

    let {instruction, argument, executed} = instructions.get(i);
    // if this instruction has been executed, we know the 'flip' did not work
    if (executed) {
      return false;
    }
  
    if (instruction === "acc") {
      accumulator += argument;
      instructions.set(i, {instruction, argument, executed: true})
      i++;
    } else if (instruction === "jmp") {
      instructions.set(i, {instruction, argument, executed: true});

      if (!isEdited) {
        // this creates a new map, with 'executed' values set back to false
        // in order to test the new map with the flipped instructions
        let newInstructions = new Map(instructions);
        newInstructions.forEach(instruction => {
            instruction.executed = false;
        })
        // flip the instruction
        newInstructions.set(i, {instruction: "nop", argument, executed: false})
        // test the result of running runProgram on the new instruction
        // if it returns true then return the new accumulator
        let {status, newAcc} = runProgram(newInstructions, true)
        if (status) {
          return newAcc;
        } else {
          i = i + argument;
        }
      } else {
        i = i + argument;
      }
    } else {
      instructions.set(i, {instruction, argument, executed: true})
      
      if (!isEdited) {
        // this creates a new map, with 'executed' values set back to false
        // in order to test the new map with the flipped instructions
        let newInstructions = new Map(instructions);
        newInstructions.forEach(instruction => {
            instruction.executed = false;
        })
        // flip the instruction
        newInstructions.set(i, {instruction: "jmp", argument, executed: false});

        // test the result of running runProgram on the new instruction
        // if it returns true then return the new accumulator
        let {status, newAcc} = runProgram(newInstructions, true)
        if (status) {
          return newAcc;
        } else {
          i += 1;
        }
      } else {
        i += 1;
      } 
    }
  }
}

console.log(runProgram(instructions));