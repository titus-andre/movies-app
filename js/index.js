(async () => {
  // This is the entry point for your application. Write all of your code here.
  // Before you can use the database, you need to configure the "db" object
  // with your team name in the "js/movies-api.js" file.
  const movieIds = [];

  refresh();

  function refresh() {
    getMovies().then((movies) => {
      let moviez = document.querySelector("#movie");
      let html = "";
      for (let i = 0; i < movies.length; i++) {
        movieIds.push(movies[i].id);
        html += ` <div class="cards ">
                      <div class="movie-image"></div>
                      <div class="card-content">
                        <p class="rating"><span class="star">⭐️</span>${movies[i].rating}</p>
                        <p class="title">${movies[i].title}</p>
                      </div>
                      <div class="btn-options">
                        <button class="btn" id=""  type="button" data-id="${movies[i].id}">Options</button>
                      </div>
                      <div>
                      <button class="delete" type="button" data-id="${movies[i].id}">Delete Movie</button>
  
                      </div>
                    </div>`;
      }
      contentLoad.innerHTML = html;
    });
    console.log("on submit");
  }

  const btnOptions = document.querySelector(".btn-options");
  const contentLoad = document.querySelector(".content-load");
  const contentDetail = document.querySelector(".content-detail");
  const btnClose = document.querySelector("#btn-close");
  const main = document.querySelector("#main");
  const input = document.querySelector("#input");
  const btnSubmit = document.querySelector("#btn-submit");

  // Hides movie cards and show movie description card
  function hideCards() {
    contentLoad.classList.add("opacity");
    contentDetail.classList.remove("hidden");
  }

  // eventListener on dyanmically created button
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      // console.log("button clicked");
      hideCards();
    }
  });

  // eventListener on dyn. delete button
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      let dataId = e.target.getAttribute("data-id");
      // console.log("button clicked");
      // hideCards();
      deleteMovie(dataId);
    }
    refresh();
  });

  // gets movie id from options button click
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      let dataId = e.target.getAttribute("data-id");
      // console.log("button clicked");
      // hideCards();
      deleteMovie(dataId);
    }
  });

  // closes detail card
  btnClose.addEventListener("click", () => {
    contentLoad.classList.remove("opacity");
    contentDetail.classList.add("hidden");
  });

  const title = document.querySelector("#title");
  const year = document.querySelector("#year");
  const director = document.querySelector("#director");
  const rating = document.querySelector("#rating");
  const genre = document.querySelector("#genre");
  const actors = document.querySelector("#actors");
  const addMovieForm = document.querySelector(".add-movie-form");
  const addMoviebtn = document.querySelector(".add-btn");

  //Add movie Submit button
  let count = 0;
  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    let newMovie = {
      title: title.value,
      year: year.value,
      director: director.value,
      rating: rating.value,
      genre: genre.value,
      actors: actors.value,
    };
    addMovie(newMovie).then(function () {
      hideMovieForm();
      refresh();
    });
  });

  // fucntion shows form
  function showAddMovieForm() {
    contentLoad.classList.add("opacity");
    addMovieForm.classList.remove("hidden");

    // contentDetail.classList.add("hidden");
  }

  // fucntion hides form
  function hideMovieForm() {
    contentLoad.classList.remove("opacity");
    addMovieForm.classList.add("hidden");

    // contentDetail.classList.add("hidden");
  }
  // add movie button
  addMoviebtn.addEventListener("click", () => {
    showAddMovieForm();
  });

  //

  // let movieObject2 = {
  //   title: "this ids bullshit",
  //   year: 1994,
  //   director: "titus",
  //   rating: 9.3,
  //   runtime: 142,
  //   genre: "Drama",
  //   actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
  // };
})();
