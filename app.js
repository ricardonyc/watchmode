// containers
const headingContainer = document.getElementById("heading-text");
const moviesContainer = document.getElementById("movies-container");
const actorsContainer = document.getElementById("actors-container");
const loader = document.querySelector(".triple-spinner");

function displayLoading() {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}

function hideLoading() {
  loader.classList.remove("display");
}

// const closeModule = document.getElementById("close-module");
// const overlay = document.getElementById("overlay");
// const openModule = document.getElementById("open");

// openModule.addEventListener("click", () => {
//   overlay.classList.remove("hidden");
// });

// closeModule.addEventListener("click", () => {
//   overlay.classList.add("hidden");
// });

// You shall use the TMDB logo to identify your use of the TMDB APIs.

// // require("dotenv").config()
// // const key = process.env.API_KEY;
// // console.log(key);

// // function getRandomElements(array, amount) {
// //   let newArr = [];
// //   for (let i = 0; i < amount; i++) {
// //     let randomIndex = Math.floor(Math.random() * array.length);
// //     newArr.push(array[randomIndex]);
// //   }
// //   return newArr;
// // }

function headingText(text, ...iconClasses) {
  const classes = iconClasses;
  const trendingIcon = document.createElement("i");
  for (let i = 0; i < classes.length; i++) {
    trendingIcon.classList.add(classes[i]);
  }
  const topText = document.createTextNode(text);
  const topH2 = document.createElement("h2");
  topH2.appendChild(topText);
  headingContainer.appendChild(trendingIcon);
  headingContainer.appendChild(topH2);
}

const top250 = document.getElementById("top250");

// top250.addEventListener("click", () => {
// });

function poster(posterPath) {
  `https://image.tmdb.org/t/p/original${obj.poster_path}`;
}

function searchMovie() {
  displayLoading();
  moviesContainer.innerText = "";
  const searchInput = document.getElementById("input").value;
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=83bc98823c4c710c5443011ef8e9dbf9&language=en-US&page=1&include_adult=false&query=${searchInput}`
  )
    .then((res) => res.json())
    .then((data) => {
      hideLoading();
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

const searchBtn = document.getElementById("btn");
const userInput = document.getElementById("input");

// searchBtn.addEventListener("click", () => {
//   searchMovie();
// });

// userInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     searchMovie();
//   }
// });

const trendingMovies = document.getElementById("trending-movies");
trendingMovies.addEventListener("click", () => {
  displayLoading();

  // fetch(
  //   `https://api.themoviedb.org/3/trending/movie/day?api_key=83bc98823c4c710c5443011ef8e9dbf9`
  // )
  //   .then((res) => res.json())
  //   .then((data) => {
  //     hideLoading();
  searchTrendingMovies();
  //   });
});

function searchTrendingMovies(url) {
  headingContainer.innerText = "";
  moviesContainer.innerText = "";
  trendingTv.style.backgroundColor = "";
  trendingTv.style.color = "";
  trendingPeople.style.backgroundColor = "";
  trendingPeople.style.color = "";
  trendingMovies.style.backgroundColor = "#a8d0e6";
  trendingMovies.style.color = "black";
  headingText("Top 20 Trending Movies", "fa", "fa-arrow-circle-up");

  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=83bc98823c4c710c5443011ef8e9dbf9`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.results.length);
      data.results.forEach((obj, index) => {
        console.log(obj);
        const movieBox = document.createElement("div");
        movieBox.classList.add("container-box");
        const textContainer = document.createElement("div");
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        textContainer.classList.add("text-container");
        // media title
        let title = document.createTextNode(`#${index + 1} ${obj.title}`);
        // media overview
        let overview = document.createTextNode(obj.overview);
        // poster image
        img.src = `https://image.tmdb.org/t/p/original${obj.poster_path}`;

        // media type
        const mediaType = document.createTextNode("Movie");
        const h4mediaType = document.createElement("h4");
        h4mediaType.appendChild(mediaType);
        // vote average
        const h4 = document.createElement("h4");
        const rating = document.createTextNode(
          `TMDB Rating: 10/${obj.vote_average}`
        );
        h4.appendChild(rating);
        if (obj.vote_count > 500 && obj.vote_average >= 7.5) {
          const checkMark = document.createElement("i");
          checkMark.classList.add("fa");
          checkMark.classList.add("fa-check-circle");
          h4.appendChild(checkMark)
        }

        const h4releaseTag = document.createElement("h4");
        const h4releaseDate = document.createTextNode(
          `Release date: ${obj.release_date}`
        );
        h4releaseTag.appendChild(h4releaseDate);

        h2.appendChild(title);
        p.appendChild(overview);
        movieBox.appendChild(img);
        textContainer.appendChild(h2);
        textContainer.appendChild(p);
        textContainer.appendChild(h4);
        textContainer.appendChild(h4releaseTag);
        textContainer.appendChild(h4mediaType);
        movieBox.appendChild(textContainer);
        moviesContainer.appendChild(movieBox);
      });
    });
}

