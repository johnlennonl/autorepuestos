document.addEventListener('DOMContentLoaded', () => {
  const productDetails = document.getElementById('productDetails');
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id'));
  const brand = params.get('brand');

  console.log("Product ID:", productId);
  console.log("Brand:", brand);

  let product = null;
  if (brand === 'Hyundai' && typeof hyundaiProducts !== 'undefined') {
    product = hyundaiProducts.find(p => p.id === productId);
  } else if (brand === 'Toyota' && typeof toyotaProducts !== 'undefined') {
    product = toyotaProducts.find(p => p.id === productId);
  }

  if (product) {
    productDetails.innerHTML = `
    <div class="product-details-container row">
      <div class="product-image col-md-6">
        <img src="${product.img}" alt="${product.name}" class="img-fluid mb-3">
      </div>
      <div class="product-info col-md-6">
        <h2 class="product-title">${product.name}</h2>
        <p class="product-stock"><span class="text-success">Hay Stock</span></p>
        <p class="product-description">${product.description}</p>
        <p><strong>Código de producto:</strong> ${product.code}</p>
        <p class="product-price display-4 text-success"><strong>$${product.price}</strong></p>
        <div class="product-actions mt-3">
  <button class="btn buttonBuy" onclick="addToCart('${product.name}', ${product.price})">Comprar</button>
</div>

        <div class="product-payment-options mt-4">
          <p><i class="fas fa-university"></i> Transferencia Bancaria</p>
          <p><i class="fas fa-credit-card"></i> Pagá con Mercado Pago</p>
          <p><i class="fas fa-truck"></i> Envíos a todo el país</p>
        </div>
      </div>
    </div>
  `;
  } else {
    productDetails.innerHTML = `<p class="text-center">Producto no encontrado.</p>`;
    console.error("Producto no encontrado. Verifica que el ID y la marca sean correctos.");
  }
});

function addToCart(productName, productPrice) {
  if (!productPrice) {
    console.error("El precio del producto es inválido o no se ha proporcionado.");
    return;
  }

  Swal.fire({
    title: "¡Estás a un paso de completar tu compra!",
    html: `
      <p>Para realizar la compra se te asignará un asesor que te ayudará con la compra de <strong>${productName}</strong>.</p>
      <p>Por favor, indícanos la cantidad a comprar:</p>
      <input type="number" id="quantity" class="swal2-input" min="1" value="1" placeholder="Cantidad">
      <p><strong>Precio Total: $<span id="totalPrice">${productPrice}</span></strong></p>
    `,
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Comprar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const quantity = document.getElementById("quantity").value;
      if (!quantity || quantity <= 0) {
        Swal.showValidationMessage("Por favor, ingresa una cantidad válida.");
        return false;
      }
      return { quantity: parseInt(quantity) };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const quantity = result.value.quantity;
      const totalPrice = productPrice * quantity;
      const whatsappMessage = `Hola, quisiera completar el pago de este producto: ${productName}. Cantidad: ${quantity}. Precio total: $${totalPrice}`;
      const whatsappUrl = `https://wa.me/584126581304?text=${encodeURIComponent(whatsappMessage)}`;
      
      window.open(whatsappUrl, "_blank");
    }
  });

  // Actualizar el precio en tiempo real según la cantidad
  document.getElementById("quantity").addEventListener("input", function () {
    const quantity = this.value;
    const totalPrice = productPrice * quantity;
    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
  });
}

