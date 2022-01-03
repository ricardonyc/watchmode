// You shall use the TMDB logo to identify your use of the TMDB APIs.

// // require("dotenv").config()
// // const key = process.env.API_KEY;
// // console.log(key);

// // make multiple buttons
// // - sources
// // - region
// // etc

// // to do
// // - let user search for a title, actor, genre, or streaming platform
// // - let user check which streaming platform they can find that certain thing

// document.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     console.log("Enter key was pressed.");
//   }
// });

// // function getRandomElements(array, amount) {
// //   let newArr = [];
// //   for (let i = 0; i < amount; i++) {
// //     let randomIndex = Math.floor(Math.random() * array.length);
// //     newArr.push(array[randomIndex]);
// //   }
// //   return newArr;
// // }

// each box is a container
// each of these containers is set to display FLEX and flex direction COLUMN
// set max-width for container
// the function takes in the title and picture properties
/////////////////////////////////////////////////////////////////////////////////
// create DIV with class of "container-box"
// create IMG tag
// create another DIV with class of "text-container"
// append an IMG to "container-box" and set the ALT text to description?
// append an h2 and p tag to "text-container"
// append "text-container" to "container-box" AFTER appending IMG tag

const moviesContainer = document.getElementById("movies-container");

const top250 = document.getElementById("top250");

// top250.addEventListener("click", () => {
//   fetch(`https://imdb-api.com/en/API/Top250Movies/API_KEY_HERE`)
//     .then((res) => res.json())
//     .then((data) => {
//       data.items.forEach((obj) => {
//         const movieBox = document.createElement("div");
//         movieBox.classList.add("container-box");
//         const img = document.createElement("img");
//         let title = document.createTextNode(`${obj.rank}. ${obj.title}`);
//         let year = document.createTextNode(obj.year);
//         img.src = obj.image;

//         const textContainer = document.createElement("div");
//         textContainer.classList.add("text-container");
//         movieBox.appendChild(img);
//         const h2 = document.createElement("h2");
//         const p = document.createElement("p");
//         h2.appendChild(title);
//         p.appendChild(year);
//         textContainer.appendChild(h2);
//         textContainer.appendChild(p);

//         movieBox.appendChild(textContainer);
//         moviesContainer.appendChild(movieBox);
//         const cast = document.createTextNode(obj.crew);
//         const p2 = document.createElement("p");
//         p2.appendChild(cast);
//         textContainer.appendChild(p2);

//         let title_id = obj.id;
//       });
//     })
//     .catch((err) => console.log(err));
// });

function poster(posterPath) {
  `https://image.tmdb.org/t/p/original${obj.poster_path}`;
}

function searchMovie() {
  moviesContainer.innerText = "";
  const searchInput = document.getElementById("input").value;
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=83bc98823c4c710c5443011ef8e9dbf9&language=en-US&page=1&include_adult=false&query=${searchInput}`
  )
    .then((res) => res.json())
    .then((data) => {
      // sort by amount of votes
      data.results.sort((a, b) => a.vote_count - b.vote_count).reverse();

      data.results.forEach((obj) => {
        const movieBox = document.createElement("div");
        movieBox.classList.add("container-box");
        const textContainer = document.createElement("div");
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        textContainer.classList.add("text-container");
        let title = document.createTextNode(obj.title);
        let overview = document.createTextNode(obj.overview);
        img.src = `https://image.tmdb.org/t/p/original${obj.poster_path}`;

        h2.appendChild(title);
        p.appendChild(overview);
        movieBox.appendChild(img);
        textContainer.appendChild(h2);
        textContainer.appendChild(p);
        movieBox.appendChild(textContainer);
        moviesContainer.appendChild(movieBox);
      });
    })
    .catch((err) => console.log(err));
}

const random = document.getElementById("random");
const searchBtn = document.getElementById("btn");
const userInput = document.getElementById("input");

searchBtn.addEventListener("click", () => {
  searchMovie();
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchMovie();
  }
});

const trendingMovies = document.getElementById("trending-movies");
// trendingMovies.addEventListener("click", () => {
//   fetch(
//     `https://api.themoviedb.org/3/trending/movie/day?api_key=83bc98823c4c710c5443011ef8e9dbf9`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       searchTrending();
//     });
// });

function searchTrending() {
  // fetch(
  //   `https://api.themoviedb.org/3/trending/movie/day?api_key=83bc98823c4c710c5443011ef8e9dbf9`
  // )
  //   .then((res) => res.json())
  //   .then((data) => {
  //     // console.log(data.results.length);
  //     data.results.forEach((obj, index) => {
  //       // console.log(obj);
  //       const movieBox = document.createElement("div");
  //       movieBox.classList.add("container-box");
  //       const textContainer = document.createElement("div");
  //       const img = document.createElement("img");
  //       const h2 = document.createElement("h2");
  //       const p = document.createElement("p");
  //       textContainer.classList.add("text-container");
  //       let title = document.createTextNode(`${index + 1}. ${obj.title}`);
  //       let overview = document.createTextNode(obj.overview);
  //       img.src = `https://image.tmdb.org/t/p/original${obj.poster_path}`;
  //       h2.appendChild(title);
  //       p.appendChild(overview);
  //       movieBox.appendChild(img);
  //       textContainer.appendChild(h2);
  //       textContainer.appendChild(p);
  //       movieBox.appendChild(textContainer);
  //       moviesContainer.appendChild(movieBox);
  //     });
  //   });
}

const urls = [
  `https://api.themoviedb.org/3/trending/movie/day?api_key=83bc98823c4c710c5443011ef8e9dbf9`,
  `https://api.themoviedb.org/3/genre/movie/list?api_key=83bc98823c4c710c5443011ef8e9dbf9`,
];

trendingMovies.addEventListener("click", fetchPromises);

function fetchPromises() {
  Promise.all(urls).then((results) => {
    results.forEach((result) => {
      fetch(result)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.genres);

          // const genres = data.genres.map((x) => {
          //   return { id: x.id, name: x.name };
          // });
          // console.log(genres)

          data.results.forEach((movieObj, index) => {
            // searchTrending();
            // console.log(movieObj);
            // console.log(index)

            const genres = data.genres.map(x => x);
            console.log(genres)

            // console.log(obj);
            // const movieBox = document.createElement("div");
            // movieBox.classList.add("container-box");
            // const textContainer = document.createElement("div");
            // const img = document.createElement("img");
            // const h2 = document.createElement("h2");
            // const p = document.createElement("p");
            // textContainer.classList.add("text-container");
            // let title = document.createTextNode(`${index + 1}. ${movieObj.title}`);
            // let overview = document.createTextNode(movieObj.overview);
            // img.src = `https://image.tmdb.org/t/p/original${movieObj.poster_path}`;
            // h2.appendChild(title);
            // p.appendChild(overview);
            // movieBox.appendChild(img);
            // textContainer.appendChild(h2);
            // textContainer.appendChild(p);
            // movieBox.appendChild(textContainer);
            // moviesContainer.appendChild(movieBox);
          });
        });
    });
  });
}
