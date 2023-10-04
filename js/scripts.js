let pokemonRepository = (function () {
    let repository = [
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
        return repository;
    }
    function add (pokemon) {
        repository.push(pokemon);
    }
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
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