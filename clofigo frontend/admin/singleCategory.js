
  document.addEventListener("DOMContentLoaded", function () {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      document.querySelector("#message").textContent = "Missing access token. Please log in.";
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const categorySlug = urlParams.get("category");

    if (!categorySlug) {
      document.querySelector("#message").textContent = "Missing category parameter.";
      return;
    }

    const productGrid = document.querySelector("#product-grid");
    const categoryTitle = document.querySelector("#category-title");

    categoryTitle.textContent = `Category: ${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}`;
    productGrid.innerHTML = "<p>Loading products...</p>";

    fetch(`http://127.0.0.1:8000/products/productview/${categorySlug}/`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const products = Array.isArray(data) ? data : data.products || data.results || [];

        if (products.length === 0) {
          productGrid.innerHTML = "<p>No products found in this category.</p>";
          return;
        }

        productGrid.innerHTML = ""; // Clear previous

        products.forEach((product) => {
          const discountPercent = product.discount_price
            ? Math.round(((product.actual_price - product.discount_price) / product.actual_price) * 100)
            : 0;

          const imageUrl = product.image_id?.startsWith("http")
            ? product.image_id
            : `http://127.0.0.1:8000${product.image_id || product.thumbnail || "/static/images/default.jpg"}`;

          const html = `
            <div class="col-lg-3 col-md-6">
              <div class="product-item mb-30" data-id="${product.id}">
                <a class="product-img">
                  <img src="${imageUrl}" alt="${product.product_name || product.name}">
                  <div class="product-absolute-options">
                    ${discountPercent > 0 ? `<span class="offer-badge-1">${discountPercent}% off</span>` : ""}
                    <span class="like-icon" title="wishlist" data-id="${product.id}"></span>
                  </div>
                </a>
                <div class="product-text-dt">
                  <p>${product.stocks ? "Available" : "Out of Stock"}<span>(${product.stocks ? "In Stock" : "Out of Stock"})</span></p>
                  <h4>${product.product_name || product.name}</h4>
                  <div class="product-price">
                    ₹${product.discount_price ?? product.actual_price}
                    ${discountPercent > 0 ? `<span>₹${product.actual_price}</span>` : ""}
                  </div>
                  <div class="qty-cart">
                    <div class="quantity buttons_added">
                      <input type="button" value="-" class="minus minus-btn">
                      <input type="number" step="1" name="quantity" value="1" class="input-text qty text">
                      <input type="button" value="+" class="plus plus-btn">
                    </div>
                    <span class="cart-icon" data-id="${product.id}" data-price="${product.discount_price ?? product.actual_price}">
                      <i class="uil uil-shopping-cart-alt"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          `;

          productGrid.insertAdjacentHTML("beforeend", html);
        });
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        productGrid.innerHTML = "<p>Error loading products. Please try again later.</p>";
      });

    // ✅ Add click event delegation to #product-grid
    productGrid.addEventListener("click", function (event) {
      const productItem = event.target.closest(".product-item");
      if (productItem) {
        const productId = productItem.getAttribute("data-id");
        if (productId) {
          window.location.href = `products-details.html?id=${productId}`;
        }
      }
    });
  });
