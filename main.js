const productsEl = document.getElementById('products');
let products = [];
async function getProducts() {
    const res = await fetch('./products.json')
    products = await res.json();
}

function renderProducts(products) {
        products.map((product) => {
            productsEl.innerHTML += `
                <div class="product">
                    <img src="${product.image}" alt="product.name">
                    <p>name: ${product.name}</p>
                    <p>price: $${(product.priceCents / 100).toFixed(2)}</p>
                    <p>rating: ${product.rating.stars} stars (${product.rating.count})</p>

                    <button>Add to Cart</button>
                </div>
            `
        });
}



function searchProduct(query) {
    searchInput.value = '';
    return products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
    );
}

await getProducts();

const searchInput = document.getElementById('search');

const searchBtn = document.getElementById('button');

searchBtn.addEventListener('click', () => {
    productsEl.innerHTML = '';
    const results = searchProduct(searchInput.value.trim());
    renderProducts(results);
});

document.getElementById('home').addEventListener('click', () => {
    productsEl.innerHTML = '';
    renderProducts(products);
})

renderProducts(products);
