document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Unauthorized access. Please login.");
        window.location.href = "admin_login.html";
        return;
    }

    window.ordersData = [];
    window.currentPage = 1;
    window.rowsPerPage = 10;

    fetchOrders(token);

    document.getElementById('searchInput').addEventListener('input', () => {
        window.currentPage = 1;
        renderOrders();
    });
});

function fetchOrders(token) {
    fetch("http://127.0.0.1:8000/api/accounts/admin/orders/", {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            return response.json();
        })
        .then(data => {
            window.ordersData = data.orders || [];
            renderOrders();
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
}

function renderOrders() {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const tbody = document.querySelector("#orders_table tbody");
    tbody.innerHTML = "";

    const filteredOrders = window.ordersData.filter(order => {
        const customer = getCustomerName(order.customer).toLowerCase();
        const orderStatus = getOrderStatus(order.order_status).toLowerCase();
        return (
            order.id.toString().includes(searchQuery) ||
            customer.includes(searchQuery) ||
            orderStatus.includes(searchQuery)
        );
    });

    const start = (window.currentPage - 1) * window.rowsPerPage;
    const end = start + window.rowsPerPage;
    const paginatedOrders = filteredOrders.slice(start, end);

    if (paginatedOrders.length === 0) {
        tbody.innerHTML = "<tr><td colspan='7' class='no-orders'>No orders found</td></tr>";
        renderPagination(filteredOrders.length);
        return;
    }

    paginatedOrders.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.product?.id || '-'}</td>
            <td>${getCustomerName(order.customer)}</td>
            <td>${getOrderStatus(order.order_status)}</td>
            <td>${order.payment_status || 'Not Paid'}</td>
            <td>${order.total_price}</td>
            <td>${formatDate(order.created_at)}</td>
        `;
        tbody.appendChild(row);
    });

    renderPagination(filteredOrders.length);
}

function renderPagination(totalItems) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(totalItems / window.rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.textContent = i;
        pageBtn.className = `btn btn-sm ${i === window.currentPage ? "btn-primary" : "btn-outline-primary"} mx-1`;
        pageBtn.onclick = () => {
            window.currentPage = i;
            renderOrders();
        };
        paginationContainer.appendChild(pageBtn);
    }
}

function getOrderStatus(status) {
    switch (status) {
        case 'P': return 'Pending';
        case 'D': return 'Delivered';
        case 'C': return 'Cancelled';
        default: return 'Unknown';
    }
}

function getCustomerName(customerId) {
    return `Customer #${customerId}`; // Replace with actual name if needed
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}
