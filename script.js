// function for creating element,add an innertext to that element and append it.
// Utility Functions
function eleCreator(elementName, text, wrapper, className) {
  const x = document.createElement(`${elementName}`);
  x.innerText = text;
  wrapper.appendChild(x);
  x.setAttribute("class", className)
  return x;
}

// inputs:
const url = "https://makeup-api.herokuapp.com/api/v1/products.json";

let currentPage = 1;
const productsPerPage = 100;
let items = [];

// fetch api data
async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    items = [...data];
  }
  renderPage(items, cardsContainer, currentPage, productsPerPage);
}
getData();

// Container:
const container = eleCreator("div", null, document.body, "container");
// Header:
const header = eleCreator("header", null, container, "header");
const heading = eleCreator("h1", "MakeUp Top Picks", header, "heading");
//  Filter
const filter = eleCreator("div", null, container, "filter");


// pagination and cards container
const pagination = eleCreator("div", null, filter, "pagination");
const cardsContainer = eleCreator("div", null, container, "cards");


//Pagination Button creation
function pagiBtn(page, items) {
  let btn = document.createElement("button");
  if (page === 1) {
    btn.innerText = "First";
  }
  else if (page === 10) {
    btn.innerText = "Last";
  }
  else {
    btn.innerText = page;
    btn.classList.add("page-num");
    const pagiBtn1 = btn.querySelector("page-num");
    pagiBtn1.addEventListener("click", function () {
      currentPage = page;
      renderPage(items, cardsContainer, productsPerPage, currentPage);
    });
  }
  return btn;
}

// To setup a pagination
function setupPagination(items = [], wrap, productsPerPage, page) {
  wrap.innerHTML = "";
  let btns = [];
  let btn = document.createElement("button");
  btn.classList.add("prev");
  btn.innerText = "Prev";
  btn.addEventListener("click", () => {
    renderPage(items, cardsContainer, productsPerPage, currentPage - 1)
  })
  btns.push(btn)
  let pageNum = Math.ceil(items.length / productsPerPage);
  for (let k = 1; k < pageNum + 1; k++) {
    let pageBtn = pagiBtn(k, items);
    btns.push(pageBtn)
  }
  let btn1 = document.createElement("button");
  btn1.innerText = "Next";
  btn1.classList.add("next");
  btn1.addEventListener("click", () => {
    renderPage(items, cardsContainer, productsPerPage, currentPage + 1)
  })
  btns.push(btn1);
  wrap.append(...btns)
}

// To create a card

function createCard(data = {}) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  const cardImg = document.createElement("img");
  const productName = document.createElement("h2");
  const brandName = document.createElement("h2");
  const productDesc = document.createElement("p");
  const rate = document.createElement("div");
  rate.setAttribute("class", "priceTag")
  const cost = document.createElement("h3");
  const currencySymbol = document.createElement("h4");
  rate.appendChild(currencySymbol);
  rate.appendChild(cost);
  const productLink = document.createElement("a")
  const { image_link = "", name = "", brand = "", description = "", price = "", price_sign = "", product_link = "" } = data;
  cardImg.setAttribute("src", image_link);
  productName.innerText = name;
  brandName.innerText = brand;
  productDesc.innerText = description;
  cost.innerText = price;
  currencySymbol.innerText = price_sign;
  productLink.setAttribute("href", product_link);
  productLink.innerText = "Product Page";
  card.append(cardImg, productName, brandName, productDesc, rate, productLink)
  return card;
}


// To render a page
function renderPage(data = [], wrapper, page, productsPerPage) {
  page--;
  let start = page * productsPerPage;
  let end = start + productsPerPage;
  let cards = [];
  for (let i = start; i < end; i++) {
    let y = createCard(data[i])
    cards.push(y);
  }
  wrapper.innerHTML = "";
  wrapper.append(...cards);
}
renderPage(items, cardsContainer, productsPerPage, currentPage)
setupPagination(items, pagination, productsPerPage, currentPage)
