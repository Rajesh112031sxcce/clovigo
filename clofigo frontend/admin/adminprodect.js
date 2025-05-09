let allProducts = [];
let currentPage = 1;
const rowsPerPage = 10;

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Unauthorized. Please login.");
        window.location.href = 'admin_login.html';
        return;
    }

    fetch('http://127.0.0.1:8000/api/accounts/admin-product-dashboard/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch data.");
            return response.json();
        })
        .then(data => {
            allProducts = data.products || [];
            renderProducts();
        })
        .catch(error => {
            alert("Error: " + error.message);
        });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        currentPage = 1;
        renderProducts();
    });
});

function renderProducts() {
    const tbody = document.querySelector('#products_table tbody');
    tbody.innerHTML = '';

    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allProducts.filter(product =>
        product.product_name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.product_category.toLowerCase().includes(keyword)
    );

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedProducts = filtered.slice(start, end);

    if (paginatedProducts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="19" class="text-center text-muted">No products found</td></tr>';
    } else {
        paginatedProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${product.id}</td>
              <td>${product.product_name}</td>
              <td>${product.description}</td>
              <td>${product.product_category}</td>
              <td>${product.color}</td>
              <td>${product.trend_order}</td>
              <td>${product.actual_price}</td>
              <td>${product.discount_price}</td>
              <td>${product.discount_percentage}%</td>
              <td>${product.calculated_discount_price}</td>
              <td>${product.stocks}</td>
              <td><img src="http://127.0.0.1:8000${product.image}" alt="Product Image" width="60"></td>
              <td>${product.is_return_policy ? 'Yes' : 'No'}</td>
              <td>${product.return_before}</td>
              <td>${product.delivered_within}</td>
              <td>${product.seller}</td>
              <td>${product.color_available}</td>
              <td>${new Date(product.created_at).toLocaleString()}</td>
              <td>${new Date(product.updated_at).toLocaleString()}</td>
            `;
            tbody.appendChild(row);
        });
    }

    renderPagination(filtered.length);
}

function renderPagination(totalItems) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(totalItems / rowsPerPage);
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = `btn btn-sm mx-1 ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'}`;
        btn.addEventListener('click', () => {
            currentPage = i;
            renderProducts();
        });
        pagination.appendChild(btn);
    }
}
