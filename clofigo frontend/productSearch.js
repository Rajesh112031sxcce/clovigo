// document.addEventListener("DOMContentLoaded", function () {
//   const searchInput = document.getElementById("search-input");
//   const productList = $("#productList");
//   const accessToken = localStorage.getItem("access");

//   if (!accessToken) {
//     console.error("Access token not found in localStorage.");
//     return;
//   }

//   // Owl Carousel Initialization Function
//   function initOwlCarousel() {
//     productList.owlCarousel({
//       items: 4,
//       loop: true,
//       margin: 15,
//       nav: true,
//       dots: false,
//       navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
//       responsive: {
//         0: { items: 1 },
//         600: { items: 2 },
//         1000: { items: 3 },
//         1200: { items: 4 }
//       }
//     });
//   }

//   // Initialize Carousel Initially
//   initOwlCarousel();

//   // Search Event
//   searchInput.addEventListener("input", function () {
//     const query = searchInput.value.trim();

//     if (query.length >= 3) {
//       console.log("Searching for:", query);

//       $.ajax({
//         url: "http://127.0.0.1:8000/products/customer/products/search/",
//         method: "GET",
//         headers: {
//           Authorization: "Bearer " + accessToken,
//         },
//         data: {
//           q: query,
//         },
//         success: function (response) {
//           console.log("Search Response:", response);
//           renderProducts(response.results);
//         },
//         error: function (xhr, status, error) {
//           console.error("Error fetching search results:", xhr.responseText, error);
//           productList.trigger('destroy.owl.carousel').empty()
//             .append("<div class='item'><p>Error fetching products.</p></div>");
//         },
//       });
//     } else {
//       productList.trigger('destroy.owl.carousel').empty();
//       initOwlCarousel();
//     }
//   });

//   function renderProducts(products) {
//     productList.trigger('destroy.owl.carousel').empty();

//     if (!products.length) {
//       productList.append("<div class='item'><p>No products found.</p></div>");
//       initOwlCarousel();
//       return;
//     }

//     products.forEach(product => {
//       const productHTML = `
//         <div class="item">
//           <div class="product-item" data-id="${product.id}">
//             <div class="product-img">
//               <img src="${product.thumbnail ?? 'default-image.png'}" alt="${product.name}" class="img-fluid">
//             </div>
//             <div class="product-details">
//               <h4>${product.name}</h4>
//               <p>Category: ${product.category}</p>
//               <div class="product-price">₹${product.price.toFixed(2)}</div>
//             </div>
//           </div>
//         </div>
//       `;

//       productList.append(productHTML);
//     });

//     // Reinitialize the Owl Carousel
//     initOwlCarousel();
//   }
// });

// search.js

// product_search.js

// $(document).ready(function () {
//     const productList = $("#product-list");
//     const searchInput = $("#search-input");
//     const searchBtn = $("#search-btn");
//     const messageDiv = $("#message");

//     // Get JWT token from localStorage
//     const accessToken = localStorage.getItem("access");

//     if (!accessToken) {
//         messageDiv.text("You must be logged in to search products.");
//         searchInput.prop("disabled", true);
//         searchBtn.prop("disabled", true);
//         return;
//     }

//     // Get query parameter from URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const query = urlParams.get('q');

//     // Set search input value if query is present in URL
//     if (query) {
//         searchInput.val(decodeURIComponent(query));
//         fetchProducts(query);
//     }

//     // Handle search button click
//     searchBtn.on("click", function () {
//         const query = searchInput.val().trim();
//         if (query.length >= 1) {
//             window.location.href = `search.html?q=${encodeURIComponent(query)}`;
//         }
//     });

//     // Handle "Enter" key press in the input field
//     searchInput.on("keypress", function (e) {
//         if (e.which === 13) {
//             searchBtn.click();
//         }
//     });

//     // Handle input changes with debounce
//     let debounceTimeout;
//     searchInput.on("input", function () {
//         const query = $(this).val().trim();

//         if (debounceTimeout) clearTimeout(debounceTimeout);

