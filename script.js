
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const titles = document.getElementById('movie-title').value.split(',');
    fetchMultipleMovies(titles);
});



function fetchMultipleMovies(titles) {
    const apiKey = '7858892a'; 

    const promises = titles.map(title => {
        const trimmedTitle = title.trim();
        const url = `https://www.omdbapi.com/?t=${trimmedTitle}&apikey=${apiKey}`;
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    });

    Promise.all(promises)
        .then(results => {
            results.forEach(data => {
                if (data.Response === 'False') {
                    throw new Error(data.Error);
                }
                displayMovieInfo(data);
            });
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayMovieInfo(movie) {
    const movieInfoDiv = document.getElementById('movie-info');
    const movieHTML = `
        <h2>${movie.Title}</h2>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <img src="${movie.Poster}" alt="Poster" style="width: 100%;">
    `;
    movieInfoDiv.innerHTML += movieHTML;
}

function displayError(message) {
    const movieInfoDiv = document.getElementById('movie-info');
    movieInfoDiv.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
}



