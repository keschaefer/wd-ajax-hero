document.addEventListener("DOMContentLoaded", function (event) {
  (function () {
    'use strict';

    const movies = [];

    const renderMovies = function () {
      $('#listings').empty();

      for (const movie of movies) {
        const $col = $('<div>').addClass('col s6');
        const $card = $('<div>').addClass('card hoverable');
        const $content = $('<div>').addClass('card-content center');
        const $Title = $('<h6>').addClass('card-Title truncate');

        $Title.attr({
          'data-position': 'top',
          'data-tooltip': movie.Title
        });

        $Title.tooltip({
          delay: 50
        }).text(movie.Title);

        const $Poster = $('<img>').addClass('Poster');

        $Poster.attr({
          src: movie.Poster,
          alt: `${movie.Poster} Poster`
        });

        $content.append($Title, $Poster);
        $card.append($content);

        const $action = $('<div>').addClass('card-action center');
        const $plot = $('<a>');

        $plot.addClass('waves-effect waves-light btn modal-trigger');
        $plot.attr('href', `#${movie.imdbID}`);
        $plot.text('Plot Synopsis');

        $action.append($plot);
        $card.append($action);

        const $modal = $('<div>').addClass('modal').attr('id', movie.id);
        const $modalContent = $('<div>').addClass('modal-content');
        const $modalHeader = $('<h4>').text(movie.Title);
        const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
        const $modalText = $('<p>').text(movie.plot);

        $modalContent.append($modalHeader, $movieYear, $modalText);
        $modal.append($modalContent);

        $col.append($card, $modal);

        $('#listings').append($col);

        $('.modal-trigger').leanModal();
      }
    };

    // ADD YOUR CODE HERE

    let search = document.querySelector("#search");
    let searchButton = document.querySelector("button");
    let movie = "";
    let movieURI = "";

    searchButton.addEventListener("click", searchSub);
    searchButton.addEventListener("keypress", searchSub);

    function searchSub(event) {
      event.preventDefault();
      let movie = search.value;
      let movieURI = encodeURI(movie);
      search.value = "";
      if (movieURI === "") {
        alert("Pretty please, enter a movie title.")
      }

      var http = new XMLHttpRequest();

      http.open("GET", "https://omdb-api.now.sh/?s=" + movieURI, true);
      http.send();

      http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
          let movieInfo = (JSON.parse(http.response));
          movies.push(movieInfo.Search[0]);
          console.log(movies);
          renderMovies();
        }
      }
    }


  })();
});