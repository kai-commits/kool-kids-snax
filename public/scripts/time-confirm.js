$(function() {
  $('.checkout-btn').click(function () {
    $.ajax("/checkoutOrder/", {
      method: "post"
    })
  });
});
