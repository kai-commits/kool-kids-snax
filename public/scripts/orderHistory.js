$(() => {
  loadOrderHistory();
});

const loadOrderHistory = () => {
  console.log('hi');
  $.get('/orderhistory')
    .then(res => {
      console.log(res.order_history)
      renderOrderHistory(res.order_history)
    })
};

const renderOrderHistory = (orderHistoryDb) => {
  for (const order of orderHistoryDb) {

    if (order.active) {
      $('#active-history').append(createOrderElement(order));
    } else {
      $('#inactive-history').append(createOrderElement(order));
    }
  }
}

const createOrderElement = (orderData) => {

  return `
    <article class="order-history">
      <div class="order-header">
        <div class="order-id">
            <h3>Order#: ${orderData.id}</h3>
        </div>
      </div>

      <div class="order-card">
          <div class="order-details">
            <ul class="details-list" order-id="${orderData.id}">
              <li>hi</li>
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
