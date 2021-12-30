const buttons = document.querySelectorAll(".btn");

// make multiple buttons
// - sources
// - region
// etc

// to do
// - let user search for a title, actor, genre, or streaming platform
// - let user check which streaming platform they can find that certain thing

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selection = btn.textContent.toLowerCase();
    fetch(
      `https://api.watchmode.com/v1/${selection}/?apiKey=0aHRIWGVT4LqTnHJMgbGJjmcdu647EyF1Mwe3KQK`
    )
      .then((res) => res.json())
      .then((data) => {
        const regions = document.getElementById("region-output");
        const sources = document.getElementById("sources-output");
        const networks = document.getElementById("network-output");
        // console.log(data);
        if (selection === "regions") {
          // regions.innerText = data[0].country;
        } else if (selection === "sources") {
          // sources.innerText = data[0][0].name;
        } else if (selection === "networks") {
          // networks.innerText = data.name
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// try getting 10 titles that are similar
// the property of
const search = document.getElementById("search");
const errorMsg = document.getElementById("error");
errorMsg.style.display = "none";
search.addEventListener("click", () => {
  const userInput = document.getElementById("input").value;
  // userInput = userInput.toLowerCase();
  fetch(
    `https://api.watchmode.com/v1/search/?apiKey=0aHRIWGVT4LqTnHJMgbGJjmcdu647EyF1Mwe3KQK&search_field=name&search_value=${userInput}`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.title_results[0].id)
      const titleId = data.title_results[0].id;
      fetch(
        `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=0aHRIWGVT4LqTnHJMgbGJjmcdu647EyF1Mwe3KQK`
      )
        .then((res) => res.json())
        .then((data2) => {
          console.log(data2);
          document.getElementById("error").style.display = "none";
          const searchContainer = document.getElementById("search-container");
          const h2 = document.createElement("p");
          const p = document.createElement("p")
          searchContainer.innerText = "";
          const text = document.createTextNode(
            `${data2.original_title} (${data2.year})`
          );
          const plotOverview = document.createTextNode(data2.plot_overview)
          // const plot = document.createTextNode(data2.)
          // const plot = document.createTextNode(data.)
          h2.appendChild(text);
          p.appendChild(plotOverview)
          searchContainer.appendChild(h2);
          searchContainer.appendChild(p)
        });

      // document.getElementById("error").style.display = "none"
      // console.log(data.title_results[0].name)
      // const searchContainer = document.getElementById('search-container')
      // const p = document.createElement("p")
      // searchContainer.innerText = ''
      // const text = document.createTextNode(`${data.title_results[0].name} (${data.title_results[0].year})`)
      // // const plot = document.createTextNode(data.)
      // p.appendChild(text)
      // searchContainer.appendChild(p)
    })
    .catch((err) => {
      console.log("Error!");
      error.style.display = "block";
      error.style.color = "red";
    });
});

function getRandomElements(array, amount) {
  let newArr = [];
  for (let i = 0; i < amount; i++) {
    let randomIndex = Math.floor(Math.random() * array.length);
    newArr.push(array[randomIndex]);
  }
  return newArr;
}
