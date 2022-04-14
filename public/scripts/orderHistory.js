$(() => {
  loadOrderHistory();
});

// Retrieve  all orders belonging to the user_id
const loadOrderHistory = () => {
  $.get('/orderhistory')
    .then(res => {
      renderOrderHistory(res.order_history);
    });
};

const loadOrderHistoryDetails = (id) => {
  $.get(`orderhistory/${id}`)
    .then(res => {
      renderOrderDetails(res.order_details);
    });
};

const createOrderDetailsElement = (orderDetail) => {
  const price = (orderDetail.price / 100 * orderDetail.quantity).toFixed(2);

  return `
  <li>${orderDetail.name} <i>x${orderDetail.quantity}</i> - $${price}</li>
  `;
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
};

const createOrderElement = (orderData) => {

  const subtotal = (orderData.price / 100).toFixed(2);
  const tax = ((orderData.price / 100) * 0.05).toFixed(2);
  const totalPrice = (orderData.price / 100 * 1.05).toFixed(2);

  const date = moment(orderData.created_at).format('ddd ll @ LT');
  let completedDate = 'Pending';
  if (orderData.completed_at) {
    completedDate = moment(orderData.completed_at).format('ddd ll @ LT');
  }

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
          <h6>Estimated time: ${orderData.time}</h6>
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
  `;
};
