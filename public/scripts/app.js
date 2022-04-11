/*
  Client-side operations. Loads menu-items and appends item to cart when selected.
*/

$(() => {
  loadItems();

  $('.cart-checkout-button').on('click', function() {
    let checkoutCart = {
      user_id: $('.user').attr('id'),
      items: cartItemNames,
      total_price: getTotalCartPrice(cartItemPrices)
    };
    $.ajax('/checkoutOrder/submit', {
      method: 'POST',
      data: checkoutCart
    })
    .then(() => {

    });
  });
});

let cartItemNames = [];
let cartItemPrices = [];

const getTotalCartPrice = (cartItemPrices) => {
  return cartItemPrices.map(el => {
    return Number(el.replace('$', '')) * 100;
  }).reduce((a, b) => a + b, 0);
}



const renderCartItems = (cartItemDetail) => {
  $('.cart-details').append(createCartItemDetail(cartItemDetail));
};

const createCartItemDetail = (cartItem) => {

  const itemName = cartItem.name;
  const itemPrice = cartItem.price;

  return `
    <article class="item-detail">

      <div class="cart-item-name">
        ${itemName}
      </div>

      <div class="cart-item-price">
        ${itemPrice}
      </div>

    </article>

  `
}


// Add items to cart when user clicks on the add-button
const addItemCartDetail = () => {

  $('.menu-item-add').on('click', function() {
    // let checkoutCart = [];
    const cart_detail = {};
    const name = (this.nextElementSibling.innerText);
    const price = (this.parentElement.nextElementSibling.innerText);
    // cart_detail.user_id = $('.user').attr('id');
    cart_detail.name = name;
    cart_detail.price = price;
    cartItemNames.push(name);
    cartItemPrices.push(price);

    // checkoutCart.push(cart_detail);

    renderCartItems(cart_detail);
  });


};

const loadItems = () => {
  $.ajax('/items', {
    method: 'GET'
  })
  .then((res) => {
    renderItems(res.items);
  });
};

const renderItems = (itemsDatabase) => {
  for (const item of itemsDatabase) {
    $('.menu-items').append(createItemElement(item));
  }
  addItemCartDetail();
};

const createItemElement = (itemData) => { // Dynamically creates new items from template.

  const item_price = Math.round(itemData.price / 100).toFixed(2);

  return $(`
  <div class="item-container">
  <div class="item-img-container">
    <img class="item-img" src="${itemData.url_thumb_photo}">
  </div>

  <div class="item-header">
    <div class="item-title">
      <span class="menu-item-add">
        <i class="fa-solid fa-circle-plus"></i>
      </span>
      <div class="item-name">${itemData.name}</div>
    </div>
    <div class="item-price">
      $${item_price}
    </div>

  </div>
  <div class="item-description">
    <p>${itemData.description}</p>
  </div>
`)
};
