const listaProductos = document.querySelector(".lista-productos");
const listaCarrito = document.querySelector(".lista-carrito");
const vaciar = document.getElementById("vaciar");

const products = [
  {
    id: 1,
    name: "Tablette",
    price: 600,
  },
  {
    id: 2,
    name: "Pc Portatil",
    price: 1500,
  },
  {
    id: 3,
    name: "Cargador",
    price: 250,
  },
];

let cart = [];

function addToCart(id) {
  let product = products.find(function (product) {
    return product.id === id;
  });
  cart.push(product);
  renderCart();
  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(function (product) {
    return product.id !== id;
  });
  renderCart();
  saveCart();
}

function total() {
  let totalCart = cart.reduce(function (acc, product) {
    return acc + product.price;
  }, 0);
  return totalCart;
}

function clearCart() {
  cart = [];
  renderCart();
  saveCart();
}

function renderProducts() {
  listaProductos.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    let product = products[i];

    const div = document.createElement("div");
    const name = document.createElement("span");
    const price = document.createElement("span");
    const agregar = document.createElement("button");
    const eliminar = document.createElement("button");

    name.innerText = product.name + ": ";
    price.innerText = product.price + ": ";
    agregar.innerText = "Agregar al Carrito";
    eliminar.innerText = "Quitar del Carrito";

    div.appendChild(name);
    div.appendChild(price);
    div.appendChild(agregar);
    div.appendChild(eliminar);
    listaProductos.appendChild(div);

    agregar.addEventListener("click", function () {
      addToCart(product.id);
    });
    eliminar.addEventListener("click", function () {
      removeFromCart(product.id);
    });
  }
}
renderProducts();

function renderCart() {
  listaCarrito.innerHTML = "";
  for (let i = 0; i < cart.length; i++) {
    let product = cart[i];

    const div = document.createElement("div");
    const name = document.createElement("span");
    const price = document.createElement("span");
    const borrar = document.createElement("button");

    name.innerText = product.name + ": ";
    price.innerText = product.price + ": ";
    borrar.innerText = "Quitar del Carrito";

    div.appendChild(name);
    div.appendChild(price);
    div.appendChild(borrar);
    listaCarrito.appendChild(div);

    borrar.addEventListener("click", function () {
      removeFromCart(product.id);
    });
  }
  document.getElementById("total").innerText = total();
}
renderCart();

vaciar.addEventListener("click", function () {
  clearCart();
});

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function chargeCart() {
  const data = localStorage.getItem("cart");
  if (data) {
    cart = JSON.parse(data);
  }
  renderCart();
}
chargeCart();
