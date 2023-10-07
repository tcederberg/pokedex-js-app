let pokemonRepository = (function () {
    //make #modal-container a global variable
    let modalContainer = document.querySelector('#modal-container');

    //edit showDetails function to open the modal
    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function() { 
            showModal(title, text);
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

            let container = document.querySelector('#image-container');
            let myImage = document.createElement('img');
            myImage.src = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
            
            modalContainer.appendChild(myImage);
                //append close button to modal
            modal.appendChild(closeButtonElement);
                //append title to modal
            modal.appendChild(titleElement);
                //append text to modal
            modal.appendChild(contentElement);
                //apend modal in parent modalContainer
            modalContainer.appendChild(modal);
            
            modalContainer.classList.add('is-visible');
            }
        )
    }
        //enable close button with function hideModal
        function hideModal() {
        // we have defined modalContainer as a global variable
        //let modalContainer = document.querySelector('#modal-container');
            modalContainer.classList.remove('is-visible');

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
        }

        function showDialog(title, text) {
            showModal(title, text);
        
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
            //function to allow ESP-key to activate hideModal
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
            }
        });
            //function to allow the modal to close when clicked outside of modal on screen
        modalContainer.addEventListener('click', (e) => {
            // Since this is also triggered when clicking INSIDE the modal
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
            hideModal();
            }
        }); 

        document.querySelector('#show-modal').addEventListener('click', () => {
            showModal('pokemon.name', 'pokemon.height');
        });

        document.querySelector('#show-dialog').addEventListener('click', () => {
            showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
            alert('confirmed!');
            }, () => {
            alert('not confirmed');
            });
})();


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