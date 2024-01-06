const featuredContainer = document.querySelector("#featured-container");
const pickContainer = document.querySelector("#pick-container");

let coffees = [];

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

  featuredContainer.innerHTML = "";

  coffees.slice(0, 3).forEach((item) => {
    addCardToContainer(item);
  });
}

function addCardToContainer(coffee) {
  const articleEl = document.createElement("article");
  articleEl.classList.add("featured-card");
  articleEl.innerHTML = `
   <figure class="h-64 object-cover">
    <img
      src=${coffee.image}
      alt='Shoes'
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
