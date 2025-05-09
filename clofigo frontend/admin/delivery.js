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
           
            fetchAndRenderData('delivery-boys', 'delivery_boys_table', 'delivery_boys', token),
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
        case 'delivery_boys':
            return `
                <td>${item.id}</td>
                <td>${item.user?.first_name || '-'}</td>
                <td>${item.is_active ? 'Active' : 'Inactive'}</td>
            `;
       
        default:
            return '';
    }
}

