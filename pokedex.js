//Pegando os elementos que iremos manipular

const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');
const form = document.querySelector('.form');
const input = document.querySelector('input');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
let pokemonAtual = 1;

//Função que irá realizar a requisição na API
async function fetchPokemon(pokemon){
    // Definindo a url de requisição
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    
    
    //Realizando a requisição com fetch()
    const response = await fetch(url);
    //convertendo os dados da requisição para json()
    const data = await response.json();
    //retornando o pokemon pe
    return data;
}

//função que irá carregar o pokemon no body
async function renderPokemon(pokemon) {
    pokemonName.innerText = "Carregando...";
    pokemonNumber.innerText = "";

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = "";
        pokemonAtual = data.id;
    }
    else{
        pokemonImage.computedStyleMap.display = 'none';
        pokemonName.innerText = "Não encontrado :("
    }
}

//função submit do formulário
form.addEventListener('submit', (e) =>{
    //impede a pagina de dar o refresh
    e.preventDefault();
    //pegando o valor digitado    
    let pokemon = input.value;
    //passando o valor digitado na função renderPokemon
    renderPokemon(pokemon);

})

// Eventos dos botoes btnNext e btnPrev

btnPrev.addEventListener('click',() => {
    //Se o pokemons atual for maior que 1
    if (pokemonAtual > 1){
        pokemonAtual --;
        //Chama a função renderPokemon com o novo valor
        // de pokemon atual
        renderPokemon(pokemonAtual);
    }
})

btnNext.addEventListener ('click', () => {
    pokemonAtual++;
    renderPokemon(pokemonAtual)
})

renderPokemon(pokemonAtual);