

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.querySelector(".login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.querySelector("#login-username").value;
            const password = document.querySelector("#login-password").value;

            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.username === username && storedUser.password === password) {
                alert("Đăng nhập thành công!");
                window.location.href = "index.html";
            } else {
                alert("Sai tên đăng nhập hoặc mật khẩu!");
            }
        });
    }

    const registerForm = document.querySelector(".register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.querySelector("#register-username").value;
            const email = document.querySelector("#register-email").value;
            const password = document.querySelector("#register-password").value;

            const user = { username, email, password };
            localStorage.setItem("user", JSON.stringify(user));
            alert("Đăng ký thành công! Hãy đăng nhập.");
            window.location.href = "login.html";
        });
    }

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const product = {
                name: this.dataset.name,
                price: this.dataset.price
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Đã thêm vào giỏ hàng!");
        });
    });

    const cartPage = document.querySelector(".cart-page");
    if (cartPage) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartContainer = document.querySelector(".cart-items");

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Chưa có sản phẩm nào trong giỏ hàng.</p>";
        } else {
            cartContainer.innerHTML = "";
            cart.forEach((item, index) => {
                const productElement = document.createElement("div");
                productElement.classList.add("cart-item");
                productElement.innerHTML = `
                    <p>${item.name} - ${item.price}đ</p>
                    <button class="remove-item" data-index="${index}">Xóa</button>
                `;
                cartContainer.appendChild(productElement);
            });

            document.querySelectorAll(".remove-item").forEach(button => {
                button.addEventListener("click", function () {
                    let cart = JSON.parse(localStorage.getItem("cart"));
                    cart.splice(this.dataset.index, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    location.reload();
                });
            });
        }
    }

        const checkoutForm = document.querySelector(".checkout-form");
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
            
            localStorage.removeItem("cart");

            console.log("Cart after payment:", localStorage.getItem("cart")); 

            setTimeout(() => {
                window.location.href = "index.html";
            }, 500);
        });
    }

});
