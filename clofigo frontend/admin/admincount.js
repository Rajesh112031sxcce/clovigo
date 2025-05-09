document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'admin_login.html';
        return;
    }

    initDashboard(token);
});

async function initDashboard(token) {
    try {
        await Promise.all([
            loadAndRenderData('sellers', 'seller_count', token),
            loadAndRenderData('delivery-boys', 'delivery_boy_count', token),
            loadAndRenderData('customers', 'customer_count', token),
            loadOrderCount(token),
            loadProductData(token),
        ]);
    } catch (error) {
        console.error(`Initialization error: ${error.message}`);
        alert('Failed to load dashboard data. Please try again later.');
    }
}

async function loadAndRenderData(endpoint, countElementId, token) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/accounts/admin/${endpoint}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${endpoint}`);
        }

        const data = await response.json();
        const keyMap = {
            'sellers': 'sellers',
            'customers': 'customers',
            'delivery-boys': 'delivery_boys'
        };
        const items = data[keyMap[endpoint]] || [];

        if (countElementId) {
            document.getElementById(countElementId).textContent = items.length;
        }
    } catch (error) {
        console.error(`Error loading ${endpoint}:`, error.message);
        alert(`Error fetching ${endpoint} data.`);
    }
}

async function loadOrderCount(token) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/accounts/admin/orders/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        const orderCount = (data.orders || []).length;
        document.getElementById('order_count').textContent = orderCount;
    } catch (error) {
        console.error('Error fetching order count:', error.message);
        alert('Error fetching order data.');
    }
}

async function loadProductData(token) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/accounts/admin-product-dashboard/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product data');
        }

        const data = await response.json();
        const products = data.products || [];

        document.getElementById('product_count').textContent = products.length;
        renderProducts(products);
    } catch (error) {
        console.error('Error fetching product data:', error.message);
        alert('Error fetching product details.');
    }
}

function renderProducts(products) {
    // Implement your product rendering logic here
    console.log('Rendering products:', products);
}
