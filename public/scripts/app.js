/*
  Client-side operations. Loads menu-items and appends item to cart when selected on us.
*/

$(() => {
  loadItems();
  chkoutCartBtn();
});

// When a user clicks on the checkout button
let checkoutCart = {};
let cartItemNames = [];
let cartItemPrices = [];

const chkoutCartBtn = () => {
  // Order gets submitted and SMS is sent to restaurant
  $('.checkout-btn').on('click', function() {

    if(confirm('Are you sure you want to submit this order?')) {
      checkoutCart = {
        user_id: $('.user').attr('id'),
        items: cartItemNames,
        total_price: getTotalCartPrice(cartItemPrices)
      };
      $.ajax('/order_confirm/submit', {
        method: 'POST',
        data: checkoutCart
      })
      .then(() => {
        // Empty cart, reset global variables
        $('.cart-details').empty();
        $('.cart-subtotal-price').empty();
        $('.cart-tax-price').empty();
        $('.cart-total-price').empty();
        checkoutCart = {};
        cartItemNames = [];
        cartItemPrices = [];
      });

    }
  });
};

const getTotalCartPrice = (cartItemPrices) => {
  return cartItemPrices.map(el => {
    return Number(el.replace('$', '')) * 100;
  }).reduce((a, b) => a + b, 0);
};

const getItemQty = (cartItemNames) => {

};

const displayCartPrice = () => {
  // Display subtotal price of items in cart
  let subtotal = Math.round(getTotalCartPrice(cartItemPrices) / 100).toFixed(2);

  let tax = (getTotalCartPrice(cartItemPrices) / 100 * 0.05).toFixed(2);

  let total = (getTotalCartPrice(cartItemPrices) / 100 * 1.05).toFixed(2);


  $('.cart-subtotal-price').val(`$${subtotal}`);
  $('.cart-tax-price').val(`$${tax}`);
  $('.cart-total-price').val(`$${total}`);

}

// Produces item in cart when user adds menu item
const renderCartItems = (cartItemDetail) => {
  $('.cart-details').append(createCartItemDetail(cartItemDetail));
};

// Creates the markup that gets appended to the cart-details container
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

    displayCartPrice();

  });

};

// Loads menu items onto homepage
// Invokes the event listener for when user checkouts their cart
const loadItems = () => {
  $.ajax('/items', {
    method: 'GET'
  })
  .then((res) => {
    renderItems(res.items);
  });
};

// Appends the markup to the menu-items container
// Invokes the event listener for when user adds item to cart
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
