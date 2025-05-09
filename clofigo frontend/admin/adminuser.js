document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'admin_login.html';
        return;
    }

    loadUserTables(token);
});

async function loadUserTables(token) {
    try {
        await Promise.all([
            fetchAndRenderData('sellers', 'sellers_table', 'sellers', token),
        ]);
    } catch (error) {
        console.error('Failed to load user data:', error.message);
        alert('Error loading user tables. Please try again.');
    }
}

async function fetchAndRenderData(endpoint, tableId, key, token) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/accounts/admin/${endpoint}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${key}`);
        }

        const data = await response.json();
        const items = data[key] || [];

        const tbody = document.querySelector(`#${tableId} tbody`);
        tbody.innerHTML = '';

        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = generateRowHTML(key, item);
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error(`Error loading ${key}:`, error.message);
        alert(`Error fetching ${key} data.`);
    }
}

function generateRowHTML(key, item) {
    switch (key) {
        case 'sellers':
            return `
                <td>${item.id}</td>
                <td>${item.user?.first_name || '-'}</td>
                <td>
                    <button class="btn btn-sm ${item.is_active ? 'btn-danger' : 'btn-success'}"
                        onclick="toggleSellerStatus(${item.id}, ${item.is_active})">
                        ${item.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                </td>
                <td>${item.user?.email || '-'}</td>
                <td>${item.shop_name || '-'}</td>
                <td>${item.GST_no || '-'}</td>
                <td>${item.PAN_no || '-'}</td>
                <td>${item.account_no || '-'}</td>
                <td>${item.shop_address_1 || '-'}, ${item.shop_address_2 || '-'}, ${item.shop_landmark || '-'}</td>
                <td>${item.GST_expiry_date || '-'}</td>
                <td><a href="http://127.0.0.1:8000/${item.file_gst}" target="_blank">GST File</a></td>
                <td><a href="http://127.0.0.1:8000/${item.file_pan}" target="_blank">PAN File</a></td>
                <td><button onclick="viewSellerOrders(${item.id})">View Orders</button></td>
            `;
        
        default:
            return '';
    }
}

function viewsellerOrders(sellerId) {
    window.location.href = `seller_products.html?seller_id=${sellerId}`;
}

async function toggleSellerStatus(sellerId, currentStatus) {
    const token = localStorage.getItem('token');
    const action = currentStatus ? 'deactivate' : 'activate';

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/accounts/admin/seller/${sellerId}/status/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action }),
        });

        if (!response.ok) {
            throw new Error('Failed to toggle seller status');
        }

        alert('Seller status updated successfully.');
        location.reload();
    } catch (error) {
        console.error('Status toggle error:', error.message);
        alert('Error updating seller status.');
    }
}
