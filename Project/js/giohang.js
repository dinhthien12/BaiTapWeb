document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        const cartContainer = document.getElementById("cart-items");
        cartContainer.innerHTML = "";

        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemHTML = `
                  <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-info">
                      <h5>${item.name}</h5>
                      <p class="text-danger">${item.price.toLocaleString()}₫</p>
                      <div class="quantity-control">
                        <button class="btn btn-outline-secondary" onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn btn-outline-secondary" onclick="changeQuantity(${index}, 1)">+</button>
                        <button class="btn btn-danger ms-3" style="width: 80px;" onclick="removeItem(${index})">Xoá</button>
                      </div>
                    </div>
                  </div>
                `;
            cartContainer.innerHTML += itemHTML;
        });

        document.getElementById("cart-total").innerText = total.toLocaleString() + "₫";
    }

    function changeQuantity(index, delta) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    renderCart();
    document.querySelectorAll(".btn-primary").forEach((btn) => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();

            const card = btn.closest(".card");
            const name = card.querySelector(".card-title")
            const priceText = card.querySelector(".card-text")
            const image = card.querySelector("img")

            const price = parseInt(priceText.replace(/[^\d]/g, "")) || 0;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingIndex = cart.findIndex((item) => item.name === name);

            if (existingIndex !== -1) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Đã thêm vào giỏ hàng!");
        });
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        function renderCart() {
            const cartContainer = document.getElementById("cart-items");
            cartContainer.innerHTML = "";

            let total = 0;

            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const itemHTML = `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-info">
              <h5>${item.name}</h5>
              <p class="text-danger">${item.price.toLocaleString()}₫</p>
              <div class="quantity-control">
                <button class="btn btn-outline-secondary" onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="btn btn-outline-secondary" onclick="changeQuantity(${index}, 1)">+</button>
                <button class="btn btn-danger ms-3" style="width: 80px;" onclick="removeItem(${index})">Xoá</button>
              </div>
            </div>
          </div>
        `;
                cartContainer.innerHTML += itemHTML;
            });

            document.getElementById("cart-total").innerText = total.toLocaleString() + "₫";
        }

        function changeQuantity(index, delta) {
            cart[index].quantity += delta;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }

        function removeItem(index) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }

        renderCart();
    });


});