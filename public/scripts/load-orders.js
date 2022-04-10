const loadOrders = () => {
  $.ajax('/all', {
    method: 'GET'
  })
  .then((res) => {
    renderOrders(res.all);
  });
};

const renderOrders = (ordersDatabase) => {
  for (const order of ordersDatabase) {
    $('.orders-container').append(createOrderElement(order));
  }
};

const createOrderElement = (orderData) => {
  console.log(orderData);
  return $(`
  <article class="order-container">
  <div class="order-header">
    <div class="order-id">
      <h3>Order#: ${orderData.id}</h3>
    </div>
  </div>

  <div class="order-card">
    <div class="order-details">
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <div class="order-price">Total_price</div>
    </div>

    <div class="order-edit">
      <div class="order-status">
        <label for="order-status">Order Status:</label>
        <select name="order-status" id="order-status">
          <option value="pending">Pending</option>
          <option value="received">Received</option>
          <option value="ready">Ready for Pick up</option>
          <option value="complete">Fulfilled</option>
        </select>
      </div>

      <div class="order-time">
        <label for="order-time">Estimated Time:</label>
        <select name="order-time">
          <option value="fifteen">15 minutes</option>
          <option value="twenty-five">25 minutes</option>
          <option value="forty-five">45 minutes</option>
          <option value="sixty">60 minutes</option>
        </select>
      </div>

    </div>

  </div>


</article>
  `);
};
