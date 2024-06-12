const $iconcar = document.getElementById("iconbtn");
const $car = document.querySelector(".container__car")
const $cards = document.querySelectorAll(".card__text");


let shoppingCar = [];



$cards.forEach(card =>{
  card.addEventListener("click", e =>{
    if(e.target.classList.contains("btnAgg")){
      aggProduct(makeProduct(card))
    }
  })
})


$iconcar.addEventListener("click",()=>{
  $car.classList.toggle("unsee");
  if(!$car.classList.contains("unsee")){
    deleteItem()
    updateCount()
  }
})

function aggProduct (product){
  const productExist = shoppingCar.find(Element => Element.id === product.id);
  if(productExist){
    productExist.cant++;
    updateItemDOM(productExist);
    updateCount()
  }else{
    shoppingCar.push(product);
    makeitemDOM(product);
    updateCount();
  }
}

function makeProduct (card){
  let id = card.children[0].textContent;
  id = parseInt(id)

  let price = card.children[3].textContent;
  price = price.substring(1);
  price = parseInt(price);

  let cant = card.children[1].textContent;
  cant = parseInt(cant);

  let product = {
    id: id,
    cant: cant,
    name: card.children[2].textContent,
    price: price
  }
  return product
}

function makeitemDOM (product){
  const div = document.createElement("div");
  div.setAttribute("itemId", `${product.id}`);
  div.classList.add("item__car");
  div.innerHTML = `<span>${product.cant}</span>
  <h3>${product.name}</h3>
  <p>$ <span>${product.price}</span></p>
  <span class="material-symbols-outlined close">close</span>`;

  $car.appendChild(div);
}

function updateItemDOM (product){
  const itemDOM = document.querySelector(`div[itemId = "${product.id}"]`);
  itemDOM.children[0].textContent = product.cant;
  itemDOM.children[2].textContent = product.cant * product.price;
}


function deleteItem(){
  const items = document.querySelectorAll(".item__car");
  items.forEach( item =>{
    item.addEventListener("click", e=>{
      const idItem = shoppingCar.findIndex(Element => Element.id == item.attributes[0].value)
      if(e.target.classList.contains("close")){
        if (idItem > -1) {
          shoppingCar.splice(idItem, 1);
          item.remove();
          updateCount();
        }
      }
    })
  })
}

function updateCount(){
  const counter = document.querySelector(".counter");
  let cant = 0;
  shoppingCar.forEach(item =>{
    cant = cant + item.cant 
  })
  counter.textContent = cant
}