// Create an IIFE (Immediately Invoked Function Expression) to encapsulate the code
let pokemonRepository = (function () {
    // Empty array to store Pokémon data
    let pokemonList = [];
  
      // Function to get all Pokémon in the list
      function getAll() {
        return pokemonList;
      }
  
      // Function to add a Pokémon to the list
      function add(pokemon) {
        pokemonList.push(pokemon);
      }
  
      // Function to add a Pokémon to the HTML list as a button
      function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class'); 
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
  
        // Add an event listener to the button to show details when clicked
        button.addEventListener('click', function () {
          showDetails(pokemon);
        });
      }
  
      // Function to load the list of Pokémon from the API
      function loadList() {
        return fetch('https://pokeapi.co/api/v2/pokemon/')
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            data.results.forEach(function (item) {
              let pokemon = {
                name: item.name,
                detailsUrl: item.url,
              };
              add(pokemon);
            });
          })
          .catch(function (e) {
            console.error(e);
          });
      }
  
      // Function to load details of a Pokémon from the API
      function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
          .then(function (response) {
            return response.json();
          })
          .then(function (details) {
            pokemon.imgUrl = details.sprites.front_default;
            pokemon.height = details.height;
          })
          .catch(function (e) {
            console.error(e);
          });
      }
  
      // Function to show Pokémon details in the modal
      function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
          let modalContainer = document.querySelector('#modal-container');
          modalContainer.classList.add('is-visible');
          showModal(pokemon);
        });
      }
  
      // Function to create and display the modal
      function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
  
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
    
  
        let nameElement = document.createElement('title');
        nameElement.innerText = "Name: " + pokemon.name;
  
        let heightElement = document.createElement('body');
        heightElement.innerText = "Name: " + pokemon.name + "," + " " + "Height: " + pokemon.height + "cm.";
  
        let imageElement = document.createElement("img");
        imageElement.src = pokemon.imgUrl;
        imageElement.alt = pokemon.name;
  
        modal.appendChild(closeButtonElement);
        modal.appendChild(nameElement);
        modal.appendChild(heightElement);
        modal.appendChild(imageElement);
  
       
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
      }
  
      return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        hideModal: hideModal,
      };
    })();
  
    // Load the list of Pokémon and add them to the HTML
    pokemonRepository.loadList().then(function () {
      let allPokemon = pokemonRepository.getAll();
      allPokemon.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
    });

      // Function to hide the modal
      function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
      }
  
      // Event listener to close the modal when clicking outside of it
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
  
      // Event listener to close the modal when pressing the 'Esc' key
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
      });
  




/*Exercise 1.6 code
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