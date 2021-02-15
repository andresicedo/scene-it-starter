document.addEventListener('DOMContentLoaded', function () {
    let watchlistJSON = localStorage.getItem('watchlist');
	let watchlist = JSON.parse(watchlistJSON);
    const moviesContainer = document.querySelector(".movies-container");
    moviesContainer.innerHTML = renderMovies(watchlist);
});

function renderMovies(movieArray) {
	const movieHtmlArray = movieArray.map(function (currentMovie) {
		return `<div class="movies-container d-flex flex-wrap justify-content-between">
		<div class="movie">
            <div class="card mb-3 movieCard" style="max-width: 540px;">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img id="imageDisplay" src="${currentMovie.Poster}" class="card-img" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 id="card-title" class="card-title">${currentMovie.Title}</h5>
                    <p id="card-text" class="card-text">${currentMovie.imdbID}</p>
                    <p class="card-text release_date"><small class="updatedText">${currentMovie.Year}</small></p>
                    <button onclick="saveToWatchlist('${currentMovie.imdbID}')" id="searchButton" class="addButton" type="submit">Add</button>
                  </div>
                </div>
              </div>
            </div>
			</div>
          </div>`
	});
	return movieHtmlArray.join('');
}


