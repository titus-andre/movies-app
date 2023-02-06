"use strict";

(async () => {
  // This is the entry point for your application. Write all of your code here.
  // Before you can use the database, you need to configure the "db" object
  // with your team name in the "js/movies-api.js" file.

  refresh();

  function htmlTemplate(movie) {
    return ` 
            <div class="cards ">
              <div class="movie-image">
                <img src="${movie.image}" alt="shawshank" />
              </div>
              <div class="card-content">
                <p class="rating"><span class="star">⭐️</span>  ${movie.rating}<span class="rating-max"> / 10</span></p>
                <p class="title">${movie.title}</p>
              </div>
              <div class="btn-container">
                <div class="btn-options">
                  <button class="btn" id=""  type="button" data-id="${movie.id}">Details</button>
                </div>
                <div>
                  <button class="update" type="button" data-id="${movie.id}">Update</button>
                </div>
                <div>
                  <button class="delete" type="button" data-id="${movie.id}">Delete</button>
                </div>
                
              </div>
            </div>
                `;
  }

  function refresh() {
    getMovies().then((movies) => {
      let html = "";
      for (let i = 0; i < movies.length; i++) {
        html += htmlTemplate(movies[i]);
      }
      contentLoad.innerHTML = html;
    });
  }

  const contentLoad = document.querySelector(".content-load");
  const contentDetail = document.querySelector(".content-detail");
  const main = document.querySelector("#main");
  const btnSubmit = document.querySelector("#btn-submit");
  const title = document.querySelector("#title");
  const year = document.querySelector("#year");
  const director = document.querySelector("#director");
  const rating = document.querySelector("#rating");
  const genre = document.querySelector("#genre");
  const actors = document.querySelector("#actors");
  const addMovieForm = document.querySelector(".add-movie-form");
  const addMoviebtn = document.querySelector(".add-btn");
  const updateMovieForm = document.querySelector(".update-movie-form");
  const btnUpdateSubmit = document.querySelector("#btn-submit-update");
  const runtime = document.querySelector("#run-time");

  // Search Bar ----------------------------|
  const searchInput = document.querySelector("#searchBar");
  const searchBtn = document.querySelector("#search-btn");
  const searchCanBtn = document.querySelector("#cancel-search");

  // Function to render results user input from search bar ----|
  function populate() {
    getMovies().then((movies) => {
      const movieSearch = searchInput.value.toLowerCase();
      console.log(movieSearch);
      let html = "";
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].title.toLowerCase().includes(movieSearch)) {
          html += htmlTemplate(movies[i]);
        }
      }
      contentLoad.innerHTML = html;
    });
  }

  // EventList. for Find btn (calls search bar function)
  searchBtn.addEventListener("click", populate);
  searchCanBtn.addEventListener("click", () => {
    searchInput.value = "";
  });

  // EventListener on dyanmically created button ---------------|
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      dataId = e.target.getAttribute("data-id");
      hideCards();
    }
  });

  // Hides movie cards and show movie details ---------------|
  function hideCards() {
    contentLoad.classList.add("opacity");
    contentDetail.classList.remove("hidden");

    getMovies().then((movies) => {
      let html = "";
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].id === dataId) {
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

  // EventListener on dyn. delete button ---------------|
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      let dataId = e.target.getAttribute("data-id");
      let response = prompt("Are you sure you want to delete");
      if (response === "yes") {
        deleteMovie(dataId);
        refresh();
      } else {
        refresh();
      }
    }
  });

  // Gets movie id from options button click -------------|
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      let dataId = e.target.getAttribute("data-id");
    }
  });

  // Closes detail card -----------------|
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-close")) {
      contentLoad.classList.remove("opacity");
      contentDetail.classList.add("hidden");
    }
  });

  // Add movie Submit button ---------------|
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

  // Fucntion displays Form ---------------|
  function showAddMovieForm() {
    contentLoad.classList.add("opacity");
    addMovieForm.classList.remove("hidden");
  }

  // Fucntion Hides form ---------------|
  function hideMovieForm() {
    contentLoad.classList.remove("opacity");
    addMovieForm.classList.add("hidden");
  }

  // Show Update Movie Form ---------------|
  function showUpdateForm() {
    contentLoad.classList.add("opacity");
    updateMovieForm.classList.remove("hidden");
  }

  // Button to add movies ---------------|
  addMoviebtn.addEventListener("click", () => {
    showAddMovieForm();
  });

  // EventListener that populates update form with movie details ----|
  let dataId;
  let updateObj = {};
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("update")) {
      dataId = e.target.getAttribute("data-id");

      getMovies()
        .then((movies) => {
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

  // Eventlistener on Submit button within Update Form ------------|
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

  //Cancel Button element variables ---------------|

  const cancelBtn1 = document.querySelector(".cancel-btn1");
  const cancelBtn2 = document.querySelector(".cancel-btn2");

  // EventList. for cancel btn that closes Update Form ---------------|
  cancelBtn2.addEventListener("click", () => {
    contentLoad.classList.remove("opacity");
    updateMovieForm.classList.add("hidden");
  });

  // EventList. for cancel btn that closes Add-Movie Form ------------|

  cancelBtn1.addEventListener("click", () => {
    contentLoad.classList.remove("opacity");
    addMovieForm.classList.add("hidden");
  });

  // Search Bar --------------------------|
  const searchMovies = document.querySelector("#search-form-btn");
  const searchForm = document.querySelector(".search-form");
  const submitFormBtn = document.querySelector("#submit-form-btn");
  const cancelFormBtn = document.querySelector("#cancel-form-btn");

  // EventList. for searchbar Find btn ----------------------|
  searchMovies.addEventListener("click", () => {
    contentLoad.classList.add("opacity");
    searchForm.classList.remove("hidden");
  });

  // EventList. for Submit Search Form btn ----------------------|
  submitFormBtn.addEventListener("click", () => {
    contentLoad.classList.remove("opacity");
    searchForm.classList.add("hidden");
  });

  // EventList. for Cancel Search Form btn ----------------------|

  cancelFormBtn.addEventListener("click", () => {
    contentLoad.classList.remove("opacity");
    searchForm.classList.add("hidden");
  });

  // Variables for Search Form elements ----------------------|
  const yearSearch = document.querySelector("#year-search");
  const directorSearch = document.querySelector("#director-search");
  const ratingSearch = document.querySelector("#rating-search");
  const genreSearch = document.querySelector("#genre-search");
  const actorsSearch = document.querySelector("#actors-search");
  const clearResultsBtn = document.querySelector("#clear-results-btn");

  // Function that populates results from user input within Search Form-
  function search() {
    getMovies().then((movies) => {
      const yearSearchValue = yearSearch.value.toLowerCase();
      const directorSearchValue = directorSearch.value.toLowerCase();
      const ratingSearchValue = ratingSearch.value.toLowerCase();
      const genreSearchValue = genreSearch.value.toLowerCase();
      const actorsSearchValue = actorsSearch.value.toLowerCase();

      let html = "";
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].actors.toLowerCase().includes(actorsSearchValue))
          if (movies[i].director.toLowerCase().includes(directorSearchValue))
            if (movies[i].rating >= ratingSearchValue)
              if (movies[i].year.includes(yearSearchValue))
                if (movies[i].genre.toLowerCase().includes(genreSearchValue)) {
                  html += htmlTemplate(movies[i]);
                }
      }
      contentLoad.innerHTML = html;
    });
  }

  // EventList. for Submit button within Search Form
  submitFormBtn.addEventListener("click", search);

  // Clears search results
  clearResultsBtn.addEventListener("click", () => {
    refresh();
  });
})();
