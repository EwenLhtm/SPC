function createCard(recipe){
    // card
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    // image
    const img = document.createElement('img');
    img.src = '/images/' + recipe.image;
    // Nom de la recette
    const h3Nom = document.createElement('h3');
    h3Nom.textContent = recipe.name;
    // Titre recette
    const pRecette = document.createElement('p')
    pRecette.textContent = 'Recette'
    // description
    const pDescription = document.createElement('p');
    pDescription.classList.add('textRecette');
    pDescription.textContent = recipe.description;
    // titre ingrédient
    const pIngredient = document.createElement('p');
    pIngredient.textContent = 'Ingrédients'
    // boucle création liste ingrédient
    const divIngredients = document.createElement('div');
    divIngredients.classList.add('ingredients');
    recipe.ingredients.forEach(ingredient => {
        const newIngredient = document.createElement('div');
        newIngredient.classList.add('ingredient');
        const pNomIngredient = document.createElement('p');
        pNomIngredient.classList.add('nomIngredient');
        pNomIngredient.textContent = ingredient.ingredient;
        const pQuantite = document.createElement('p');
        pQuantite.classList.add('quantite');
        if ('unit' in ingredient){
            pQuantite.textContent = ingredient.quantity + " " + ingredient.unit;
        }else {
            pQuantite.textContent = ingredient.quantity;
        }

        newIngredient.appendChild(pNomIngredient);
        newIngredient.appendChild(pQuantite);
        divIngredients.appendChild(newIngredient);
    });
    // ajout dans la card et envoye
    divCard.appendChild(img);
    divCard.appendChild(h3Nom);
    divCard.appendChild(pRecette);
    divCard.appendChild(pDescription);
    divCard.appendChild(pIngredient);
    divCard.appendChild(divIngredients);

    return divCard;
}

const fetchEvent = new Event('fetchEvent');

let recipes = {};

function fetchRecipe(){
    fetch('https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json')
        .then(response => {
            return response.json()})
        .then(data => {
            recipes = data;
            document.dispatchEvent(fetchEvent);
        });
}

fetchRecipe();

document.addEventListener('fetchEvent', () => {
    const divRecettes = document.getElementById('recettes');
    console.log(recipes);

    recipes.forEach(recipe => {
        let newCard = createCard(recipe);
        divRecettes.appendChild(newCard);
    });
});