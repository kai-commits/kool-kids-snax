const loadOrders = () => {
  $.ajax('/orders', {
    method: 'GET'
  })
  .then((res) => {
    renderOrders(res.orders);
  });
};

const loadOrderDetails = (id) => {
  $.get(`/orders/${id}`)
    .then(res => {
      // console.log(`${id}: `, res.order_details);
      renderOrderDetails(res.order_details);
    })
};

const createOrderDetailsElement = (orderDetail) => {
  // console.log('orderDetail', orderDetail);

  return `
    <li>${orderDetail.name}</li>
  `
}

const renderOrderDetails = (orderDetailsData) => {

  for (const orderDetail of orderDetailsData) {
    // console.log('inside loop', orderDetail);
    $(`[order-id=${orderDetail.order_id}]`).append(createOrderDetailsElement(orderDetail));
  }

};

const renderOrders = (ordersDatabase) => {
  for (const order of ordersDatabase) {
    $('.orders-container').append(createOrderElement(order));
    loadOrderDetails(order.id);
    // console.log(order.id);
  }
};

const createOrderElement = (orderData) => {
  // console.log('orderData', orderData.id);
  return $(`
    <article class="order-container">
      <div class="order-header">
        <div class="order-id">
          <h3>Order#: ${orderData.id}</h3>
        </div>
      </div>

      <div class="order-card">
        <div class="order-details">
          <ul class="details-list" order-id="${orderData.id}">
          </ul>
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
