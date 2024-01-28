
const pokenmonTypeURL = 'https://pokeapi.co/api/v2/type/'

const NameUrlMap={};
async function search_pokemonType(){
    const Response=await fetch(pokenmonTypeURL)
    const parsedResponse= await Response.json()
   
        // console.log(parsedResponse);
        for (let i = 0; i < parsedResponse.results.length; i++) {
            const type = parsedResponse.results[i];
            const typeName=type.name;
            const typeUrl=type.url;
            NameUrlMap[typeName]=typeUrl
            console.log("lof is thjis value"+typeof(typeUrl));
            const select=document.getElementById("pokemon_type")
            let option=document.createElement('option')
            option.innerText=typeName
            option.setAttribute('value',typeName)
            option.setAttribute('data-url',typeUrl)
            // console.log("option set attribute is "+option);
            select.append(option)
            
        }
    
}


async function fetchPokemonOnType () {

    // console.log(NameUrlMap)
    const selectValue = document.getElementById('pokemon_type').value
    console.log("the select value\n\n", selectValue, NameUrlMap[selectValue])

    const response= await fetch(NameUrlMap[selectValue])
    const parsedResponse= await response.json()
   

        const pokemonsData = parsedResponse.pokemon
        console.log("pokemons data is :"+pokemonsData);

        const pokemonsListLength = pokemonsData.length > 10 ? 12 : pokemonsData.length

        const pokemonBox = document.getElementById('pokemonCard')
        pokemonBox.innerHTML = ''

        for (let i = 0; i < pokemonsListLength; i++) {

            const pokemon = pokemonsData[i].pokemon;
            const pokemonName = pokemon.name
            const pokemonURL = pokemon.url
            console.log("url is ::::"+pokemonURL);

            
        
            let imageSrcData = ''
            fetchPokemonData(pokemonURL).then( imageSrc => {

                
                const pokemonDiv = document.createElement('div')
                pokemonDiv.classList.add("pokeCard")
                let id=pokemonURL.id;
                let para=document.createElement("p");
                para.innerText=id
                pokemonDiv.append(para)


               console.log(parsedResponse.id);
                const pokemonFrontPicture = document.createElement('img')
                const pokemonNameSpan = document.createElement('p')
                pokemonNameSpan.classList.add("pokemonName")
                const type_poke=document.createElement("p");
                type_poke.classList.add("type_button")
                type_poke.innerText=selectValue;
                

                pokemonFrontPicture.setAttribute('src', imageSrc)

                pokemonNameSpan.innerText = pokemonName
                pokemonDiv.append(pokemonFrontPicture,  pokemonNameSpan,type_poke,id)


                pokemonBox.append(pokemonDiv)
                console.log(pokemonsData);
                console.log(pokemonURL);
                console.log(parsedResponse.order);
                // alert(parsedResponse.order)


            } )


            
            
        }

    

}


// this will return pokemon image based on the URL...
async function fetchPokemonData (pokemonURL) {

    const response = await fetch(pokemonURL)

    const parsedResponse = await response.json()

    return parsedResponse.sprites.front_default

}

// async function fetchPokemonAbilities (pokemonURL) {

//     const response = await fetch(pokemonURL)

//     const parsedResponse = await response.json()

//     return parsedResponse.abilities.front_default

// }


async function fetchAllPokemon(){
    for (let i = 1; i < 151; i++) {
        const pokenmonTypeUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const response=await fetch(pokenmonTypeUrl)
        const parsedResponse = await response.json()

        let id=parsedResponse.id;


      console.log(parsedResponse.id);
      const pokemonDiv = document.createElement('div')
      pokemonDiv.classList.add("pokeCard")
      let p=document.createElement('p');
      pokemonDiv.append(p);
      
      p.innerText="Type: "+ id;
      p.style.textDecoration="underline"
      p.style.marginBottom="10px"
      p.style.color="purple"

      let name=parsedResponse.name;
      let p1=document.createElement("p");
      p1.innerText=name;
      pokemonDiv.append(p1)
      let div=document.getElementById("pokemonCard");

      let type=parsedResponse.types[0].type.name;
      console.log(type);
    
     



      let img=parsedResponse.sprites.front_default;
      let img_tag=document.createElement('img');
      img_tag.setAttribute('src',img);
      pokemonDiv.append(img_tag)

      let p2=document.createElement("p");
      p2.classList.add('type_button')
      p2.innerText=type;
      pokemonDiv.append(p2)

      div.append(pokemonDiv)

   



        
    }
}

fetchAllPokemon();


