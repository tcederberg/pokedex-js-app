//IIFE: Pokemon Repository Listing

let pokemonRepository = (function() {

    let pokemonList =[];

// Link to access the POKEAPI database
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon';

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("This Pokemon is not correct!");
        }
    }

    function getAll() {
        return pokemonList;
    }

    //Creates the list of Pokemon buttons
    function addListItem(pokemon) {
        let fullList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        listItem.classList.add('list-group-item', 'row', 'bg-transparent', 'border-0');
        button.classList.add('btn','btn-primary','btn-lg','button-custom');
        button.innerText = pokemon.name;
        button.setAttribute("data-target", "#modal-container"); 
        button.setAttribute("data-toggle", "modal");
        listItem.appendChild(button);
        fullList.appendChild(listItem);
        button.addEventListener ('click', () => {
            showDetails(pokemon);
        }
    )};

    function showDetails (pokemon) {
        loadDetails(pokemon);
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //Item details
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight
            item.types = [];
                for (var i = 0; i < details.types.length; i++) {
                  item.types.push(details.types[i].type.name);
                }
            item.abilities = [];
            for (var i = 0; i < details.abilities.length; i++) {
              item.abilities.push(details.abilities[i].ability.name);
            }
            showModal(item);
        }).catch(function (e) {
            console.error(e);
        });
        }

        //Displays the Modal with Pokemon
        function showModal (pokemon) {
            let modalBody = $('.modal-body');
            let modalTitle = $('.modal-title');
            let modalHeader = $('.modal-header');

            modalTitle.empty();
            modalBody.empty();

            let nameElement = $('<h1>' + pokemon.name + '</h1>');
            let imageElement = $('<img class="modal-img">');
              imageElement.attr('src', pokemon.imageUrl);
            let heightElement = $('<p>' + 'HEIGHT : ' + pokemon.height + '</p>');
            let weightElement = $('<p>' + 'WEIGHT : ' + pokemon.weight + '</p>');
            let typesElement = $('<p>' + 'TYPES : ' + pokemon.types.join(', ') + '</p>');
            let abilitiesElement = $('<p>' + 'ABILITIES : ' + pokemon.abilities.join(', ') + '</p>');


            typesElement.addClass('array-item');
            abilitiesElement.addClass('array-item');


            modalTitle.append(nameElement);
            modalBody.append(imageElement);
            modalBody.append(heightElement);
            modalBody.append(weightElement);
            modalBody.append(typesElement);
            modalBody.append(abilitiesElement);
          
        }  
    
    
      return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails
      };
})();




// LOADS THE DATA:

pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});
});