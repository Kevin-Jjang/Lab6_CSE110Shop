// product-item.js

class ProductItem extends HTMLElement {
  localStorage = window.localStorage;

  constructor(productId, productTitle, productPrice, productImg, status) {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});

    const product = document.createElement('li');
    product.setAttribute('class', 'product');

    const img = product.appendChild(document.createElement('img'));
    img.setAttribute('src', productImg);
    img.setAttribute('alt', productTitle);
    img.setAttribute('width', 200);

    const title = product.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');
    title.textContent = productTitle;

    const price = product.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    price.textContent = "$" + productPrice;
    
    const button = product.appendChild(document.createElement('button'));
    button.textContent = status;

    button.onclick = function() {
      let count = document.getElementById('cart-count');
      
      if(button.textContent == "Add to Cart") {
        cartList.push(productId);
        button.textContent = "Remove from Cart";
        alert('Added to Cart!');
      }
      else {
        cartList.splice(cartList.indexOf(productId), 1);
        button.textContent = "Add to Cart";
        alert('Removed from Cart!');
      }
      count.textContent = cartList.length;
      // console.log(cartList);
      // console.log(JSON.stringify(cartList));
      localStorage.setItem('cart', JSON.stringify(cartList));
    }


    let style = document.createElement('style');
    style.textContent = `.price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(product);
  }
}

customElements.define('product-item', ProductItem);