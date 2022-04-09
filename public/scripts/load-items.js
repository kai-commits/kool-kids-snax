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
    $('body').append(createItemElement(item));
  }
};

const createItemElement = (itemData) => { // Dynamically creates new items from template.
  return $(`
    <h1> hello </h1>
  `);
};
