let pokemonRepository = (function () {
  let t = [];
  function e(e) {
    'object' == typeof e && 'name' in e && 'detailsUrl' in e
      ? t.push(e)
      : console.log('This Pokemon is not correct!');
  }
  function n() {
    return t;
  }
  function i(t) {
    a(t);
  }
  function a(t) {
    return fetch(t.detailsUrl)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.weight = e.weight),
          (t.types = []);
        for (var n, i = 0; i < e.types.length; i++)
          t.types.push(e.types[i].type.name);
        t.abilities = [];
        for (var i = 0; i < e.abilities.length; i++)
          t.abilities.push(e.abilities[i].ability.name);
        let a, o, r, l, s, p, d, c;
        (n = t),
          (a = $('.modal-body')),
          (o = $('.modal-title')),
          $('.modal-header'),
          o.empty(),
          a.empty(),
          (r = $('<h1>' + n.name + '</h1>')),
          (l = $('<img class="modal-img">')),
          l.attr('src', n.imageUrl),
          (s = $('<p>HEIGHT : ' + n.height + '</p>')),
          (p = $('<p>WEIGHT : ' + n.weight + '</p>')),
          (d = $('<p>TYPES : ' + n.types.join(', ') + '</p>')),
          (c = $('<p>ABILITIES : ' + n.abilities.join(', ') + '</p>')),
          d.addClass('array-item'),
          c.addClass('array-item'),
          o.append(r),
          a.append(l),
          a.append(s),
          a.append(p),
          a.append(d),
          a.append(c);
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  return {
    add: e,
    getAll: n,
    loadList: function t() {
      return fetch('https://pokeapi.co/api/v2/pokemon')
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            e({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: a,
    addListItem: function t(e) {
      let n = document.querySelector('.pokemon-list'),
        i = document.createElement('li'),
        o = document.createElement('button');
      i.classList.add('list-group-item', 'row', 'bg-transparent', 'border-0'),
        o.classList.add('btn', 'btn-primary', 'btn-lg', 'button-custom'),
        (o.innerText = e.name),
        o.setAttribute('data-target', '#modal-container'),
        o.setAttribute('data-toggle', 'modal'),
        i.appendChild(o),
        n.appendChild(i),
        o.addEventListener('click', () => {
          var t;
          (t = e), a(t);
        });
    },
    showDetails: i,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});