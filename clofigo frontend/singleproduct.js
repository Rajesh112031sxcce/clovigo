


// document.addEventListener("DOMContentLoaded", function () {
//   const accessToken = localStorage.getItem("access");

//   if (!accessToken) {
//     console.error("Access token not found in localStorage.");
//     return;
//   }

//   const urlParams = new URLSearchParams(window.location.search);
//   const productId = urlParams.get("id");

//   if (!productId) {
//     console.error("Product ID not found in URL.");
//     return;
//   }

//   fetch(`http://127.0.0.1:8000/products/productbyid/${productId}/`, {
//     headers: {
//       Authorization: "Bearer " + accessToken
//     }
//   })
//     .then(response => response.json())
//     .then(product => {
//       console.log("Product Data:", product);

//       // Update Product Info
//       document.getElementById("product-name").textContent = product.product_name;
//       document.getElementById("product-id").textContent = product.id;
//       document.getElementById("product-stock").textContent = product.stocks ? "In Stock" : "Out of Stock";
//       document.getElementById("product-description").textContent = product.description;
//       document.getElementById("product-discount-price").textContent = `₹${product.discount_price ?? product.actual_price}`;
//       document.getElementById("product-mrp-price").textContent = product.actual_price ? `₹${product.actual_price}` : '';

//       // Populate Image Carousels
//       const sync1 = $("#sync1");
//       const sync2 = $("#sync2");

//       sync1.empty();
//       sync2.empty();

//       // Handling multiple images
//       const images = product.images && product.images.length ? product.images : [product.image_id];

//       // Limit to max 4 images and ensure they are unique
//       const limitedImages = [...new Set(images)].slice(0, 4);

//       if (limitedImages.length === 0) {
//         console.warn("No images available for the product.");
//         const placeholderImage = "path/to/default-image.jpg";
//         sync1.append(`<div class="item"><img src="${placeholderImage}" alt="No Image Available"></div>`);
//         sync2.append(`<div class="item"><img src="${placeholderImage}" alt="No Image Available"></div>`);
//       } else {
//         limitedImages.forEach(imageUrl => {
//           const imageHTML = `<div class="item"><img src="${imageUrl}" alt="Product Image"></div>`;
//           sync1.append(imageHTML);
//           sync2.append(imageHTML);
//         });
//       }

//       // Initialize Owl Carousel
//       sync1.owlCarousel({
//         items: 1,
//         loop: true,
//         nav: true,
//         dots: false,
//         navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"]
//       });

//       sync2.owlCarousel({
//         items: 4,
//         margin: 10,
//         loop: true,
//         nav: false,
//         dots: false,
//         center: true
//       });

//       // Sync carousels
//       sync1.on('changed.owl.carousel', function (event) {
//         const index = event.item.index;
//         sync2.trigger('to.owl.carousel', [index, 300, true]);
//       });

//       sync2.on('click', '.item', function () {
//         const index = $(this).index();
//         sync1.trigger('to.owl.carousel', [index, 300, true]);
//       });
//     })
//     .catch(err => {
//       console.error("Error fetching product details:", err);
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const accessToken = localStorage.getItem("access");

//   if (!accessToken) {
//     console.error("Access token not found in localStorage.");
//     return;
//   }

//   const urlParams = new URLSearchParams(window.location.search);
//   const productId = urlParams.get("id");

//   if (!productId) {
//     console.error("Product ID not found in URL.");
//     return;
//   }

//   fetch(`http://127.0.0.1:8000/products/productbyid/${productId}/`, {
//     headers: {
//       Authorization: "Bearer " + accessToken,
//     },
//   })
//     .then((response) => response.json())
//     .then((product) => {
//       console.log("Product Data:", product);

//       // Update Product Info
//       document.getElementById("product-name").textContent = product.product_name;
//       document.getElementById("product-id").textContent = product.id;
//       document.getElementById("product-stock").textContent = product.stocks ? "In Stock" : "Out of Stock";
//       document.getElementById("product-description").textContent = product.description;
//       document.getElementById("product-discount-price").textContent = `₹${product.discount_price ?? product.actual_price}`;
//       document.getElementById("product-mrp-price").textContent = product.actual_price ? `₹${product.actual_price}` : "";

//       // Prepare image arrays
//       const sync1 = $("#sync1");
//       const sync2 = $("#sync2");

//       sync1.empty();
//       sync2.empty();

//       // If multiple images exist, use them; else fallback to single image
//       const images = product.images && product.images.length ? product.images : [product.image_id];

//       // Limit to max 4 images (unique)
//       const limitedImages = [...new Set(images)].slice(0, 4);

