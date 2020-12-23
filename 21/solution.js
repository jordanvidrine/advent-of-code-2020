// Couldnt solve for main input... only for test :(

const fs = require('fs');
let lines = fs.readFileSync('./input2.txt', {encoding: 'utf8'}).split("\n").filter(x => x);

let allIngredients = [];

let allergenIngredients = {}

lines.forEach((line,idx) => {
  let ingredients = line.split(" (")[0].split(" ");
  let allergens = line.split(" (")[1].replace("contains","").split(",").map(x => x.replace(")","").trim())

  allergens.forEach(allergen => {
    if (allergen in allergenIngredients) {
      allergenIngredients[allergen] = [...allergenIngredients[allergen],...ingredients]
    } else {
      allergenIngredients[allergen] = [...ingredients]
    }
  })

  ingredients.forEach(ingredient => {
    if (!allIngredients.includes(ingredient)) {
      allIngredients.push(ingredient)
    }
  })
})

// to delete from
let ingredientsList = [...allIngredients];

for (let allergen in allergenIngredients) {
  ingredientsList.forEach(ingredient => {
    let allergenList = allergenIngredients[allergen];
    // if its in there more than once...
    if (allergenList.indexOf(ingredient) !== allergenList.lastIndexOf(ingredient)) {
      //remove from ingredients list
      ingredientsList = ingredientsList.filter(x => x !== ingredient);
      allergenIngredients[allergen] = allergenIngredients[allergen].filter(x => x !== ingredient);
      // remove wherever it exists in allergen lists
      // for (let innerAllergen in allergenIngredients) {
      //   if (allergen !== innerAllergen) {
      //     allergenIngredients[innerAllergen] = allergenIngredients[innerAllergen].filter(x => x !== ingredient)
      //     if (allergenIngredients[innerAllergen].length === 1) {
      //       ingredientsList = ingredientsList.filter(x => x !== allergenIngredients[innerAllergen][0])
      //     }
      //   }
      // }
    }
  })
}

console.log(allergenIngredients);

let count = 0;

lines.forEach(line => {
  let ingredients = line.split(" (")[0].split(" ");
  ingredients.forEach(ingredient => {
    if (ingredientsList.includes(ingredient)) {
      count++
    }
  })
})

console.log(count);