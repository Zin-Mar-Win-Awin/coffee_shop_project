const featuredContainer = document.querySelector("#featured-container");
const pickContainer = document.querySelector("#pick-container");
const badgeContainer = document.querySelector("#badge-container");

let coffees = [];
let ingredients = [
  "Coffee",
  "Espresso",
  "Steamed Milk",
  "Foam",
  "Hot Water",
  "1oz Espresso",
  "2oz Espresso",
  "1oz Steamed Milk",
  "Foamed milk",
  "Long pulled espresso",
];

badgeContainer.addEventListener("click", (event) => {
  const clickedBtn = event.target.closest(".custom-badge");
  const selectedIngredient = clickedBtn.textContent;
  const filteredCoffees = coffees.filter((item) =>
    item.ingredients.includes(selectedIngredient)
  );

  loadCoffeesToUI(filteredCoffees);
});

window.addEventListener("DOMContentLoaded", () => {
  featuredContainer.innerHTML = `
    <div class="shadow rounded-sm p-4 max-w-sm w-full mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-200 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-slate-200 rounded col-span-2"></div>
          <div class="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
</div>
  `;
  getCoffee();
});

async function getCoffee() {
  const res = await fetch("https://api.sampleapis.com/coffee/hot");
  const data = await res.json();
  coffees = data;

  loadCoffeesToUI(coffees);

  ingredients.forEach((item) => {
    const buttonEl = document.createElement("button");
    buttonEl.classList.add("custom-badge");
    buttonEl.textContent = item;
    badgeContainer.appendChild(buttonEl);
  });
}

function loadCoffeesToUI(coffeesToLoad) {
  featuredContainer.innerHTML = "";

  coffeesToLoad.forEach((item) => {
    addCardToContainer(item);
  });
}

function addCardToContainer(coffee) {
  const articleEl = document.createElement("article");
  articleEl.classList.add("featured-card");
  articleEl.innerHTML = `
   <figure class="h-52 object-cover">
    <img
      src=${coffee.image}
      alt=${coffee.title}
      loading="lazy"
    />
  </figure>
  <div class='card-body'>
    <h2 class='card-title'>
      ${coffee.title}
      <div class='badge badge-secondary'>Hot</div>
    </h2>
    <p>
      ${coffee.description}
    </p>
    <div class='card-actions justify-end'>
      <div class='badge badge-outline'>${coffee.ingredients[0]}</div>
    </div>
  </div>
`;
  featuredContainer.appendChild(articleEl);
}
