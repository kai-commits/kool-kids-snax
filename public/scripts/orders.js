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
    $('.orders-container').empty();
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
  const price = (orderDetail.price / 100).toFixed(2);

  return `
    <li>${orderDetail.name} <i>x${orderDetail.quantity} </i>- $${price}</li>
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
    console.log('order', order);

    if (order.active) {
      $('#open-orders').append(createOrderElement(order));
    } else {
      $('#closed-orders').append(createOrderElement(order));
    }

    loadOrderDetails(order.id);
    updateBtn(order.id);
  }
};

const updateBtn = (id) => {
  const btn = $(`[btn-id=${id}]`);

  $(btn).on('click', function() {
    const status_id = this.parentElement.firstElementChild.lastElementChild.value;
    const estimated_time_id = this.parentElement.firstElementChild.nextElementSibling.lastElementChild;
    const estimated_time_value = estimated_time_id.options[estimated_time_id.selectedIndex].text;

    const updateValues = { order_id: id, status_id, estimated_time_id: estimated_time_id.value, estimated_time_value };

    $.ajax('/order-update', {
      method: 'POST',
      data: updateValues
    })
    .then(() => {
      loadOrders();
    });

    $('#orderUpdated').modal('show');
  });
};

// Create the markup for orders
const createOrderElement = (orderData) => {
  const date = new Date(orderData.created_at).toDateString();
  const subtotal = (orderData.price / 100).toFixed(2);
  const tax = ((orderData.price / 100) * 0.05).toFixed(2);
  const totalPrice = (orderData.price / 100 * 1.05).toFixed(2);
  let completedDate = 'pending';
  if (orderData.completed_at) {
    completedDate = new Date(orderData.completed_at).toDateString();
  }

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
              <option value="3">In-Progress</option>
              <option value="4">Ready</option>
              <option value="5">Complete</option>
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

          <button class="button" btn-id=${orderData.id}>Update</button>

        </div>


      </div>

      <div class="total">
        <div class="total-titles">
          <div>Subtotal: $</div>
          <div>Tax: $</div>
          <div>Total: $</div>
        </div>
      <div class="total-num">
        <div> ${subtotal}</div>
        <div> ${tax}</div>
        <div> ${totalPrice}</div>
    </div>

      </div>

      <footer class="orders">
        <div>Order Created: ${date}</div>
        <div>Order Completed: ${completedDate} </div>
      </footer>


    </article>
  `);
};
