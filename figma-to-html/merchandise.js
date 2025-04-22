let cart = [];

const updateCart = () => {
  const cartList = document.getElementById('cart-items');
  const totalElem = document.getElementById('cart-total');
  cartList.innerHTML = '';

  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price}`;

    // Tombol cancel per item
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '❌';
    cancelBtn.style.marginLeft = '10px';
    cancelBtn.style.color = 'red';
    cancelBtn.style.border = 'none';
    cancelBtn.style.background = 'transparent';
    cancelBtn.style.cursor = 'pointer';

    cancelBtn.addEventListener('click', () => {
      cart.splice(index, 1);
      updateCart();
    });

    li.appendChild(cancelBtn);
    cartList.appendChild(li);

    // Hitung total harga
    const cleanPrice = parseInt(item.price.replace(/[^\d]/g, ''));
    total += cleanPrice;
  });

  if (totalElem) {
    totalElem.textContent = `Total: Rp ${total.toLocaleString()}`;
  }
};

// Tambahkan item ke cart
document.querySelectorAll('.buy-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const product = btn.parentElement;
    const name = product.querySelector('h3').textContent;
    const price = product.querySelector('.price').textContent;

    cart.push({ name, price });
    updateCart();
  });
});

// Tombol "Clear All"
const clearBtn = document.getElementById('clear-btn');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    cart = [];
    updateCart();
  });
}

// Checkout form toggle — ganti sesuai tombol baru yang kamu pakai
const showFormBtn = document.getElementById('show-checkout-form');
const checkoutForm = document.getElementById('checkout-form');
if (showFormBtn && checkoutForm) {
  showFormBtn.addEventListener('click', () => {
    checkoutForm.style.display = 'block';
  });
}

// Submit form pengiriman
const shippingForm = document.getElementById('shipping-form');
if (shippingForm) {
  shippingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const telepon = document.getElementById('telepon').value;
    const catatan = document.getElementById('catatan').value;

    alert(`Pesanan untuk ${nama} sudah dikirim ke:\n${alamat}\nNo HP: ${telepon}\nCatatan: ${catatan || '-'}`);

    // Reset form dan cart (jika perlu)
    shippingForm.reset();
    cart = [];
    updateCart();
    if (checkoutForm) checkoutForm.style.display = 'none';
  });
}
