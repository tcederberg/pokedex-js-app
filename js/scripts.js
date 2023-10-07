//Exercise 1.6 code
//create an IIFE to encapsulate the code
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Squirtle', 
        height: 50, 
        types: ['Water'], 
        abilities: ['Rain dish', 'Torrent']
        },
        {name: 'Vulpix', 
        height: 60, 
        types: ['Fire'], 
        abilities: ['Flash fire', 'Drought']
        },
        {name: 'Alakazam', 
        height: 150, 
        types: ['Psychic'], 
        abilities: ['Synchronize', 'Inner focus']
        },
        {name: 'Machamp',
        height: 160,
        types: ['Fighting'],
        abilities: ['Guts', 'Steadfast', 'No-guard']
        },
        {name: 'Zapdos',
        height: 160,
        types: ['Electric', 'Flying'],
        abilities: ['Lightningrod', 'Pressure']
        },
        {name: 'Mewtwo',
        height: 200,
        types: ['Psychic'],
        abilities: ['Pressure', 'Unnerve']
        },
        {name: 'Gyarados',
        height: 650,
        types: ['Water', 'Flying'],
        abilities: ['Intimidate', 'Moxie']
        }
    ];
        //function to add a pokemon object to the list
    function add (pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon &&
            "abilities" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct")
        }
    }
        //functiont to retrieve all pokemon objects
    function getAll () {
        return pokemonList;
    }
    //create addListItem in IIFE to add a pokemon to list and create corresponding list item in HTML
    function addListItem(pokemon){
        //find the <ul> element with the class "pokemon-list"
        let pokemonList = document.querySelector(".pokemon-list");

        //create new <li> element 
        let listpokemon = document.createElement("li");

        //create <button> element
        let button = document.createElement("button");

        //set the button's text to the pokemon's name
        button.innerText = pokemon.name;

        //add a css class to the button for styling
        button.classList.add("button-class");

        //append the button to the list item
        listpokemon.appendChild(button);

        //append list item to the <ul> element 
        pokemonList.appendChild(listpokemon);

        //event listener to button calling showDetails function
        button.addEventListener('click', function() {
            showDetails(pokemon)
        });
    }
        //create new function showDetails 
    function showDetails(pokemon){
        console.log(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})();

console.log(pokemonRepository.getAll());
    //use newly added addListItem insdie forEach()
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});


    //Exercise 1.7 code still to be revised
/*let pokemonRepository = (function () {
    let pokemonList = [];
        //link API here
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        //function to retreive all Pokemon objects
    function getAll () {
        return pokemonList;
    }

        //function to add a Pokemon object to the list
    function add (pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
        pokemonList.push(pokemon);
    } else {
        console.log("pokemon is not correct");
    }
    }

        //function to add a pokemon to the list and create a corresponding list in the HTML
    function addListItem(pokemon){
        //Find the <ul> element with the class "pokemon-list"
        let pokemonList = document.querySelector(".pokemon-list");

        //create new <li> element
        let listpokemon = document.createElemenet("li");

        //ceate <button> element
        let button = document.createElement("button");

        //set the button's text to the pokemon's name
        button.innerText = pokemon.name;

        //add a css class to the button for styling
        button.classList.add("button-class");

        //append the button to the list item
        listpokemon.appendChild(button);

        //append list item to the <ul> element
        pokemonList.appendChild(listpokemon);

        //add event listener to the button to show detials when clicked
        button.addEventListener("click", function(pokemon) {
            showDetails(pokemon);
        });
    }
        //function to load pokemon data from the API
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
                //iterate through the API results and add each pokemon to the list
            json.results.forEach(function (pokemon) {
                let pokemon = {
                    name: pokemon.name,
                    detailsUrl: pokemon.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }
        //function to load pokemon details from the API
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
                //assign detials to the pokemon objects
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
                //more detials can be added
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
        console.log(pokemon);
        });
    }
        //return an object with public functions and data 
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();
        //call the loadlist function to fetch pokemon data and list
pokemonRepository.loadList().then(function() {
    //execute getAll from the pokemonRepository
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    }); //iterate through pokemon and call addListItem function
});*/




/* Exercise 1.5 code before DOM Manipulation and event listener.
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Squirtle', 
        height: 50, 
        types: ['Water'], 
        abilities: ['Rain dish', 'Torrent']
        },
        {name: 'Vulpix', 
        height: 60, 
        types: ['Fire'], 
        abilities: ['Flash fire', 'Drought']
        },
        {name: 'Alakazam', 
        height: 150, 
        types: ['Psychic'], 
        abilities: ['Synchronize', 'Inner focus']
        }
    ];

    function getAll () {
        return pokemonList;
    }
    function add (pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    }
})();


pokemonRepository.getAll().forEach(function(pokemon){
    if (pokemon.height >100){
        document.write(pokemon.name + ':' + ' ' + 'height-' + ' ' + pokemon.height + 'cm' + '- Wow, that\'s big!<br>');
    }else {
        document.write(pokemon.name + ':' + ' ' + 'height-' + ' ' + pokemon.height + 'cm<br>');
    }
  })
*/