//         debounceTimeout = setTimeout(() => {
//             if (query.length >= 1) {
//                 fetchProducts(query);
//             } else {
//                 productList.empty();
//                 messageDiv.text("");
//             }
//         }, 300);
//     });

//     /**
//      * Fetch products based on query
//      */
//     function fetchProducts(query) {
//         messageDiv.text(""); // Clear previous messages

//         $.ajax({
//             url: "http://127.0.0.1:8000/products/customer/products/search/",
//             method: "GET",
//             headers: { Authorization: "Bearer " + accessToken },
//             data: { q: query },
//             success: function (response) {
//                 console.log("API response:", response);

//                 let products = response.results || response; // Handle both paginated and direct array response

//                 if (!Array.isArray(products)) {
//                     console.error("Expected array but got:", products);
//                     productList.html("<p>Unexpected response format.</p>");
//                     return;
//                 }

//                 renderProducts(products);
//             },
//             error: function (xhr) {
//                 let msg = "Error fetching products.";
//                 try {
//                     const json = JSON.parse(xhr.responseText);
//                     if (json.detail) msg = json.detail;
//                 } catch {
//                     msg = xhr.responseText.substring(0, 200);
//                 }
//                 messageDiv.text(msg);
//                 productList.empty();
//                 console.error("Error fetching products:", xhr.responseText);
//             }
//         });
//     }

//     /**
//      * Render products
//      */
//     function renderProducts(products) {
//         productList.empty();

//         if (!products.length) {
//             productList.html("<p>No products found.</p>");
//             return;
//         }

//         products.forEach(product => {
//             const thumbnailUrl = product.thumbnail
//                 ? "http://127.0.0.1:8000" + product.thumbnail
//                 : "default-image.png";


                

//             const productHTML = `
//                 <div class="col-lg-3 col-md-6">
//                     <div class="product-item mb-30" data-id="${product.id}">
//                         <a href="single_product_view.html?id=${product.id}" class="product-img">
//                             <img src="${thumbnailUrl}" alt="${product.name}" />
//                             <div class="product-absolute-options">
//                                 <span class="offer-badge-1">${product.discount ? product.discount : 0}% off</span>
//                                 <span class="like-icon" title="wishlist"></span>
//                             </div>
//                         </a>
//                         <div class="product-text-dt">
//                             <p>Available<span>(In Stock)</span></p>
//                             <h4>${product.name}</h4>
//                             <div class="product-price">
//                                 ₹${product.price ? product.price.toFixed(2) : '0.00'}
//                                 <span>₹${product.original_price ? product.original_price.toFixed(2) : '0.00'}</span>
//                             </div>
//                             <div class="qty-cart">
//                                 <div class="quantity buttons_added">
//                                     <input type="button" value="-" class="minus minus-btn">
//                                     <input type="number" step="1" name="quantity" value="1" class="input-text qty text">
//                                     <input type="button" value="+" class="plus plus-btn">
//                                 </div>
//                                 <span class="cart-icon"><i class="uil uil-shopping-cart-alt"></i></span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             `;
//             productList.append(productHTML);
//         });
//     }
// });


//   <div class="col-lg-3 col-md-6">
//                     <div class="product-item mb-30" data-id="${product.id}">
//                         <a href="single_product_view.html?id=${product.id}" class="product-img">
//                             <img src="${thumbnailUrl}" alt="${product.name}" />
//                             <div class="product-absolute-options">
//                                 <span class="offer-badge-1">${product.discount}% off</span>
//                                 <span class="like-icon" title="wishlist"></span>
//                             </div>
//                         </a>
//                         <div class="product-text-dt">
//                             <p>Available<span>(In Stock)</span></p>
//                             <h4>${product.name}</h4>
//                             <div class="product-price">₹${product.price.toFixed(2)} <span>₹${product.original_price.toFixed(2)}</span></div>
//                             <div class="qty-cart">
//                                 <div class="quantity buttons_added">
//                                     <input type="button" value="-" class="minus minus-btn">
//                                     <input type="number" step="1" name="quantity" value="1" class="input-text qty text">
//                                     <input type="button" value="+" class="plus plus-btn">
//                                 </div>
//                                 <span class="cart-icon"><i class="uil uil-shopping-cart-alt"></i></span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             `



