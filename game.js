let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector('#play-again')
//initialize empty url outside of function
let url = ''

// An array of country codes is provided in the countries.js file. 
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available


//  the page loads, select an element at random from the countriesAndCodes array
//  the country's name in the randomCountryElement

//The function selects a random country from countriesAndCode array by looping through - then adds it to the url via template string

function gameStart (){
    //random country selection (the random function code/math is from stack overflow )
    let randomCountry = countriesAndCodes[Math.floor(Math.random() * countriesAndCodes.length)]
    //loop through array to select each country object
    countriesAndCodes.forEach(function (country){
        //display random country
        randomCountryElement.innerHTML = randomCountry.name
        //get alpha-2 from country object
        let alpha = randomCountry["alpha-2"].toLowerCase()
        //add alpha-2 to url to connect to specific country in API
        url=`https://api.worldbank.org/v2/country/${alpha}?format=json`
    })
}

gameStart()




submitButton.addEventListener('click', function (){
    let answer = userAnswerElement.value
    fetch(url)
        .then( (response) => {
            // response is all the things from the server
            console.log(response) // logging response to check if working
            // extract JSON
            return response.json()
        })
        .then( function(data) { //after extracting object from API loop through it for info

            data[1].forEach(function (countryInfo){
                //check if capital city matches user input
                if(answer  != countryInfo.capitalCity){
                    resultTextElement.innerHTML = `Incorrect. The Capital of ${countryInfo.name} is ${countryInfo.capitalCity}. Not ${userAnswerElement.value}`
                }
                else{
                    resultTextElement.innerHTML = `Correct! The Capital of ${countryInfo.name} is ${countryInfo.capitalCity}.`
                }
            })
        }) //if issues connecting to API error displays
        .catch( error => {
            console.log(error)
            alert('ERROR')
        })
})
 
// Display the country's name.

playAgainButton.addEventListener('click', function(){
    //clears user input and result
    userAnswerElement.value = ''
    resultTextElement.innerHTML = ''
    //calls game start to select new random country & update url with it
    gameStart()
})