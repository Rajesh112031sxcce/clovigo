
$(document).ready(function () {
    const token = localStorage.getItem('access');

    $.ajax({
        url: 'http://127.0.0.1:8000/products/categories/',
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
        success: function (data) {
            if (!Array.isArray(data.results)) {
                console.error("Unexpected response format:", data);
                return;
            }

            // Destroy previous owlCarousel instance if any
            if ($('#category-carousel').hasClass("owl-loaded")) {
                $('#category-carousel').trigger('destroy.owl.carousel').removeClass('owl-loaded');
                $('#category-carousel').find('.owl-stage-outer').children().unwrap();
            }

            $('#category-carousel').empty(); // clear existing items

            data.results.forEach(function (category) {
                const imgSrc = category.image ? category.image : 'images/category/default.png';
                let html = `
                <div class="item">
                    <a href="category-grid.html?category=${category.slug}" class="category-item">
                        <div class="cate-img">
                            <img src="${imgSrc}" alt="${category.name}">
                        </div>
                        <h4>${category.name}</h4>
                    </a>
                </div>`;
                $('#category-carousel').append(html);
            });

            // Initialize Owl Carousel after content is loaded
            $('#category-carousel').owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                responsive: {
                    0: { items: 2 },
                    600: { items: 4 },
                    1000: { items: 6 }
                }
            });
        },
        error: function (err) {
            console.error("Failed to load categories", err);
            if (err.status === 401) {
                alert("Unauthorized: Please login again.");
            }
        }
    });
});


$(document).ready(function () {
    const token = localStorage.getItem('access');

    function loadCategories() {
        $.ajax({
            url: 'http://127.0.0.1:8000/products/categories/',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (data) {
                if (!Array.isArray(data.results)) {
                    console.error('Unexpected response format:', data);
                    return;
                }

                const $categoryList = $('.category-by-cat');
                $categoryList.empty(); // Clear existing static categories

                data.results.forEach(category => {
                    // Use category.icon if available, otherwise fallback to category.image or a placeholder image
                    const iconSrc = category.icon || category.image || 'images/category/default-icon.svg';

                    // Create a list item with link, icon, and text
                    const listItem = `
                        <li>
                            <a href="category-grid.html?category=${category.slug}" class="single-cat-item">

                                <div class="icon" >
                                    <img src="${iconSrc}" alt="${category.name}">
                                </div>
                                <div class="text">${category.name}</div>
                            </a>
                        </li>
                    `;

                    $categoryList.append(listItem);
                });
            },
            error: function (err) {
                console.error('Failed to load categories', err);
                if (err.status === 401) {
                    alert('Unauthorized: Please login again.');
                }
            }
        });
    }

    // Call the function to load categories when the page is ready
    loadCategories();

    // Optionally, reload categories whenever the modal is opened
    $('#category_model').on('show.bs.modal', function () {
        loadCategories();
    });
});




