document.addEventListener('DOMContentLoaded', () => {
    // All quantity inputs and buttons for each product
    const allQuantityInputs = document.querySelectorAll('.quantity-input');
    const allPlusButtons = document.querySelectorAll('.plus-btn');
    const allMinusButtons = document.querySelectorAll('.minus-btn');
    const allDeleteButtons = document.querySelectorAll('.delete-btn');
    const allLikeButtons = document.querySelectorAll('.like-btn');
    const totalPriceElement = document.getElementById('total-price');
    const itemCountElement = document.getElementById('item-count');
    const likeCountElement = document.getElementById('like-count');

    let totalPrice = 0;
    let itemCount = 0;
    let likeCounter = 0;

    // Calculates total price and counts item in cart
    const updateTotalPriceAndCount = () => {
        totalPrice = 0;
        itemCount = 0;
        document.querySelectorAll('.class-items').forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent);
            const quantity = parseInt(item.querySelector('.quantity-input').value);
            totalPrice += price * quantity;
            itemCount += quantity;
        });
        totalPriceElement.textContent = `N${totalPrice}`;
        itemCountElement.textContent = itemCount;
    };

    // Updates the like counter
    const updateLikeCounter = () => {
        likeCountElement.textContent = likeCounter;
    };

    // Increases quantity
    allPlusButtons.forEach((plusBtn, index) => {
        plusBtn.addEventListener('click', () => {
            let quantityInput = allQuantityInputs[index];
            let currentQuantity = parseInt(quantityInput.value);
            currentQuantity++;
            quantityInput.value = currentQuantity;
            updateTotalPriceAndCount();
        });
    });

    // Decreases quantity
    allMinusButtons.forEach((minusBtn, index) => {
        minusBtn.addEventListener('click', () => {
            let quantityInput = allQuantityInputs[index];
            let currentQuantity = parseInt(quantityInput.value);
            if (currentQuantity > 1) {
                currentQuantity--;
                quantityInput.value = currentQuantity;
                updateTotalPriceAndCount();
            }
        });
    });

    // Deletes item from cart
    allDeleteButtons.forEach((deleteBtn, index) => {
        deleteBtn.addEventListener('click', () => {
            const cartItem = deleteBtn.closest('.class-items');
            cartItem.remove();  // Remove the entire item from the cart
            updateTotalPriceAndCount();
        });
    });

    // Like Button
    allLikeButtons.forEach((likeBtn, index) => {
        likeBtn.addEventListener('click', () => {
            let heartIcon = likeBtn.querySelector('.heart-icon');
            heartIcon.classList.toggle('liked');

            if (heartIcon.classList.contains('liked')) {
                likeCounter++;
            } else {
                likeCounter--;
            }

            updateLikeCounter();
        });
    });
    

    // Calculates the total price when the page reloads using the DOMcontent Reload
    updateTotalPriceAndCount();
    updateLikeCounter();
});