//       if (limitedImages.length === 0) {
//         const placeholderImage = "path/to/default-image.jpg";
//         // sync1.append(`<div class="item"><img src="${placeholderImage}" alt="No Image Available"></div>`);
//         // sync2.append(`<div class="item"><img src="${placeholderImage}" alt="No Image Available"></div>`);

//         sync1.append(`<div class="item"><img src="c1.jpg" alt="No Image Available"></div>`);
//         sync2.append(`<div class="item"><img src="c2.jpg" alt="No Image Available"></div>`);
//       } else {
//         limitedImages.forEach((imageUrl) => {
//           const imageHTML = `<div class="item"><img src="${imageUrl}" alt="Product Image"></div>`;
//           sync1.append(imageHTML);
//           sync2.append(imageHTML);
//         });
//       }

//       // Initialize and sync Owl Carousels
//       initOwlCarousels();
//     })
//     .catch((err) => {
//       console.error("Error fetching product details:", err);
//     });

//   // Owl Carousel sync function definitions
//   function initOwlCarousels() {
//     var sync1 = $("#sync1");
//     var sync2 = $("#sync2");
//     var slidesPerPage = 4;
//     var syncedSecondary = true;

//     sync1
//       .owlCarousel({
//         items: 1,
//         slideSpeed: 2000,
//         nav: true,
//         autoplay: false,
//         dots: false,
//         loop: true,
//         responsiveRefreshRate: 200,
//         navText: ["<i class='uil uil-angle-left'></i>", "<i class='uil uil-angle-right'></i>"],
//       })
//       .on("changed.owl.carousel", syncPosition);

//     sync2
//       .on("initialized.owl.carousel", function () {
//         sync2.find(".owl-item").eq(0).addClass("current");
//       })
//       .owlCarousel({
//         items: slidesPerPage,
//         dots: true,
//         nav: true,
//         smartSpeed: 200,
//         slideSpeed: 500,
//         slideBy: slidesPerPage,
//         responsiveRefreshRate: 100,
//       })
//       .on("changed.owl.carousel", syncPosition2);

//     sync2.on("click", ".owl-item", function (e) {
//       e.preventDefault();
//       var number = $(this).index();
//       sync1.data("owl.carousel").to(number, 300, true);
//     });

//     function syncPosition(el) {
//       var count = el.item.count - 1;
//       var current = el.item.index;

//       if (el.relatedTarget && el.settings.loop) {
//         // Adjust index due to clones in loop mode
//         current = el.item.index - el.relatedTarget._clones.length / 2;
//         if (current < 0) {
//           current = count + current + 1;
//         }
//         if (current > count) {
//           current = current - count - 1;
//         }
//       }

//       // Clamp current index to valid range
//       if (current < 0) current = 0;
//       if (current > count) current = count;

//       sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");

//       var onscreen = sync2.find(".owl-item.active").length - 1;
//       var start = sync2.find(".owl-item.active").first().index();
//       var end = sync2.find(".owl-item.active").last().index();

//       if (current > end) {
//         sync2.data("owl.carousel").to(current, 100, true);
//       }
//       if (current < start) {
//         sync2.data("owl.carousel").to(current - onscreen, 100, true);
//       }
//     }

//     function syncPosition2(el) {
//       if (syncedSecondary) {
//         var number = el.item.index;
//         sync1.data("owl.carousel").to(number, 100, true);
//       }
//     }
//   }
// });



document.addEventListener("DOMContentLoaded", function () {
  const accessToken = localStorage.getItem("access");

  if (!accessToken) {
    console.error("Access token not found in localStorage.");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    console.error("Product ID not found in URL.");
    return;
  }

  fetch(`http://127.0.0.1:8000/products/productbyid/${productId}/`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((product) => {
      console.log("Product Data:", product);

      // Update Product Info
      document.getElementById("product-name").textContent = product.product_name;
      document.getElementById("product-id").textContent = product.id;
      document.getElementById("product-stock").textContent = product.stocks ? "In Stock" : "Out of Stock";
      document.getElementById("product-description").textContent = product.description;
      document.getElementById("product-discount-price").textContent = `₹${product.discount_price ?? product.actual_price}`;
      document.getElementById("product-mrp-price").textContent = product.actual_price ? `₹${product.actual_price}` : "";
      document.getElementById('productUnit').value=product.product_unit ? `${product.product_unit}` :"kg";

      // Display single image
      const imageContainer = document.getElementById("product-image");
      imageContainer.innerHTML = ""; // Clear any existing content

      const imageUrl = product.image_id ? product.image_id : "path/to/default-image.jpg";

      const imageHTML = `<img src="${imageUrl}" alt="${product.product_name}" class="img-fluid">`;
      imageContainer.innerHTML = imageHTML;
    })
    .catch((err) => {
      console.error("Error fetching product details:", err);
    });
});
