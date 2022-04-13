/*
  Scripts to add new menu items
*/

$(() => {
  launchAddForm();
});

const launchAddForm = () => {
  $('#add-new-item-btn').on('click', function() {
    console.log('clicked');

    $('#add-new-item').modal('show');
  });

  addItem();
};

const addItem = () => {
  $('#add-item-btn').on('click', function() {
    console.log('add item clicked');

    // Call POST to insert new item
  })
}


// const addNewItem = () => {

//     $.post('/add-item/')
//       .then()
//     }
// };