const trendingTv = document.getElementById("trending-tv");
trendingTv.addEventListener("click", () => {
  // searchTrendingMovies()
  headingContainer.innerText = "";
  moviesContainer.innerText = "";
  trendingPeople.style.backgroundColor = "";
  trendingPeople.style.color = "";
  trendingMovies.style.backgroundColor = "";
  trendingMovies.style.color = "";
  trendingTv.style.backgroundColor = "#a8d0e6";
  trendingTv.style.color = "black";
  headingText("Top 20 Trending TV Shows", "fa", "fa-arrow-circle-up");

  fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=83bc98823c4c710c5443011ef8e9dbf9&language=en-US&page=1`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.results.length);
      data.results.forEach((obj, index) => {
        console.log(obj);
        const movieBox = document.createElement("div");
        movieBox.classList.add("container-box");
        const textContainer = document.createElement("div");
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        textContainer.classList.add("text-container");
        // media title
        let title = document.createTextNode(`#${index + 1} ${obj.name}`);
        // media overview
        let overview = document.createTextNode(obj.overview);
        // poster image
        img.src = `https://image.tmdb.org/t/p/original${obj.poster_path}`;

        // media type
        const mediaType = document.createTextNode("TV Show");
        const h4mediaType = document.createElement("h4");
        h4mediaType.appendChild(mediaType);
        // vote average
        const h4 = document.createElement("h4");
        const rating = document.createTextNode(
          `TMDB Rating: 10/${obj.vote_average}`
        );
        h4.appendChild(rating);
        if (obj.vote_count > 500 && obj.vote_average >= 7.5) {
          const checkMark = document.createElement("i");
          checkMark.classList.add("fa");
          checkMark.classList.add("fa-check-circle");
          h4.appendChild(checkMark)
        }

        const h4releaseTag = document.createElement("h4");
        const h4releaseDate = document.createTextNode(
          `Release date: ${obj.first_air_date}`
        );
        h4releaseTag.appendChild(h4releaseDate);

        h2.appendChild(title);
        p.appendChild(overview);
        movieBox.appendChild(img);
        textContainer.appendChild(h2);
        textContainer.appendChild(p);
        textContainer.appendChild(h4);
        textContainer.appendChild(h4releaseTag);
        textContainer.appendChild(h4mediaType);
        movieBox.appendChild(textContainer);
        moviesContainer.appendChild(movieBox);
      });
    });
});

const urls = [
  `https://api.themoviedb.org/3/trending/movie/day?api_key=83bc98823c4c710c5443011ef8e9dbf9`,
  `https://api.themoviedb.org/3/genre/movie/list?api_key=83bc98823c4c710c5443011ef8e9dbf9`,
];

// document.getElementById("random").addEventListener("click", fetchPromises);

// function fetchPromises() {
//   Promise.all(urls).then((results) => {
//     results.forEach((result) => {
//       fetch(result)
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data)
//           // console.log(data.genres);

//         });
//     });
//   });
// }

