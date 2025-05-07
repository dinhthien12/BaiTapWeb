document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const product = {
                id: Date.now(),
                name: this.getAttribute('data-name'),
                price: parseInt(this.getAttribute('data-price')),
                image: this.getAttribute('data-image'),
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingItem = cart.find(item => item.name === product.name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            window.location.href = '../html/GioHang.html';
        });
    });
});
$(document).ready(function() {
    $('.add-to-cart').click(function(e) {
        e.preventDefault();
        const id = $(this).data('id');
        const name = $(this).data('name');
        const price = $(this).data('price');
        const img = $(this).data('img');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        let found = cart.find(item => item.id === id);
        if (found) {
            found.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                img,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Đã thêm vào giỏ hàng!');
    });
});