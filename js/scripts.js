    // Create an IIFE (Immediately Invoked Function Expression) to encapsulate the code
let pokemonRepository = (function () {
    // Empty array to store Pokémon data
    let pokemonList = [];
  
    // Function to retrieve all Pokémon objects
    function getAll() {
      return pokemonList;
    }
  
    // Function to add a Pokémon object to the list
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    // Function to add a Pokémon to the list and create a corresponding list item in the HTML
    function addListItem(pokemon) {
      // Find the <ul> element with the class "pokemon-list"
      let pokemonList = document.querySelector(".pokemon-list");
  
      // Create a new <li> element
      let listItem = document.createElement("li");
  
      // Create a <button> element
      let button = document.createElement("button");
  
      // Set the button's text to the Pokémon's name
      button.innerText = pokemon.name;
  
      // Add a CSS class to the button for styling
      button.classList.add("button-class");
  
      // Append the button to the list item
      listItem.appendChild(button);
  
      // Append the list item to the <ul> element
      pokemonList.appendChild(listItem);
  
      // Add an event listener to the button to show details when clicked
      button.addEventListener("click", function () {
        // Edit your showDetails() function to load Pokémon details from the API
        loadDetails(pokemon).then(function () {
          // Log the result in the console
          console.log(pokemon);
        });
      });
    }
  
    // Function to load Pokémon data from the API
    function loadList() {
      return fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // Iterate through the API results and add each Pokémon to the list
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
  
    // Function to load Pokémon details from the API
    function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          // Assign details to the Pokémon object
          pokemon.imgUrl = details.sprites.front_default;
          pokemon.height = details.height;
          // You can add more details as needed
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  
    // Return an object with public functions and data
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
    };
  })();
  
  // Call the loadList function to fetch Pokémon data and populate the list
  pokemonRepository.loadList().then(function () {
    // Execute getAll from the pokemonRepository
    let allPokemon = pokemonRepository.getAll();
    // Iterate through Pokémon and call the addListItem function
    allPokemon.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
    
    