$(document).ready(function () {
    const productList = $("#product-list");
    const searchInput = $("#search-input");
    const searchBtn = $("#search-btn");
    const messageDiv = $("#message");

    // Get JWT token from localStorage
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
        messageDiv.text("You must be logged in to search products.");
        searchInput.prop("disabled", true);
        searchBtn.prop("disabled", true);
        return;
    }

    // Get query parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    // If no query, fetch random products
    if (!query) {
        fetchRandomProducts();
    } else {
        searchInput.val(decodeURIComponent(query));
        fetchProducts(query);
    }

    // Handle search button click
    searchBtn.on("click", function () {
        const query = searchInput.val().trim();
        if (query.length >= 1) {
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    });

    // Handle "Enter" key press in the input field
    searchInput.on("keypress", function (e) {
        if (e.which === 13) {
            searchBtn.click();
        }
    });

    // Handle input changes with debounce
    let debounceTimeout;
    searchInput.on("input", function () {
        const query = $(this).val().trim();

        if (debounceTimeout) clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
            if (query.length >= 1) {
                fetchProducts(query);
            } else {
                fetchRandomProducts();
            }
        }, 300);
    });

    function fetchProducts(query) {
        messageDiv.text("");

        $.ajax({
            url: "http://127.0.0.1:8000/products/customer/products/search/",
            method: "GET",
            headers: { Authorization: "Bearer " + accessToken },
            data: { q: query },
            success: function (response) {
                let products = response.results || response;
                renderProducts(products);
            },
            error: function () {
                messageDiv.text("Error fetching products.");
                productList.empty();
            }
        });
    }

    function fetchRandomProducts() {
        $.ajax({
            url: "http://127.0.0.1:8000/products/products/",
            method: "GET",
            headers: { Authorization: "Bearer " + accessToken },
            success: function (response) {
                let products = response.results || response;
                products.sort(() => Math.random() - 0.5);
                renderProducts(products.slice(0, 20));
            },
            error: function () {
                messageDiv.text("Error fetching products.");
                productList.empty();
            }
        });
    }

    function renderProducts(products) {
        productList.empty();

        if (!products.length) {
            productList.html("<p>No products found.</p>");
            return;
        }

        products.forEach(product => {
            const thumbnailUrl = product.thumbnail
                ? "http://127.0.0.1:8000" + product.thumbnail
                : "default-image.png";
            
            let discountPercent = product.actual_price && product.price
            ? Math.round(((product.actual_price - product.price) / product.actual_price) * 100)

            : 0;
            const productHTML = `
                <div class="col-lg-3 col-md-6">
                    <div class="product-item mb-30" data-id="${product.id}">
                        <a href="single_product_view.html?id=${product.id}" class="product-img">
                            <img src="${thumbnailUrl}" alt="${product.product_name}" />
                            <div class="product-absolute-options">
                                ${discountPercent > 0 ? `<span class="offer-badge-1">${discountPercent}% off</span>` : ""}

                                <span class="like-icon" title="wishlist"></span>
                            </div>
                        </a>
                        <div class="product-text-dt">
                            <p>Available<span>(In Stock)</span></p>
                            <h4>${product.name}</h4>
                            <div class="product-price">
                                ₹${product.price ? product.price.toFixed(2) : '0.00'}
                                <span>₹${product.actual_price ? product.price.toFixed(2) : '0.00'}</span>
                            </div>
                            <div class="qty-cart">
                                <div class="quantity buttons_added">
                                    <input type="button" value="-" class="minus minus-btn">
                                    <input type="number" step="1" name="quantity" value="1" class="input-text qty text">
                                    <input type="button" value="+" class="plus plus-btn">
                                </div>
                                <span class="cart-icon"><i class="uil uil-shopping-cart-alt"></i></span>
                            </div>
                        </div>
                    </div>
                </div>`;
            productList.append(productHTML);
        });
    }




});
