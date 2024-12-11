document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById('register-form');
    const productList = document.getElementById('product-list');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const addProductButton = document.getElementById('add-product');
    const searchInput = document.getElementById('search-products');
    const toggleCalculatorButton = document.getElementById('toggle-calculator');
    const calculatorContainer = document.getElementById('calculator-container');

    let isEditing = false;
    let editingProductId = null;

    const fetchProducts = () => {
        fetch('/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(products => {
                displayProducts(products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    const displayProducts = (products) => {
        const groupedProducts = products.reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {});

        productList.innerHTML = Object.keys(groupedProducts).map(category => `
            <div class="category">
                <button class="accordion">${category}</button>
                <div class="panel">
                    <table>
                        <thead>
                            <tr>
                                <th>სახელი</th>
                                <th>კატეგორია</th>
                                <th>ერთეულის ფასი</th>
                                <th>ერთეულის რაოდენობა</th>
                                <th>მოქმედებები</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${groupedProducts[category].map(product => `
                                <tr class="${product.quantity === 0 ? 'out-of-stock' : ''}">
                                    <td>${product.name}</td>
                                    <td>${product.category}</td>
                                    <td>₾${product.unitPrice}</td>
                                    <td>${product.quantity}</td>
                                    <td>
                                        <button onclick="editProduct(${product.id})">რედაქტირება</button>
                                        <button onclick="deleteProduct(${product.id})" class="delete-button">წაშლა</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.accordion').forEach(button => {
            button.addEventListener('click', () => {
                const productsDiv = button.nextElementSibling;
                productsDiv.style.display = productsDiv.style.display === 'none' ? 'block' : 'none';
            });
        });
    }

    const validateProduct = (product) => {
        errorMessage.style.display = 'none';
        errorMessage.innerHTML = '';

        if (!product.name || product.name.trim() === '') {
            errorMessage.innerHTML = 'სახელის ველი აუცილებელია.';
            errorMessage.style.display = 'block';
            return false;
        }
        if (/^\d/.test(product.name)) {
            errorMessage.innerHTML = 'სახელის ველი არ შეიძლება დაიწყოს ციფრით.';
            errorMessage.style.display = 'block';
            return false;
        }
        if (product.name.length > 50) {
            errorMessage.innerHTML = 'სახელის ველი არ შეიძლება იყოს 50 სიმბოლოზე მეტი.';
            errorMessage.style.display = 'block';
            return false;
        }
        if (product.unitPrice <= 0) {
            errorMessage.innerHTML = 'ერთეულის ფასი უნდა იყოს მეტი ნულზე.';
            errorMessage.style.display = 'block';
            return false;
        }
        if (product.quantity < 0) {
            errorMessage.innerHTML = 'ერთეულის რაოდენობა არ შეიძლება იყოს უარყოფითი.';
            errorMessage.style.display = 'block';
            return false;
        }
        return true;
    }

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const product = {
            name: document.getElementById('name').value.trim(),
            category: document.getElementById('category').value,
            unitPrice: parseFloat(document.getElementById('unit-price').value),
            quantity: parseInt(document.getElementById('quantity').value)
        };

        if (!validateProduct(product)) {
            return;
        }

        const requestOptions = {
            method: isEditing ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        };

        const url = isEditing ? `/api/products/${editingProductId}` : '/api/products';

        fetch(url, requestOptions).then(() => {
            fetchProducts();
            registerForm.reset();
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
            isEditing = false;
            editingProductId = null;
        }).catch(error => console.error('Error registering product:', error));
    });

    window.deleteProduct = (id) => {
        fetch(`/api/products/${id}`, {
            method: 'DELETE'
        }).then(() => {
            fetchProducts();
        }).catch(error => console.error('Error deleting product:', error));
    };

    window.editProduct = (id) => {
        fetch(`/api/products/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(product => {
                document.getElementById('name').value = product.name;
                document.getElementById('category').value = product.category;
                document.getElementById('unit-price').value = product.unitPrice;
                document.getElementById('quantity').value = product.quantity;
                isEditing = true;
                editingProductId = id;
            }).catch(error => console.error('Error fetching product:', error));
    };

    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        fetch('/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(products => {
                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
                );
                displayProducts(filteredProducts);
            })
            .catch(error => console.error('Error fetching products:', error));
    });

    addProductButton.addEventListener('click', () => {
        registerForm.reset();
        isEditing = false;
        editingProductId = null;
    });

    // Toggle calculator visibility
    toggleCalculatorButton.addEventListener('click', () => {
        const isVisible = calculatorContainer.style.display === 'block';
        calculatorContainer.style.display = isVisible ? 'none' : 'block';
    });

    fetchProducts();
});
