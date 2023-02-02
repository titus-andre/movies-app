(async () => {
  // This is the entry point for your application. Write all of your code here.
  // Before you can use the database, you need to configure the "db" object
  // with your team name in the "js/movies-api.js" file.

  getMovies().then((movies) => {
    let moviez = document.querySelector("#movie");
    console.log(movies);
    let html = "";
    for (let i = 0; i < movies.length; i++) {
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
                      <button clas="btn-options" type="button">Options</button>
                    </div>
                  </div>`;
    }
    contentLoad.innerHTML = html;
    // addevent();
  });

  const btnOptions = document.querySelector(".btn-options");
  const contentLoad = document.querySelector(".content-load");
  const contentDetail = document.querySelector(".content-detail");
  const btnClose = document.querySelector(".btn-close");

  btnOptions.addEventListener("click", () => {
    contentLoad.classList.add("opacity");
    contentDetail.classList.remove("hidden");
  });

  btnClose.addEventListener("click", () => {
    contentLoad.classList.remove("opacity");
    contentDetail.classList.add("hidden");
  });

  //   function addevent() {
  //     btnOptions.addEventListener("click", () => {
  //       contentLoad.classList.add("opacity");
  //       contentDetail.classList.remove("hidden");
  //     });
  //   }
})();
