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
      // else {
      //   console.log(localStorage.getItem('data'))
      //   console.log("Data was already fetched")
      // }

      if (localStorage.getItem('cart') != null) {
        // console.log("Cart had items.");
        // console.log(localStorage.getItem('cart'));
        cartList = JSON.parse(localStorage.getItem('cart'));
        document.getElementById('cart-count').textContent = cartList.length;
      } 
      // else {
      //   console.log("Cart was empty.");
      // }

      let list = document.getElementById('product-list');

      for (let i = 0; i < json.length; i++) {
        let status;
        if (cartList.includes(json[i].id)) {
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

