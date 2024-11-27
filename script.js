let recipes = {};
let ingredients = [];
let appareils = [];
let ustensiles = [];
let filtres = [];
const fetchEvent = new Event('fetchEvent');
const filtreEvent = new Event('filtreEvent');

function getMotCle(recipes){
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredient = ingredient.ingredient;
            if (!ingredients.includes(ingredient)){
                ingredients.push(ingredient);
            }
        });

        let appareil = recipe.appliance;
        if (!appareils.includes(appareil)){
            appareils.push(appareil);
        }

        recipe.ustensils.forEach(ustensile => {
            if (!ustensiles.includes(ustensile)){
                ustensiles.push(ustensile);
            }
        })
    });
}

function createCard(recipe){
    // card
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    // image
    const img = document.createElement('img');
    img.src = '/images/' + recipe.image;
    img.alt = `${recipe.name}`;
    // Nom de la recette
    const h3Nom = document.createElement('h2');
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

function createMotCle(motCle){

    const p = document.createElement('p');
    p.value = motCle;
    p.textContent = motCle;
    p.addEventListener('click', () => {
        if (!filtres.includes(motCle)) {
            filtres.push(motCle);
            createTag(motCle);
            document.dispatchEvent(filtreEvent);
        }
    });

    return p;
}

function createTag(motCle){
    const divTags = document.getElementById('tags');
    const p = document.createElement('p');
    p.textContent = motCle;
    p.classList.add('tag');
    p.addEventListener('click', () => {
        p.remove();
        filtres = filtres.filter(item => item !== motCle);
        document.dispatchEvent(filtreEvent);
    })
    divTags.appendChild(p);
}

function ajoutContenuSelect(selectId, items) {
    const select = document.getElementById(selectId);
    const lstMotCle = select.getElementsByClassName('listMotCle')[0];
    lstMotCle.innerHTML = '';
    const input = document.createElement('input');
    input.classList.add('inputSelect');
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter'){
            filterMotCle(input.value, selectId);
        }
    });
    lstMotCle.appendChild(input);
    items.forEach(item => {
        lstMotCle.appendChild(createMotCle(item));
    });
    if (JSON.stringify(select.getElementsByTagName('i')[0].classList).includes('down')){
        lstMotCle.style = "display:none;";
    }
    select.appendChild(lstMotCle);
    select.getElementsByTagName('i')[0].addEventListener('click', () => {
        const lstMotCle = select.getElementsByClassName('listMotCle')['0'];
        const i = select.getElementsByTagName('i')[0];
        if (lstMotCle.style.display == 'none'){
            lstMotCle.style = "display: block;";
            i.classList = "fa-solid fa-sort-up";
        }else{
            lstMotCle.style = "display: none;";
            i.classList = "fa-solid fa-sort-down";
        }
    });
}

function filterMotCle(filtre, id) {
    let items = [];
    switch (id){
        case 'ingredients' :
            items = ingredients;
            break;
        case 'appareils' :
            items = appareils;
            break;
        case 'ustensiles' :
            items = ustensiles;
            break;
    }
    let newItems = [];
    items.forEach(item => {
        let itemVerif = item.toLowerCase();
        if (itemVerif.includes(filtre.toLowerCase())){
            newItems.push(item);
        }
    });

    ajoutContenuSelect(id,newItems);
}

function fetchRecipe(){
    fetch('https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json')
        .then(response => {
            return response.json()})
        .then(data => {
            recipes = data;
            document.dispatchEvent(fetchEvent);
        });
}

document.addEventListener('fetchEvent', () => {
    const divRecettes = document.getElementById('recettes');

    recipes.forEach(recipe => {
        let newCard = createCard(recipe);
        divRecettes.appendChild(newCard);
    });

    document.getElementById('nbRecettes').textContent = `${recipes.length} recettes`;

    getMotCle(recipes);

    ajoutContenuSelect('ingredients', ingredients);
    ajoutContenuSelect('appareils', appareils);
    ajoutContenuSelect('ustensiles', ustensiles);

    const inputRecherche = document.getElementById('chercheRecette');
    inputRecherche.addEventListener('keypress', (e) => {
        if (e.key === 'Enter'){
            const inputRecherche = document.getElementById('chercheRecette');
            if (inputRecherche.value.length > 2){
                let data = inputRecherche.value.split(',');
                data.forEach(mot => {
                    mot = mot.trim();
                    if (!filtres.includes(mot)){
                        filtres.push(mot);
                        createTag(mot);
                    }
                });
                inputRecherche.value = '';
        
                document.dispatchEvent(filtreEvent);
            }
        }
    })
});

document.addEventListener('filtreEvent', () => {
    let recipesFiltre = [];

    recipes.forEach(recipe => {
        let valide = true;
        recipeRecette = JSON.stringify(recipe).toLowerCase();
        filtres.forEach(filtre => {
            if (valide == true){
                filtre = filtre.toLowerCase();
                if (recipeRecette.includes(filtre)) {
                    if (!recipesFiltre.includes(recipe)){
                        recipesFiltre.push(recipe);
                    }
                }else{
                    if (recipesFiltre.includes(recipe)){
                        recipesFiltre = recipesFiltre.filter(item => item !== recipe);
                    }

                    valide = false;
                }
            }
        })
    });

    if (filtres.length !== 0){
        if (recipesFiltre.length !== 0){
            const divRecettes = document.getElementById('recettes');
            divRecettes.innerHTML = '';
    
            recipesFiltre.forEach(recipe => {
                let newCard = createCard(recipe);
                divRecettes.appendChild(newCard);
            });
    
            document.getElementById('nbRecettes').textContent = `${recipesFiltre.length} recettes`;
        }else{
            const divRecettes = document.getElementById('recettes');
            divRecettes.innerHTML = '<p>Aucune recette n\'a été trouvée</p>';
            document.getElementById('nbRecettes').textContent = `0 recettes`;
        }

    }else{
        const divRecettes = document.getElementById('recettes');
        divRecettes.innerHTML = '';

        recipes.forEach(recipe => {
            let newCard = createCard(recipe);
            divRecettes.appendChild(newCard);
        });

        document.getElementById('nbRecettes').textContent = `${recipes.length} recettes`;
    }
});

fetchRecipe();

