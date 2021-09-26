const submitBtn = document.querySelector("#button_submit");
const baseUrl = 'https://filmdev.org/api/recipe/';
const input = document.querySelector("#input")

const search = (e) => {
    //prevent the page refresh
    e.preventDefault()
    const keyWordToSearch = input.value;

    //fetch
    fetchData(keyWordToSearch)

}

const fetchData = async (word) => {
    //reset input 
    input.value = ""
    urlToSearch = baseUrl + word;
    console.log(urlToSearch)
    //Set headers
    const options = {
        method: 'GET',
        headers: {"Accept": "*/*"},
        mode: 'no-cors'
    }
    //Fetch request
    try {
        const response =  await fetch(urlToSearch, options);
        console.log(response.status)

        if (response.ok) {
        } 
        
    } catch(error) {
        console.log(error);
    }
    
    
}


submitBtn.onclick = search;


