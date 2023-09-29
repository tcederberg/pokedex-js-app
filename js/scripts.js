let pokemonList = [
    {name: 'Squirtle', height: 50, types: ['Water'], abilities: ['Rain dish', 'Torrent']},
    {name: 'Vulpix', height: 60, types: ['Fire'], abilities: ['Flash fire', 'Drought']},
    {name: 'Alakazam', height: 150, types: ['Psychic'], abilities: ['Synchronize', 'Inner focus']}
  ];
  for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >100){ //if pokemon's height is over 100cm also print 'Wow that's big
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ' cm) - Wow, that\'s big!<br>');
    }else {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ' cm)<br>');
    }
}