const trendingPeople = document.getElementById("trending-people");
trendingPeople.addEventListener("click", () => {
  displayLoading();
  // remove everything currently in the movies container
  headingContainer.innerText = "";
  moviesContainer.innerText = "";
  // remove and add color to currently selected button
  trendingTv.style.backgroundColor = "";
  trendingTv.style.color = "";
  trendingMovies.style.backgroundColor = "";
  trendingMovies.style.color = "";
  trendingPeople.style.backgroundColor = "#a8d0e6";
  trendingPeople.style.color = "black";
  // heading title
  headingText("Top 20 Trending People", "fa", "fa-arrow-circle-up");

  fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=83bc98823c4c710c5443011ef8e9dbf9`
  )
    .then((res) => res.json())
    .then((data) => {
      hideLoading();
      // overlay blurred background
      const overlayBackground = document.createElement("div");
      overlayBackground.classList.add("overlay-background");
      overlayBackground.classList.add("hidden");
      document.getElementById("overlay-blur").appendChild(overlayBackground);

      data.results.forEach((obj, index) => {
        console.log(obj);

        const movieBox = document.createElement("div");
        movieBox.classList.add("actor-box");
        const textContainer = document.createElement("div");
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        textContainer.classList.add("actor-text-container");
        let name = document.createTextNode(`#${index + 1} ${obj.name}`);
        // let overview = document.createTextNode(obj.overview);
        img.src = `https://image.tmdb.org/t/p/original${obj.profile_path}`;

        const a = document.createElement("a");
        const btnText = document.createTextNode("Known for");
        const button = document.createElement("button");
        button.style.width = "100%";
        button.style.padding = ".4rem .4rem";
        button.style.margin = ".3rem 0 0 0";
        button.style.fontSize = ".9rem";
        button.style.fontWeight = "500";
        button.style.backgroundColor = "#374785";
        button.style.color = "white";
        button.style.cursor = "pointer";
        button.appendChild(btnText);

        // overlay
        const overlay = document.createElement("div");
        document.getElementById("inner-container").appendChild(overlay);
        overlay.setAttribute("id", "overlay");
        overlay.setAttribute("class", "hidden");
        overlay.classList.add("overlay");
        // overlay background event listener to close
        overlayBackground.addEventListener("click", () => {
          overlayBackground.classList.add("hidden");
          overlay.classList.add("hidden");
        });

        // overlay closing button
        const icon = document.createElement("i");
        icon.classList.add("fa");
        icon.classList.add("fa-times");
        // overlay event listener to close
        icon.addEventListener("click", () => {
          overlay.classList.add("hidden");
          overlayBackground.classList.add("hidden");
        });

        obj.known_for.forEach((movie, index) => {
          // console.log(movie);

          if (movie.title || movie.original_name) {
            const h2 = document.createElement("h2");
            const movieName = document.createTextNode(
              movie.title || movie.original_name
            );
            h2.appendChild(movieName);
            overlay.appendChild(h2);
            const movieBox = document.createElement("div");
            movieBox.classList.add("container-box");
            const textContainer = document.createElement("div");
            const img = document.createElement("img");
            const h3 = document.createElement("h2");
            const p = document.createElement("p");
            textContainer.classList.add("text-container");
            let title = document.createTextNode(`#${index + 1} ${movie.title}`);
            let overview = document.createTextNode(movie.overview);
            img.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
            const h4voteAverage = document.createElement("h4");
            const voteAverageText = document.createTextNode(
              `TMDB Rating: 10/${movie.vote_average}`
            );
            h4voteAverage.appendChild(voteAverageText);
            const h4releaseDate = document.createElement("h4");
            const releaseDateText = document.createTextNode(
              `Release date: ${movie.release_date}`
            );
            h4releaseDate.appendChild(releaseDateText);
            const h4mediaType = document.createElement("h4");
            const mediaTypeText = document.createTextNode(
              obj.media_type === "tv" ? "TV Show" : "Movie"
            );
            h4mediaType.appendChild(mediaTypeText);

            h3.appendChild(title);
            p.appendChild(overview);
            movieBox.appendChild(img);
            textContainer.appendChild(h2);
            textContainer.appendChild(p);
            textContainer.appendChild(h4voteAverage);
            textContainer.appendChild(h4releaseDate);
            textContainer.appendChild(h4mediaType);
            movieBox.appendChild(textContainer);
            overlay.appendChild(icon);
            overlay.appendChild(movieBox);
          }
        });

        button.addEventListener("click", () => {
          overlay.classList.remove("hidden");
          overlayBackground.classList.remove("hidden");
        });

        h2.appendChild(name);
        // p.appendChild(overview);
        movieBox.appendChild(img);
        textContainer.appendChild(h2);
        textContainer.appendChild(p);
        textContainer.appendChild(button);
        movieBox.appendChild(textContainer);
        moviesContainer.appendChild(movieBox);
      });
      // https://image.tmdb.org/t/p/original/${profile_path}
    });
});

const searchIcon = document.getElementById("search-icon");
const searchBar = document.getElementById("search");
// erases text in navigation search bar when clicked
searchBar.addEventListener("click", () => {
  searchBar.value = "";
});

searchIcon.addEventListener("click", () => {
  searching();
});

searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searching();
  }
});

