document.addEventListener('DOMContentLoaded', function() {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const orderSummary = document.getElementById('order-summary');
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        orderSummary.innerHTML += `
            <tr>
                <td>${item.name} × ${item.quantity}</td>
                <td class="text-end">${itemTotal.toLocaleString()}đ</td>
            </tr>
        `;
    });


    document.getElementById('subtotal').textContent = subtotal.toLocaleString() + 'đ';
    updateTotal();


    document.querySelectorAll('input[name="shipping"]').forEach(radio => {
        radio.addEventListener('change', updateTotal);
    });


    function updateTotal() {
        const shippingFee = document.querySelector('input[name="shipping"]:checked').id === 'fast-shipping' ? 40000 : 20000;
        const total = subtotal + shippingFee;

        document.getElementById('shipping-fee').textContent = shippingFee.toLocaleString() + 'đ';
        document.getElementById('total-amount').textContent = total.toLocaleString() + 'đ';
    }

    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();

        if (cart.length === 0) {
            alert('Giỏ hàng của bạn đang trống!');
            return;
        }

        const orderInfo = {
            customer: {
                name: document.getElementById('fullname').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                district: document.getElementById('district').value,
                note: document.getElementById('note').value
            },
            shipping: document.querySelector('input[name="shipping"]:checked').id === 'fast-shipping' ? 'fast' : 'standard',
            payment: document.getElementById('payment-method').value,
            items: cart,
            subtotal: subtotal,
            shippingFee: document.querySelector('input[name="shipping"]:checked').id === 'fast-shipping' ? 40000 : 20000,
            total: subtotal + (document.querySelector('input[name="shipping"]:checked').id === 'fast-shipping' ? 40000 : 20000),
            date: new Date().toISOString(),
            status: 'pending'
        };

        localStorage.setItem('currentOrder', JSON.stringify(orderInfo));

        window.location.href = 'XuLyDonHang.html';
    });
    document.getElementById('city').addEventListener('change', function() {
        const districtSelect = document.getElementById('district');
        districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';

        if (this.value === 'hanoi') {

            const hanoiDistricts = ['Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Đống Đa', 'Cầu Giấy', 'Thanh Xuân', 'Hoàng Mai', 'Long Biên'];
            hanoiDistricts.forEach(district => {
                districtSelect.innerHTML += `<option value="${district.toLowerCase().replace(' ', '_')}">${district}</option>`;
            });
        } else if (this.value === 'hcm') {

            const hcmDistricts = ['Quận 1', 'Quận 3', 'Quận 5', 'Quận 10', 'Tân Bình', 'Phú Nhuận', 'Bình Thạnh', 'Gò Vấp'];
            hcmDistricts.forEach(district => {
                districtSelect.innerHTML += `<option value="${district.toLowerCase().replace(' ', '_')}">${district}</option>`;
            });
        }
    });
});