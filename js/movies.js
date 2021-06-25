//This is the ready function on the start of the page
$(document).ready(() =>{
    //When the user enters there search 
    $('#searchMovie').on('submit', (event)=> {
        event.preventDefault();
        let searchText = $('#searchText').val();    //getting the value of the user search 
        getMovies(searchText);
    });
    

  
});


//function to get the movies from the search 
const getMovies = searchText =>{
    //using fetch on the API with the user search as a param 
    fetch("http://www.omdbapi.com/?apikey=21165193&s="+searchText)
    .then(response => {
        if(response.ok){
            console.log('Success')
            return response.json();         //getting a response from the search if it was okay
        }else{
            console.log('Not successful')
        }
         
    })
    .then(data =>{
        console.log(data.Search);           // showing/getting the data from the user search 
       
     let movies = data.Search;              // the data from the search 
     let output = '';
      $.each(movies, (index, movie) => {
      
          output +=`<div class="col-md-3">
                    <div class="well text-center search md-4">
                        <img class="img-rounded" src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelect('${movie.imdbID}')" class="btn btn-primary" href="movie.html">Movie Details</a>
                    </div>
                    </div>
                    `;
      }); 
      
      $('#movies').html(output);
    })
    .catch((error) =>{
        console.log(error);
    });
}

    //function to save the user selected movie from search 
const movieSelect = id =>{
    sessionStorage.setItem('movieID', id);
    window.location = 'movie.html';
    return false;
}

//getting and displaying the selected movie from search 
const getMovie =() =>{
    let movie = sessionStorage.getItem('movieID')
fetch("http://www.omdbapi.com/?apikey=21165193&i="+movie)
.then(res =>{
    return res.json();
})
.then(data =>{
    //   console.log(data)
    let movie = data;
    let output = `

    <div class="row">

    <div class="col-md-6" >  
    <div class="well text-center">
    <img src="${movie.Poster}">
    

</div>


    </div>
    <div class="col-md-6" >
    <ul id="movie-details">
    <h5>${movie.Title}</h5>
        <li class="list-group-item list-group-item-info">Actors: ${movie.Actors}</li>
        <li class="list-group-item list-group-item-info">Director: ${movie.Director}</li>
        <li class="list-group-item list-group-item-info">Genre: ${movie.Genre}</li>
        <li class="list-group-item list-group-item-info">Plot: ${movie.Plot}</li>
        <li class="list-group-item list-group-item-info">Production: ${movie.Production}</li>
        <li class="list-group-item list-group-item-info">Release: ${movie.Released}</li>
        <li class="list-group-item list-group-item-info">Runtime: ${movie.Runtime}</li>

    </ul>
    </div>
    </div>

    <div class="row">
    <a id="backTo" class="btn btn-primary " href="index.html">Back to Search</a>
    </div>
    `;

     
     $('#movie').html(output);
})
.catch((error) =>{
    console.log(error);
});



}