function searching() {
  trendingMovies.style.backgroundColor = "";
  trendingMovies.style.color = "";
  trendingPeople.style.backgroundColor = "";
  trendingPeople.style.color = "";
  headingContainer.innerText = "";
  moviesContainer.innerText = "";
  const searchBar = document.getElementById("search").value;

  fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=83bc98823c4c710c5443011ef8e9dbf9&language=en-US&page=1&query=${searchBar}`
  )
    .then((res) => res.json())
    .then((data) => {
      data.results.sort((a, b) => a.vote_count - b.vote_count).reverse();
      const personContainer = document.createElement("div");

      const peopleIcon = document.createElement("i");
      peopleIcon.classList.add("fa");
      peopleIcon.classList.add("fa-film");
      const topText = document.createTextNode("Movies & TV Shows: ");
      const topH2 = document.createElement("h2");
      topH2.appendChild(topText);
      headingContainer.appendChild(peopleIcon);
      headingContainer.appendChild(topH2);
      // personContainer.classList.add("person-container");

      // const peopleIcon = document.createElement("i");
      // peopleIcon.classList.add("fa");
      // peopleIcon.classList.add("fa-users");
      // const topText = document.createTextNode("People:");
      // const topH2 = document.createElement("h2");
      // topH2.appendChild(topText);
      // headingContainer.appendChild(peopleIcon);
      // headingContainer.appendChild(topH2);
      // personContainer.appendChild(headingContainer);
      data.results.forEach((obj, index) => {
        // console.log(obj);
        if (obj.media_type === "person") {
          // console.log(obj);
          console.log("person found");
        } else if (obj.media_type === "tv" || obj.media_type === "movie") {
          console.log(obj);
          // console.log("Movie or TV show found!");

          // sorts movies based on vote count (popularity)
          // console.log(data.results.sort((a, b) => a.vote_count - b.vote_count).reverse());

          const movieBox = document.createElement("div");
          movieBox.classList.add("container-box");
          const textContainer = document.createElement("div");
          const img = document.createElement("img");
          const h2 = document.createElement("h2");
          const p = document.createElement("p");
          textContainer.classList.add("text-container");
          let title = document.createTextNode(obj.title || obj.name);
          const overview = obj.overview
            ? document.createTextNode(obj.overview)
            : document.createTextNode("Description not available");
          // let overview = document.createTextNode(obj.overview);
          if (obj.poster_path === null) {
            img.alt = "No image available";
            img.classList.add("img-error");
          } else if (obj.poster_path) {
            img.src = `https://image.tmdb.org/t/p/original${obj.poster_path}`;
          }
          const h3 = document.createElement("h3");
          const mediaType = document.createTextNode(
            obj.media_type === "tv" ? "TV Show" : "Movie"
          );

          h2.appendChild(title);
          p.appendChild(overview);
          h3.appendChild(mediaType);
          movieBox.appendChild(img);
          textContainer.appendChild(h2);
          textContainer.appendChild(p);
          textContainer.appendChild(h3);
          movieBox.appendChild(textContainer);
          moviesContainer.appendChild(movieBox);
        }
      });
    });

  // headingText(`Results ${resultsCount}:`, "fa", "fa-check-square");
}

// searchBar.addEventListener("keydown", (e) => {
//   if(e.key === 'Enter'){
//     searchMovie();
//   }
// })

// moviesContainer.innerText = "";
// const searchInput = document.getElementById("input").value;

// https://api.themoviedb.org/3/search/multi?api_key=83bc98823c4c710c5443011ef8e9dbf9&language=en-US&page=1&query=${searchInput}
// console.log(data)
// sort by amount of votes
// data.results.sort((a, b) => a.vote_count - b.vote_count).reverse();

// data.results.forEach((obj) => {
//   const movieBox = document.createElement("div");
//   movieBox.classList.add("container-box");
//   const textContainer = document.createElement("div");
//   const img = document.createElement("img");
//   const h2 = document.createElement("h2");
//   const p = document.createElement("p");
//   textContainer.classList.add("text-container");
//   let title = document.createTextNode(obj.title);
//   let overview = document.createTextNode(obj.overview);
//   img.src = `https://image.tmdb.org/t/p/original${obj.poster_path}`;

//   h2.appendChild(title);
//   p.appendChild(overview);
//   movieBox.appendChild(img);
//   textContainer.appendChild(h2);
//   textContainer.appendChild(p);
//   movieBox.appendChild(textContainer);
//   moviesContainer.appendChild(movieBox);
