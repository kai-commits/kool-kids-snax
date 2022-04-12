/*
  Client-side operations. Performs all orders functions for Restaurant views.
*/

$(() => {
  loadOrders();
});

// Dynamically loads orders from SQL database
const loadOrders = () => {
  $.ajax('/orders', {
    method: 'GET'
  })
  .then((res) => {
    renderOrders(res.orders);
  });
};

// Retrieve order details pertaining to order_id
const loadOrderDetails = (id) => {
  $.get(`/orders/${id}`)
    .then(res => {
      renderOrderDetails(res.order_details);
    })
};

// Create markup for each item in the order detail list
const createOrderDetailsElement = (orderDetail) => {
  return `
    <li>${orderDetail.name} <i>x${orderDetail.quantity}</i></li>
  `
}

// Append the order-detail line markup to the order-id container
const renderOrderDetails = (orderDetailsData) => {
  for (const orderDetail of orderDetailsData) {
    $(`[order-id=${orderDetail.order_id}]`).append(createOrderDetailsElement(orderDetail));
  }

};

// Append the order markup to the orders container
const renderOrders = (ordersDatabase) => {
  for (const order of ordersDatabase) {
    $('.orders-container').append(createOrderElement(order));
    loadOrderDetails(order.id);
    updateBtn(order.id);
  }
};

const updateBtn = (id) => {
  const btn = $(`[btn-id=${id}]`);
  $(btn).on('click', function() {
    console.log(id);
  });
};

// Create the markup for orders
const createOrderElement = (orderData) => {
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
              <option value="1">Pending</option>
              <option value="2">Received</option>
              <option value="3">Ready for Pick up</option>
              <option value="4">Fulfilled</option>
            </select>
          </div>

          <div class="order-time">
            <label for="order-time">Estimated Time:</label>
            <select name="order-time">
              <option value="1">15 minutes</option>
              <option value="2">25 minutes</option>
              <option value="3">30 minutes</option>
              <option value="4">45 minutes</option>
              <option value="5">60 minutes</option>
            </select>
          </div>

          <button class="update-btn" btn-id=${orderData.id}>Update</button>

        </div>

      </div>


    </article>
  `);
};
