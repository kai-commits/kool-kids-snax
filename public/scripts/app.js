/*
  Client-side operations. Loads menu-items and appends item to cart when selected on us.
*/

$(() => {
  loadItems();
  chkoutCartBtn();
  clearCartLink();
});

// When a user clicks on the checkout button
let checkoutCart = {};
let cartItemDetails = [];
let cartItemPrices = [];

const viewOrderStatusBtn = () => {
  // Redirect to user order history
  $('#view-order-status').on('click', function() {
    document.location.href = '/order_history';
  });
};

// Function that empties cart
const clearCart = () => {
  $('.cart-details').empty();
  $('.cart-subtotal-price').empty();
  $('.cart-tax-price').empty();
  $('.cart-total-price').empty();
  checkoutCart = {};
  cartItemDetails = [];
  cartItemPrices = [];
};

const chkoutCartBtn = () => {
  // Order gets submitted and SMS is sent to restaurant
  $('#checkout-btn').on('click', function() {

    $('#confirmChkout').modal('show');

    $('#confirmBtn').on('click', function() {
      checkoutCart = {
        user_id: $('.user').attr('data-user'),
        items: getItemDetails(cartItemDetails),
        total_price: getTotalCartPrice(cartItemPrices)
      };

      if (checkoutCart.items.length === 0) {
        $('#confirmChkout').modal('toggle');
        $('#errorChkout').modal('show');

      } else {
        $.ajax('/order_confirm/submit', {
          method: 'POST',
          data: checkoutCart
        })
          .then(() => {

            // Empty cart, reset global variables
            clearCart();
            $('#confirmChkout').modal('toggle');

            // Display notice that order was placed and to view order status
            $('#orderPlaced').modal('show');
            viewOrderStatusBtn();
          });
      }
    });

    // Allow user to cancel the order confirm
    $('#cancelBtn').on('click', function() {
      $('#confirmChkout').modal('toggle');
    });
  });
};

// Empty cart when button clicked
const clearCartLink = () => {
  $('#cart-clear-link').on('click', function() {
    clearCart();
  });
};

const getTotalCartPrice = (cartItemPrices) => {
  return cartItemPrices.map(el => {
    return Number(el.replace('$', '')) * 100;
  }).reduce((a, b) => a + b, 0);
};

const getItemDetails = (cartItemDetails) => { // receives array of item objects
  const result = [];
  for (const item of cartItemDetails) {
    const quantity = cartItemDetails.filter(el => el.id === item.id).length; // number of times that item appears in array
    result.push(JSON.stringify({id: item.id, name: item.name, price: item.price, quantity: quantity})); // push new item object with quantity property
  }
  const set = [...new Set(result)]; // returns only unique items in array

  const formattedSet = [...set].map((item) => { // converts json strings back into item objects
    return JSON.parse(item);
  });
  return formattedSet;
};


const displayCartPrice = () => {
  // Display subtotal price of items in cart
  const subtotal = Math.round(getTotalCartPrice(cartItemPrices) / 100).toFixed(2);
  const tax = (getTotalCartPrice(cartItemPrices) / 100 * 0.05).toFixed(2);
  const total = (getTotalCartPrice(cartItemPrices) / 100 * 1.05).toFixed(2);


  $('.cart-subtotal-price').val(`$${subtotal}`);
  $('.cart-tax-price').val(`$${tax}`);
  $('.cart-total-price').val(`$${total}`);
};

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

  `;
};


// Add items to cart when user clicks on the add-button
const addItemCartDetail = () => {

  $('.menu-item-add').on('click', function() {
    const cart_detail = {};
    const name = (this.nextElementSibling.innerText);
    const price = (this.parentElement.nextElementSibling.innerText);
    const id = (this.nextElementSibling.id);

    cart_detail.name = name;
    cart_detail.price = price;
    cartItemDetails.push({id, name, price});
    cartItemPrices.push(price);

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
    switch (item.menu_group_id) {
    case (1):
      $('#main-dishes').append(createItemElement(item));
      break;

    case (2):
      $('#appetizers').append(createItemElement(item));
      break;

    case (3):
      $('#desserts').append(createItemElement(item));
      break;

    case (4):
      $('#drinks').append(createItemElement(item));
      break;
    }
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
        <div class="item-name" id="${itemData.id}">${itemData.name}</div>
      </div>
      <div class="item-price">
        $${item_price}
      </div>

    </div>
    <div class="item-description">
      <p>${itemData.description}</p>
    </div>
  </div>
`);
};
