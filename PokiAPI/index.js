
//atalhos no JavaScript

const form = document.getElementById('search-form');
const input = document.getElementById('pokemon-input');
const statusMessage = document.getElementById('status-message');
const card = document.getElementById('pokemon-card');

const imgEl = document.getElementById('pokemon-image');
const nameEl = document.getElementById('pokemon-name');
const numberEl = document.getElementById('pokemon-number');
const typesEl = document.getElementById('pokemon-types');
const abilitiesEl = document.getElementById('pokemon-abilities');



//clica em "Buscar"

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  showLoading('Buscando informações...');

  try {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

    if (!response.ok) {
      throw new Error('Pokémon não encontrado. Verifique o nome ou ID.');
    }

    const data = await response.json();

    renderPokemon(data);

  } catch (error) {
    showError(error.message);
  }
});

//Mostra uma mensagem na tela enquanto a API responde

function showLoading(msg) {
  card.classList.add('hidden');
  statusMessage.className = 'status-loading';
  statusMessage.textContent = msg;
  statusMessage.classList.remove('hidden');
}

//exibe mensagem na tela caso não tenha o pokemon

function showError(msg) {
  card.classList.add('hidden');
  statusMessage.className = 'status-error';
  statusMessage.textContent = msg;
  statusMessage.classList.remove('hidden');
}



//Coloca as informações do Pokémon recebidas da API na tela.

function renderPokemon(pokemon) {

  statusMessage.classList.add('hidden');
  nameEl.textContent = pokemon.name;
  numberEl.textContent = `#${String(pokemon.id).padStart(3, '0')}`;
  
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default 
                || pokemon.sprites.front_default;
  imgEl.src = imageUrl;
  imgEl.alt = `Imagem de ${pokemon.name}`;

  const types = pokemon.types.map(t => t.type.name).join(', ');
  typesEl.textContent = types;

  const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
  abilitiesEl.textContent = abilities;

  card.classList.remove('hidden');
}