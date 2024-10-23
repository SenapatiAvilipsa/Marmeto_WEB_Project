document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
 

    // Fetch cart data from API
    fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889')
        .then(response => response.json())
        .then(data => {
            const items = data.items;
            let subtotal = 0;

            // Loop through each item and create cart item elements
            items.forEach(item => {
                const itemSubtotal = item.price * item.quantity;

                // Create cart item HTML
              // Create cart item HTML with delete button
const cartItemHTML = `
<tr class="cart-item">
    <td><img src="${item.image}" alt="${item.title}"> ${item.title}</td>
    <td>Rs. ${(item.price / 100).toFixed(2)}</td>
    <td><input type="number" value="${item.quantity}" min="1" class="quantity-input"></td>
    <td>Rs. ${(itemSubtotal / 100).toFixed(2)}</td>
    <td><button class="delete-btn">🗑️</button></td> <!-- Delete Button -->
</tr>
`;


                cartItemsContainer.innerHTML += cartItemHTML;
                subtotal += itemSubtotal;
            });
            // Add event listeners for delete buttons
const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Remove the cart item from the DOM
        button.closest('.cart-item').remove();

        // Update subtotal and total
        const itemSubtotal = items[index].price * items[index].quantity;
        subtotal -= itemSubtotal; // Decrease subtotal by the item's subtotal

        // Update totals in the cart totals section
        subtotalElement.textContent = `Rs. ${(subtotal / 100).toFixed(2)}`;
        totalElement.textContent = `Rs. ${(subtotal / 100).toFixed(2)}`;
    });
});


            // Update subtotal and total in the cart totals section
            subtotalElement.textContent = `Rs. ${(subtotal / 100).toFixed(2)}`;
            totalElement.textContent = `Rs. ${(subtotal / 100).toFixed(2)}`;

            // Add event listeners for quantity change
            document.querySelectorAll('.quantity-input').forEach((input, index) => {
                input.addEventListener('change', (e) => {
                    const newQuantity = e.target.value;
                    const itemPrice = items[index].price;
                    const newSubtotal = newQuantity * itemPrice;

                    // Update subtotal for this item
                    const itemElement = e.target.parentElement.nextElementSibling;
                    itemElement.textContent = `Rs. ${(newSubtotal / 100).toFixed(2)}`;

                    // Update total
                    const newTotal = Array.from(document.querySelectorAll('.quantity-input'))
                        .reduce((acc, input, idx) => acc + (input.value * items[idx].price), 0);

                    subtotalElement.textContent = `Rs. ${(newTotal / 100).toFixed(2)}`;
                    totalElement.textContent = `Rs. ${(newTotal / 100).toFixed(2)}`;
                });
            });
        })
        .catch(error => console.error('Error loading cart data:', error));

    checkoutBtn.addEventListener('click', () => {
        // Handle the checkout process here
        const total = parseFloat(totalElement.textContent.replace('Rs. ', ''));
        
        if (total > 0) {
            alert('Proceeding to checkout with total: Rs. ' + total.toFixed(2));
        } else {
            alert('Your cart is empty. Please add items before checking out.');
        }
    });
});
