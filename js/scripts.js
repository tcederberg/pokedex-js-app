let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll () {
        return pokemonList;
    }

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

    function addListItem(pokemon){
        let list = document.querySelector(".pokemon-list");
        let listpokemon = document.createElemenet("li");
        let button = document.createElement("button");
        button.addEventListener('click', function(pokemon){
            console.log(pokemon);
        });
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
        })
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
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

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
        console.log(pokemon);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});



/* Exercise 1.6 code
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

    function getAll () {
        return pokemonList;
    }
    function add (pokemon) {
        pokemonList.push(pokemon);
    }
    function addListItem(pokemon){
        let list = document.querySelector(".pokemon-list");
        let listpokemon = document.createElemenet("li");
        let button = document.createElement("button");
        button.addEventListener('click', function(pokemon){
            console.log(pokemon);
        });
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }

    function showDetails(pokemon){
        console.log(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})();

pokemonRepository.add({ name: "Pikachu", height: 40, types: ['Electric'], abilities: ['Static', 'Lightningrod']});

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
*/


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