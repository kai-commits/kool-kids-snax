/*
  Client-side operations. Loads menu-items and appends item to cart when selected.
*/

$(() => {
  loadItems();
});

const displayCart = () => {

}


// Add items to cart when user clicks on the add-button
const addItemToCart = (res) => {
  $('.menu-item-add').on('click', function() {

    console.log('click');
    console.log(res);
  });
};

const loadItems = () => {
  $.ajax('/items', {
    method: 'GET'
  })
  .then((res) => {
    renderItems(res.items);
    addItemToCart(res);
  });
};

const renderItems = (itemsDatabase) => {
  for (const item of itemsDatabase) {
    $('.menu-items').append(createItemElement(item));
  }
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
