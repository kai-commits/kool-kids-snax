$(() => {
  $('.menu-item-add').on('click', function(e) {
    e.preventDefault();
  });
});

const addToCart = () => {
  $.ajax('/cart', {
    method: 'POST',
    data: $(this).serialize()
  })
  .then((res) => {
    console.log(res);
  });
}
