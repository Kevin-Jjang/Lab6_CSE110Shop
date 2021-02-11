// Script.js

let localStorage = window.localStorage;
let cartList = [];
window.addEventListener('DOMContentLoaded', () => {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
      if(localStorage.getItem('data') == null) {
        localStorage.setItem('data', JSON.stringify(json))
      }
      else {
        console.log(localStorage.getItem('data'))
        console.log("data was already fetched")
      }

      if (localStorage.getItem('cart' != null)) {
        cartList = JSON.parse(localStorage.getItem('cart'));
        document.getElementById('cart-count').textContent = cartList.length;
      }

      let list = document.getElementById('product-list');

      for (let i = 0; i < json.length; i++) {
        let status;
        if (cartList.includes(json[i])) {
          status = 'Remove from Cart';
        }
        else {
          status = 'Add to Cart';
        }
        list.appendChild(new ProductItem(json[i].id, json[i].title,
          json[i].price, json[i].image, status))
      }
    })
});

