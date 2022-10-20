let allPokemon = [];
let tableEnd = []

const searchInput = document.querySelector('.search-poke input')
const listPoke = document.querySelector('.liste-poke');
const loading = document.querySelector('.loader');

const types = {
// grass:'#78c850',
//  ground: '#E2BF65',
//  dragon: '#E2BF65',
//  fire: '#F58271',
//  electric: '#F7D02C',
//  fairy: '#D685AD',
//  poison: '#966DA2C',
//  bug: '#B3F594',
//  water:  '#6390F0',
//  normal: '#D9D5D8',
//  psychic: '#F95587',
//  flying: '#A98FF3',
//  fighting: '#C25956',
//  rock: '#B6A136',
//  weedle: '#B6A136',
//  ghost: '#735797',
//  ice: '#96D9D6',
//  koffing: '#96D9D6'

    normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',

}

function fetchPokemonBase(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((response) => response.json())
    .then((data) => {
        // console.log(data)
        data.results.forEach((pokemon) => {
            fetchPokemonFull(pokemon)
            
        });
    })
}
fetchPokemonBase()

function fetchPokemonFull(pokemon){
    let objPokemonFull = {};
    let url =  pokemon.url;
    let nameP = pokemon.name;

    fetch(url)
    .then(response => response.json())
    .then((pokeData) => {
        // console.log(pokeData)

        objPokemonFull.pic = pokeData.sprites.front_default;
        objPokemonFull.type =  pokeData.types[0].type.name;
        objPokemonFull.id = pokeData.id;

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
        .then(response => response.json())
        .then((pokeData) => {
            // console.log(pokeData)
            objPokemonFull.name = pokeData.names[8].name;
            allPokemon.push(objPokemonFull);

            if(allPokemon.length === 151){
                //  console.log(allPokemon)

                tableEnd = allPokemon.sort((a,b) => {
                    return a.id - b.id
                }).slice(0,21)
                // console.log(tableEnd);
                createCard(tableEnd);
                loading.style.display = 'none';
            }
        })
    })
}
// CreateCard

function createCard(arr){
    for(let i = 0; i < arr.length; i++){
        const card =  document.createElement('li');
        let color = types[arr[i].type];
        card.style.background = color;
        const txtCard = document.createElement('h5');
        txtCard.innerText = arr[i].name;
        const idCard = document.createElement('p')
        idCard.innerText = `ID# ${arr[i].id}`;
        const imgCard = document.createElement('img');
        imgCard.src = arr[i].pic;

        card.appendChild(imgCard)
        card.appendChild(txtCard)
        card.appendChild(idCard)
        listPoke.appendChild(card)
    }
}


// Scroll Infini

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    //scrollTop = scroll from the top
    // scrollHeight =  scroll total
    // clientHeight = the heigher of the window

    // console.log(scrollTop, scrollHeight, clientHeight);
    if(clientHeight + scrollTop >= scrollHeight -20){
        addPoke(6)
    }
})

let index = 21

function addPoke(nb){
    if(index > 151) {
        return
    }
    const arrToAdd = allPokemon.slice(index, index + nb);
    createCard(arrToAdd)
    index += nb
}

// Search


// const formSearch = document.querySelector('form');
// formSearch.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     formSearch()
    // })
    searchInput.addEventListener('keyup', search);

function search(){
    if(index < 151){
        addPoke(130);
    }
    let filter, allLi, titleValue, allTitles;
    filter = searchInput.value.toUpperCase();
    allLi = document.querySelectorAll('li');
    allTitles = document.querySelectorAll('li > h5');

    for(i = 0; i< allLi.length; i++){
        titleValue = allTitles[i].innerText;

        if(titleValue.toUpperCase().indexOf(filter) > -1){
            allLi[i].style.display = 'flex';
        }else {
            allLi[i].style.display = 'none';
        }
    }
}





// Animation Input

searchInput.addEventListener('input',(e) =>{
    if(e.target.value !== ''){
        e.target.parentNode.classList.add('active-input');
    }else if (e.target.value === "") {
        e.target.parentNode.classList.remove('active-input')
    }
} )