(async () => {
    // This is the entry point for your application. Write all of your code here.
    // Before you can use the database, you need to configure the "db" object 
    // with your team name in the "js/movies-api.js" file.
    
    getMovies().then(movies =>  {
        let moviez = document.querySelector("#movie");
        console.log(movies)
        let html = "";
        for(let i = 0; i < movies.length; i++) {
            html += ` <div>
                        <h1>${movies[i].title}</h1>
                        <div>${movies[i].actors} Actors</div>
                        <div>${movies[i].director} Director</div>
                        <div>${movies[i].rating} Rating</div>
                        <div>${movies[i].runtime} Runtime</div>
                        <div>${movies[i].year} Year</div>
                        
                        
                    </div>`
        }
        moviez.innerHTML = html;
    })
})();