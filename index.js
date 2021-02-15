document.addEventListener('DOMContentLoaded', function () {
	// code here will execute after the document is loaded
	const moviesContainer = document.querySelector(".movies-container");
	const searchForm = document.querySelector('#search-form');
	searchForm.addEventListener('submit', function (e) {
		e.preventDefault();



		let searchString = document.querySelector(".search-bar").value; 
		let urlEncodedSearchString = encodeURIComponent(searchString);
		axios.get(`http://www.omdbapi.com/?apikey=59354c85&s=${urlEncodedSearchString}`)
		.then(function(response) {
			console.log(response.data);
			var movieHTML = renderMovies(response.data.Search);
			moviesContainer.innerHTML = movieHTML;
			movieData = response.data.Search;
		});


	})
});

function renderMovies(movieArray) {
	const movieHtmlArray = movieArray.map(function (currentMovie) {
		return `
		<div class="movie w-50">
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
		</div>`
	});
	return movieHtmlArray.join('');
}

function saveToWatchlist(imdbID) {
	const movie = movieData.find((currentMovie) => currentMovie.imdbID == imdbID);
	let watchlistJSON = localStorage.getItem('watchlist');
	let watchlist = JSON.parse(watchlistJSON);
	//if the watchlist is null, set to an empty array
	if (watchlist === null) {
		watchlist = [];
	};
		//Push movie into the watchlist
		watchlist.push(movie);
		//Turn the watchlist back into JSON
		watchlistJSON = JSON.stringify(watchlist);
		//Save the JSONified watchlist back into local storage
		localStorage.setItem('watchlist', watchlistJSON);
}
