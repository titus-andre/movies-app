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
                      <div>
                      <button class="update" type="button" data-id="${movies[i].id}">Update</button>
  
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
  const title = document.querySelector("#title");
  const year = document.querySelector("#year");
  const director = document.querySelector("#director");
  const rating = document.querySelector("#rating");
  const genre = document.querySelector("#genre");
  const actors = document.querySelector("#actors");
  const addMovieForm = document.querySelector(".add-movie-form");
  const addMoviebtn = document.querySelector(".add-btn");
  const updateBtn = document.querySelector(".update-btn");
  const updateMovieForm = document.querySelector(".update-movie-form");
  const btnUpdateSubmit = document.querySelector("#btn-submit-update");

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
      deleteMovie(dataId);
    }
    refresh();
  });

  // gets movie id from options button click
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      let dataId = e.target.getAttribute("data-id");
    }
  });

  // closes detail card
  btnClose.addEventListener("click", () => {
    contentLoad.classList.remove("opacity");
    contentDetail.classList.add("hidden");
  });

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

  // show update movie form
  function showUpdateForm() {
    contentLoad.classList.add("opacity");
    updateMovieForm.classList.remove("hidden");
    // populateInput();
  }
  // add movie button
  addMoviebtn.addEventListener("click", () => {
    showAddMovieForm();
  });

  // popluate input fields
  // populateInput();

  let dataId;

  let updateObj = {};
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("update")) {
      dataId = e.target.getAttribute("data-id");

      getMovies()
        .then((movies) => {
          // let moviez = document.querySelector("#movie");
          let html = "";

          for (let i = 0; i < movies.length; i++) {
            if (movies[i].id === dataId) {
              updateObj = {
                title: (document.querySelector("#title-update").value =
                  movies[i].title),
                year: (document.querySelector("#title-update").value =
                  movies[i].title),
                director: (document.querySelector("#year-update").value =
                  movies[i].year),
                rating: (document.querySelector("#rating-update").value =
                  movies[i].rating),
                genre: (document.querySelector("#genre-update").value =
                  movies[i].genre),
                actors: (document.querySelector("#actors-update").value =
                  movies[i].actors),
              };
              document.querySelector("#title-update").value = movies[i].title;
              document.querySelector("#year-update").value = movies[i].year;
              document.querySelector("#director-update").value =
                movies[i].director;
              document.querySelector("#rating-update").value = movies[i].rating;
              document.querySelector("#genre-update").value = movies[i].genre;
              document.querySelector("#actors-update").value = movies[i].actors;
            }
          }
        })
        .then(function () {
          showUpdateForm();
        });
    }
  });

  ///////////
  btnUpdateSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    updateObj = {
      title: document.querySelector("#title-update").value,
      id: dataId,
      year: document.querySelector("#year-update").value,
      director: document.querySelector("#director-update").value,
      rating: document.querySelector("#rating-update").value,
      genre: document.querySelector("#genre-update").value,
      actors: document.querySelector("#actors-update").value,
    };

    updateMovie(updateObj)
      .then(function () {
        contentLoad.classList.remove("opacity");
        updateMovieForm.classList.add("hidden");
      })
      .then(function () {
        refresh();
      });
  });
})();
