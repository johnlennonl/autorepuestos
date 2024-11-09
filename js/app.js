document.addEventListener('DOMContentLoaded', () => {
    const toyotaContainer = document.getElementById('toyotaContainer');
    const hyundaiContainer = document.getElementById('hyundaiContainer');

    if (!toyotaContainer || !hyundaiContainer) {
        console.error("No se encontraron los contenedores para Toyota o Hyundai en el DOM.");
        return;
    }

    // Verificar los datos
    console.log("Toyota Products:", toyotaProducts);
    console.log("Hyundai Products:", hyundaiProducts);

    toyotaProducts.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4', 'product-card');
        card.innerHTML = `
            <div class="card">
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn buttonSell" onclick="redirectToProduct(${product.id}, '${product.brand}')">Ver Detalles</button>
                </div>
            </div>
        `;
        toyotaContainer.appendChild(card);
    });

    hyundaiProducts.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4', 'product-card');
        card.innerHTML = `
            <div class="card">
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn buttonSell" onclick="redirectToProduct(${product.id}, '${product.brand}')">Ver Detalles</button>
                </div>
            </div>
        `;
        hyundaiContainer.appendChild(card);
    });
});


function redirectToProduct(id, brand) {
    window.location.href = `productDetails.html?id=${id}&brand=${brand}`;
}


