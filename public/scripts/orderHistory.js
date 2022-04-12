$(() => {
  loadOrderHistory();
});

// Retrieve  all orders belonging to the user_id
const loadOrderHistory = () => {
  $.get('/orderhistory')
    .then(res => {
      renderOrderHistory(res.order_history)
    })
};

const loadOrderHistoryDetails = (id) => {
  $.get(`orderhistory/${id}`)
    .then(res => {
      renderOrderDetails(res.order_details);
    })
}

const createOrderDetailsElement = (orderDetail) => {

  return `
  <li>${orderDetail.name} <i>x${orderDetail.quantity}</i></li>
  `
};

const renderOrderDetails = (orderDetails) => {
  for (const detail of orderDetails) {
    $(`[order-id=${detail.order_id}]`).append(createOrderDetailsElement(detail));
  }
};

const renderOrderHistory = (orderHistoryDb) => {
  for (const order of orderHistoryDb) {
    if (order.active) {
      // If order is active, append to the active orders container
      $('#active-history').append(createOrderElement(order));
    } else {
      $('#inactive-history').append(createOrderElement(order));
    }
    loadOrderHistoryDetails(order.order_id);
  }
}

const createOrderElement = (orderData) => {

  return `
    <article class="order-history">
      <div class="order-header">
        <div class="order-id">
            <h3>Order#: ${orderData.order_id}</h3>
        </div>
      </div>

      <div class="order-card">
          <div class="order-details">
            <ul class="details-list" order-id="${orderData.order_id}">
            </ul>
          </div>

        <div class="order-status">
          <h6>Status: ${orderData.name}</h6>
          <h6>Estimated time: ${orderData.time} minutes</h6>
        </div>
      </div>

    </article>
  `
}
