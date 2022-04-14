/*
  Scripts to add new menu items
*/

$(() => {
  launchAddForm();
});

// Launch add item form when button is clicked
const launchAddForm = () => {
  $('#add-new-item-btn').on('click', function() {
    $('#add-new-item').modal('show');
    $('#add-item-name').focus();
  });

  addItem();
};

// Invoke event listener for the add item button
const addItem = () => {
  $('#add-item-btn').on('click', function() {

    const name = document.getElementById('add-item-name').value;
    const desc = document.getElementById('add-item-desc').value;
    const img = document.getElementById('add-item-img').value;
    const group = document.getElementById('add-item-menu-group').value;
    const price = document.getElementById('add-item-price').value;

    const newItem = { name, desc, price, img, group };

    // Call POST request to insert new menu item to items table
    addNewItem(newItem);

    // Clear form values
    $('#add-item-name').val('');
    $('#add-item-desc').val('');
    $('#add-item-img').val('');
    $('#add-item-menu-group').val('Choose...');
    $('#add-item-price').val('');
  })
}

// Ajax post request to insert new item into table
const addNewItem = (newItem) => {
  $.post('/add-item', newItem)
    .then(() => {
      // Inform user that menu item has been successfully added
      $('#add-new-item').modal('toggle');
      $('#itemAdded').modal('show');
    })
    .catch(() => {
      $('#add-new-item').modal('toggle');
      $('#itemNotAdded').modal('show');
    })

};
