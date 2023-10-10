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
                showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
                    alert('confirmed!');
                    }, () => {
                    alert('not confirmed');
                    });
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

    function showModal(title, text, img) {
        let modalContainer = document.querySelector('#modal-container');
        //clear all existing modal content
    modalContainer.innerHTML = '';

        //create div element
    let modal = document.createElement('div');
    modal.classList.add('modal');

    //add the new modal content
        //create close button element
    let closeButtonElement = document.createElement('button');
        //create button class for css styling
    closeButtonElement.classList.add('modal-close');
        //inner text in button to say Close
    closeButtonElement.innerText = 'Close';
        //if close is clicked hideModal will activate 
    closeButtonElement.addEventListener('click', hideModal);

        //create title element 
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    //create text element in p
    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    //create img element
    let imageElement = document.createElement('img');
    imageElement.setAttribute("src", img);
    imageElement.setAttribute("width", "100");
    imageElement.setAttribute("height", "100");
    
        //append close button to modal
    modal.appendChild(closeButtonElement);
        //append title to modal
    modal.appendChild(titleElement);
        //append text to modal
    modal.appendChild(contentElement);
        //append img to modal
    modal.appendChild(imageElement);
        //apend modal in parent modalContainer
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add('is-visible');
}

function showDialog(title, text, img) {
    showModal(title, text, img);
    
        // We have defined modalContainer as a global variable
        // let modalContainer = document.querySelector('#modal-container');
    
        // We want to add a confirm and cancel button to the modal
        let modal = modalContainer.querySelector('.modal');
    
        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';
    
        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';
    
        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);
    
        // We want to focus the confirmButton so that the user can simply press Enter
        confirmButton.focus();
        // Return a promise that resolves when confirmed, else rejects
        return new Promise((resolve, reject) => {
            cancelButton.addEventListener('click', hideModal);
            confirmButton.addEventListener('click', () => {
            dialogPromiseReject = null; // Reset this
            hideModal();
            resolve();
            });
        // This can be used to reject from other functions
        dialogPromiseReject = reject;
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

   //enable close button with function hideModal
   function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    // we have defined modalContainer as a global variable
    //let modalContainer = document.querySelector('#modal-container');
     modalContainer.classList.remove('is-visible');
}

        //function to allow ESP-key to activate hideModal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
        }
    });
    let modalContainer = document.querySelector('#modal-container');
        //function to allow the modal to close when clicked outside of modal on screen
    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
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