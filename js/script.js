$(document).ready(function() {
    // Sample product data
    const products = [
        { id: 1, name: "Son Dưỡng Môi", price: 150000, image: "images/product1.jpg", description: "Son dưỡng môi tự nhiên, giữ ẩm tốt." },
        { id: 2, name: "Kem Chống Nắng", price: 250000, image: "images/product2.jpg", description: "Kem chống nắng SPF 50, bảo vệ da hiệu quả." },
        // Thêm các sản phẩm khác
    ];

    // Load products on products.html
    if (window.location.pathname.includes("products.html")) {
        let productList = $("#productList");
        products.forEach(product => {
            productList.append(`
                <div class="col-md-3">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.price.toLocaleString()} VNĐ</p>
                            <a href="product-detail.html?id=${product.id}" class="btn btn-primary">Xem Chi Tiết</a>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    // Load product detail on product-detail.html
    if (window.location.pathname.includes("product-detail.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get("id"));
        const product = products.find(p => p.id === productId);
        if (product) {
            $("#productImage").attr("src", product.image);
            $("#productName").text(product.name);
            $("#productPrice").text(`${product.price.toLocaleString()} VNĐ`);
            $("#productDescription").text(product.description);
        }
    }

    // Register form validation and LocalStorage
    $("#registerForm").on("submit", function(e) {
        e.preventDefault();
        const username = $("#username").val();
        const email = $("#email").val();
        const password = $("#password").val();
        const confirmPassword = $("#confirmPassword").val();

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }

        const user = { username, email, password };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Đăng ký thành công! Thông tin: " + JSON.stringify(user));
        window.location.href = "login.html";
    });

    // Cart functionality
    window.addToCart = function() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get("id"));
        const product = products.find(p => p.id === productId);
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Đã thêm vào giỏ hàng!");
    };

    // Load cart on cart.html
    if (window.location.pathname.includes("cart.html")) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartItems = $("#cartItems");
        cart.forEach(item => {
            cartItems.append(`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.price.toLocaleString()} VNĐ</td>
                    <td><button class="btn btn-danger btn-sm">Xóa</button></td>
                </tr>
            `);
        });
    }
});