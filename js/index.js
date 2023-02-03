(async () => {
  // This is the entry point for your application. Write all of your code here.
  // Before you can use the database, you need to configure the "db" object
  // with your team name in the "js/movies-api.js" file.
  const movieIds = [];
  getMovies().then((movies) => {
    let moviez = document.querySelector("#movie");
    console.log(movies);
    let html = "";
    for (let i = 0; i < movies.length; i++) {
      movieIds.push(movies[i].id);
      html +=
        //   html += ` <div>
        //                     <h1>${movies[i].title}</h1>
        //                     <div>${movies[i].actors} Actors</div>
        //                     <div>${movies[i].director} Director</div>
        //                     <div>${movies[i].rating} Rating</div>
        //                     <div>${movies[i].runtime} Runtime</div>
        //                     <div>${movies[i].year} Year</div>

        //                 </div>`;

        ` <div class="cards ">
                    <div class="movie-image"></div>
                    <div class="card-content">
                      <p class="rating"><span class="star">⭐️</span>${movies[i].rating}</p>
                      <p class="title">${movies[i].title}</p>
                    </div>
                    <div class="btn-options">
                      <button class="btn" id="${movies[i].id}"  type="button" data="${movies[i].id}">Options</button>
                    </div>
                  </div>`;
    }
    contentLoad.innerHTML = html;
    // console.log(document.querySelectorAll("button").data);
    // document.body.addEventListener("click", function (event) {
    //   if (event.target.id.length >= 1) {
    //     console.log(movieIds);
    //     hideCards();
    //   } else if (event.target.id == "btn-close") {
    //     showCards();
    //   }
    // });
  });
  const btnOptions = document.querySelector(".btn-options");
  const contentLoad = document.querySelector(".content-load");
  const contentDetail = document.querySelector(".content-detail");
  const btnClose = document.querySelector("#btn-close");
  const main = document.querySelector("#main");

  // Shows movie cards
  //   function showCards() {
  //     contentLoad.classList.remove("opacity");
  //     contentDetail.classList.add("hidden");
  //   }

  // Hides movie cards and show movie description card
  function hideCards() {
    contentLoad.classList.add("opacity");
    contentDetail.classList.remove("hidden");
  }

  // eventListener on dyanmically created button
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      console.log("button clicked");
      hideCards();
    }
  });

  btnClose.addEventListener("click", () => {
    contentLoad.classList.remove("opacity");
    contentDetail.classList.add("hidden");
  });

  let movieObject = {
    title: 'Scream',
    year: 1994,
    director: 'Dre',
    rating: 9.3,
    runtime: 142,
    genre: 'Drama',
    actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
  }
// Call the function
//  console.log(deleteMovie(movieObject));

 addMovie(movieObject)


})();
