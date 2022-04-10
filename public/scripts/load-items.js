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
      <a href="#"><span class="menu-item-add"><i class="fa-solid fa-circle-plus"></i></span></a>
      <div class="item-name">${itemData.name}</div>
    </div>
    <div class="item-price">
      $${item_price}
    </div>

  </div>
  <div class="item-description">
    <p>${itemData.description}</p>
  </div>
  `);
};
