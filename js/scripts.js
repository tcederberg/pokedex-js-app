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
  pokemonList.forEach(function(pokemon){
    if (pokemon.height >100){
        document.write(pokemon.name + ':' + ' ' + 'height-' + ' ' + pokemon.height + 'cm' + '- Wow, that\'s big!<br>');
    }else {
        document.write(pokemon.name + ':' + ' ' + 'height-' + ' ' + pokemon.height + 'cm<br>');
    }
  })