// require("dotenv").config()
const key = env.API_KEY;
// make multiple buttons
// - sources
// - region
// etc
console.log(key);

// to do
// - let user search for a title, actor, genre, or streaming platform
// - let user check which streaming platform they can find that certain thing

const urls = [`https://api.watchmode.com/v1/sources/?apiKey=YOUR_API_KEY`];

// fetch(`https://api.watchmode.com/v1/sources/?apiKey=${key}`)
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

function getRandomElements(array, amount) {
  let newArr = [];
  for (let i = 0; i < amount; i++) {
    let randomIndex = Math.floor(Math.random() * array.length);
    newArr.push(array[randomIndex]);
  }
  return newArr;
}
