(async () => {
  // This is the entry point for your application. Write all of your code here.
  // Before you can use the database, you need to configure the "db" object
  // with your team name in the "js/movies-api.js" file.

  // const movieIds = [];

  refresh();

  const localMoviesObj = {};

  function refresh() {
    getMovies().then((movies) => {
      console.log(movies);
      let html = "";
      for (let i = 0; i < movies.length; i++) {
        // movieIds.push(movies[i].id);
        html += ` 
              <div class="cards ">
                <div class="movie-image">
                  <img src="${movies[i].image}" alt="shawshank" />
                </div>
                <div class="card-content">
                  <p class="rating"><span class="star">⭐️</span>  ${movies[i].rating}<span class="rating-max"> / 10</span></p>
                  <p class="title">${movies[i].title}</p>
                </div>
                <div class="btn-container">
                  <div class="btn-options">
                    <button class="btn" id=""  type="button" data-id="${movies[i].id}">Details</button>
                  </div>
                  <div>
                    <button class="update" type="button" data-id="${movies[i].id}">Update</button>
                  </div>
                  <div>
                    <button class="delete" type="button" data-id="${movies[i].id}">Delete</button>
                  </div>
                  
                </div>
              </div>
                  `;
      }
      contentLoad.innerHTML = html;
    });
    console.log("on submit");
  }

  const btnOptions = document.querySelector(".btn-options");
  const contentLoad = document.querySelector(".content-load");
  const contentDetail = document.querySelector(".content-detail");
  const btnClose = document.querySelector(".btn-close");
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
  const imageAdd = document.querySelector("#image");
  const imageUpdate = document.querySelector("#image-update");
  const runtime = document.querySelector("#run-time");

  // eventListener on dyanmically created button
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      dataId = e.target.getAttribute("data-id");
      hideCards();
    }
  });

  // Hides movie cards and show movie details
  function hideCards() {
    contentLoad.classList.add("opacity");
    contentDetail.classList.remove("hidden");

    getMovies().then((movies) => {
      let html = "";
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].id === dataId) {
          // movieIds.push(movies[i].id);
          html += ` 
                  <div class="upper-card">
                      <div class="detail-image">
                      <img src="${movies[i].image}" />
                      </div>
                      <div class="detail-content">
                        <h4 class="detail-title">${movies[i].title}</h4>
                        <div class="stats">
                          <p class="date"><span class="colon" >Year:</span>  ${movies[i].year}</p>
                          <p class="run-time"><span class="colon" >Run-time:</span>  ${movies[i].runtime}</p>
                          <p class="category"><span class="colon" >Genre:</span>  ${movies[i].genre}</p>
                        </div>
                        <button class="btn-close" data-moveId="this-id"> x </button>
                      </div>
                    </div>
                    <div class="lower-card">
                    <p class="rating rating-detail"><span class="star">⭐️</span>  ${movies[i].rating}<span class="rating-max"> / 10</span></p>
                      <div class="director"><span class="colon" >Director:</span>  ${movies[i].director}</div>
                      
                      <div class="actor"><span class="colon" >Actors:</span>  ${movies[i].actors}</div>
                    
                    <p class="description"><span class="colon" >Synopsis:</span>  ${movies[i].description}</p>`;
        }
      }
      contentDetail.innerHTML = html;
    });
  }

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
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-close")) {
      contentLoad.classList.remove("opacity");
      contentDetail.classList.add("hidden");
    }
  });

  //Add movie Submit button
  let count = 0;
  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    let newMovie = {
      title: title.value,
      year: year.value,
      director: director.value,
      actors: actors.value,
      rating: rating.value,
      genre: genre.value,
      runtime: runtime.value,
      actors: actors.value,
      image: image.value,
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
  }

  // fucntion hides form
  function hideMovieForm() {
    contentLoad.classList.remove("opacity");
    addMovieForm.classList.add("hidden");
  }

  // show update movie form
  function showUpdateForm() {
    contentLoad.classList.add("opacity");
    updateMovieForm.classList.remove("hidden");
  }

  // add movie button
  addMoviebtn.addEventListener("click", () => {
    showAddMovieForm();
  });

  // EventListener to populate update form with movie info
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
                year: (document.querySelector("#year-update").value =
                  movies[i].year),
                director: (document.querySelector("#director-update").value =
                  movies[i].director),
                rating: (document.querySelector("#rating-update").value =
                  movies[i].rating),
                genre: (document.querySelector("#genre-update").value =
                  movies[i].genre),
                runtime: (document.querySelector("#run-time-update").value =
                  movies[i].runtime),
                actors: (document.querySelector("#actors-update").value =
                  movies[i].actors),
                image: (document.querySelector("#image-update").value =
                  movies[i].image),
                description: (document.querySelector(
                  "#description-update"
                ).value = movies[i].description),
              };
              document.querySelector("#title-update").value = movies[i].title;
              document.querySelector("#year-update").value = movies[i].year;
              document.querySelector("#director-update").value =
                movies[i].director;
              document.querySelector("#rating-update").value = movies[i].rating;
              document.querySelector("#genre-update").value = movies[i].genre;
              document.querySelector("#run-time-update").value =
                movies[i].runtime;
              document.querySelector("#actors-update").value = movies[i].actors;
              document.querySelector("#image-update").value = movies[i].image;
              document.querySelector("#description-update").value =
                movies[i].description;
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
      runtime: document.querySelector("#run-time-update").value,
      actors: document.querySelector("#actors-update").value,
      image: document.querySelector("#image-update").value,
      description: document.querySelector("#description-update").value,
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

  const cancelBtn1 = document.querySelector(".cancel-btn1");
  const cancelBtn2 = document.querySelector(".cancel-btn2");

  // closes Update Form
  cancelBtn2.addEventListener("click", () => {
    contentLoad.classList.remove("opacity");
    updateMovieForm.classList.add("hidden");
  });

  cancelBtn1.addEventListener("click", () => {
    contentLoad.classList.remove("opacity");
    addMovieForm.classList.add("hidden");
  });
})();
