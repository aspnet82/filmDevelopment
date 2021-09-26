const submitBtn = document.querySelector("#button_submit");
const baseUrl = 'https://api.themoviedb.org/3/search/movie?';
const input = document.querySelector("#input")
const API_KEY = '19c424a38b2cbdfb3625a174a3b6a382'
let movies = []


const search = (e) => {
    //prevent the page refresh
    e.preventDefault()
    const movie = input.value;

    //fetch
    fetchMultiplePages(movie)
    //fetchData(movie)

}

const fetchData = async (movie) => {
    
    let urlToSearch = baseUrl  + "api_key=" + API_KEY + "&language=en-US&query=" + movie + "&page=1&include_adult=false"

    const response = await fetch(urlToSearch);

    try {
        if (response.ok) {
            const jsonResponse = await response.json()
            movies = jsonResponse.results;
            for (movie of movies) {
                console.log(movie.original_title)
            }
            return movies
        } 
        throw new Error('request failed');
    } catch(error) {
        console.log(error)
    }

}


const fetchMultiplePages = async (movieToSearch) => {
    movies = []
    let page = 1
    let urlToSearch = baseUrl  + "api_key=" + API_KEY + "&language=en-US&query=" + movieToSearch + "&page=" + page +"&include_adult=false"

    const response = await fetch(urlToSearch);

    try {

        //Fetch first page
        if (response.ok) {
            const jsonResponse = await response.json();
            for (movie of jsonResponse.results) {
                movies.push(movie);
            }
            
            //fetch all the other pages
            for (i=2; i<= jsonResponse.total_pages; i++) {
                page = i
                urlToSearch = baseUrl  + "api_key=" + API_KEY + "&language=en-US&query=" + movieToSearch + "&page=" + page +"&include_adult=false"
                const newResponse = await fetch(urlToSearch)
                if (newResponse.ok) {
                    const newJsonResponse = await newResponse.json()
                    for (movie of newJsonResponse.results) {
                        movies.push(movie)
                    }
                }
            }
            
        }

        for (movie of movies) {
            //console.log(movie.original_title);
        }



    } catch(error) {
        console.log(error)
    }

    for (film of movies) {
        console.log(film.original_title);
    }
    console.log("Movies contains.." + movies.length + " films")

}



submitBtn.onclick = search;