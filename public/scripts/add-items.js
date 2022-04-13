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
};


// const addNewItem = () => {

//     $.post('/add-item/')
//       .then()
//     }
// };
