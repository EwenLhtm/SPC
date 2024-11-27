import {createCard,getMotCle,ingredients,appareils,ustensiles} from "../js/script";

const dataTest =   [{
    "id": 1,
    "image": "Recette01.jpg",
    "name": "Limonade de Coco",
    "servings": 1,
    "ingredients": [
      {
        "ingredient": "Lait de coco",
        "quantity": 400,
        "unit": "ml"
      },
      {
        "ingredient": "Jus de citron",
        "quantity": 2
      },
      {
        "ingredient": "Crème de coco",
        "quantity": 2,
        "unit": "cuillères à soupe"
      },
      {
        "ingredient": "Sucre",
        "quantity": 30,
        "unit": "grammes"
      },
      {
        "ingredient": "Glaçons"
      }
    ],
    "time": 10,
    "description": "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
    "appliance": "Blender",
    "ustensils": [
      "cuillère à Soupe",
      "verres",
      "presse citron"
    ]
}]

/**
 * @jest-environment jsdom
 */
test('Création d\'une card', () => {
    const cardExample = document.createElement('div');
    cardExample.classList.add('card');
    cardExample.innerHTML = `<img src="/images/Recette01.jpg" alt="Limonade de Coco"><h2>Limonade de Coco</h2><p>Recette</p><p class="textRecette">Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée</p><p>Ingrédients</p><div class="ingredients"><div class="ingredient"><p class="nomIngredient">Lait de coco</p><p class="quantite">400 ml</p></div><div class="ingredient"><p class="nomIngredient">Jus de citron</p><p class="quantite">2</p></div><div class="ingredient"><p class="nomIngredient">Crème de coco</p><p class="quantite">2 cuillères à soupe</p></div><div class="ingredient"><p class="nomIngredient">Sucre</p><p class="quantite">30 grammes</p></div><div class="ingredient"><p class="nomIngredient">Glaçons</p><p class="quantite"></p></div></div>`;

    const card = createCard(dataTest[0]);

    expect(card).toStrictEqual(cardExample);
});

test('Récupération des mots clées', () => {
  let ingredientsTest = ["Lait de coco","Jus de citron","Crème de coco","Sucre","Glaçons"];
  let appareilsTest = ["Blender"];
  let ustensilesTest = ["cuillère à Soupe","verres","presse citron"];

  getMotCle(dataTest);

  expect(JSON.stringify(ingredients)).toBe(JSON.stringify(ingredientsTest));
  expect(JSON.stringify(appareils)).toBe(JSON.stringify(appareilsTest));
  expect(JSON.stringify(ustensiles)).toBe(JSON.stringify(ustensilesTest));
});
