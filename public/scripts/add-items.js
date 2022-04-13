$(() => {

});


const addNewItems = () => {
  $('.add_new_item').on('click', function() {
  })
  .then(() => {
    $('#add-new-item').modal('show');

    $.ajax('/add-item/', {
    method: 'POST'

      });
    }
  });
};
