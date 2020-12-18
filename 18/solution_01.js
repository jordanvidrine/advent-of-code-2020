function add(str) {
  let prevNum = null;
  let operator = null;
  let nextNum = null;
  let value = null;
  
  str.split(" ").forEach(item => {
    if (prevNum === null && typeof Number(item) === 'number' && item !== "(" && item !== ")" && item !== " ") {
      prevNum = Number(item);
      value = prevNum;
    } else if (item === "*" || item == "+"){
      operator = item;
    } else {
      if (typeof Number(item) === 'number' && item !== "(" && item !== ")" && item !== " ")
      nextNum = Number(item);
      if (operator === "+") {
      value+=nextNum;
      } else {
        value*=nextNum;
      } 
    }
  }) 
  return `${value}`;
}

function evaluate(str) {
  let prevNum = null;
  let operator = null;
  let nextNum = null;
  let value = null;

  // remove brackets
  str = str.replace(/[\(\)]/g,"")

  let string = str;

  if (string.match(/\d* [+] \d*/)) {
   while (string.match(/\d* [+] \d*/)) {
    let matches = string.match(/\d* [+] \d*/);
    matches.forEach(match => {
      string = string.replace(match, add(match));
    })
    } 
  }

  string.split(" ").forEach(item => {
    if (prevNum === null && typeof Number(item) === 'number' && item !== "(" && item !== ")" && item !== " ") {
      prevNum = Number(item);
      value = prevNum;
    } else if (item === "*" || item == "+"){
      operator = item;
    } else {
      if (typeof Number(item) === 'number' && item !== "(" && item !== ")" && item !== " ")
      nextNum = Number(item);
      if (operator === "+") {
      value+=nextNum;
      } else {
        value*=nextNum;
      } 
    }
  }) 

  return `${value}`;
}

let sum = 0;

let eqs = {};

equations.forEach(equation => {
  eqs[equation] = equation;
  while (eqs[equation].match(/\(\d* [*+] \d*( [*+] \d*)*\)/g)) {
  let matches = eqs[equation].match(/\(\d* [*+] \d*( [*+] \d*)*\)/g);

    matches.forEach(match => {
      eqs[equation] = eqs[equation].replace(match, evaluate(match));
    })
  }
  sum += Number(evaluate(eqs[equation]));
})

console.log(sum)