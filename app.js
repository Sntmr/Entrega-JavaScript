
// CaféWorld – Simulador Interactivo

// Arrays
const bebidas = [
  { nombre: 'Café solo', precio: 50 },
  { nombre: 'Capuccino', precio: 70 },
  { nombre: 'Latte', precio: 65 }
];

const extrasList = [
  'Leche descremada',
  'Jarabe de vainilla',
  'Crema batida'
];

const CART_KEY = 'cafeworld_cart';
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

// Elementos del DOM
const form = document.getElementById('form-pedido');
const selectBebida = form.querySelector('#bebida');
const fieldsetExtras = form.querySelector('fieldset');
const cartTableBody = document.querySelector('#cart-table tbody');
const clearBtn = document.getElementById('clear-cart');

function populateForm() {
  fieldsetExtras.innerHTML = '<legend>Extras ($10 c/u)</legend>';

  extrasList.forEach(extra => {
    const label = document.createElement('label');
    const chk   = document.createElement('input');
    chk.type    = 'checkbox';
    chk.name    = 'extras';
    chk.value   = extra;
    label.appendChild(chk);
    label.append(` ${extra}`);
    fieldsetExtras.appendChild(label);
  });
}
  // Checkbox de extras
  extrasList.forEach(extra => {
    const label = document.createElement('label');
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.name = 'extras';
    chk.value = extra;
    label.appendChild(chk);
    label.append(` ${extra}`);
    fieldsetExtras.appendChild(label);
  });

function renderCart() {
  cartTableBody.innerHTML = '';
  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.bebida}</td>
      <td>${item.cantidad}</td>
      <td>${item.extras.join(', ') || 'Ninguno'}</td>
      <td>$${item.total}</td>
    `;
    cartTableBody.appendChild(row);
  });
}

/* Guardar carrito en LocalStorage */
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/**
 * 7. Cálculo de total usando datos del objeto
 */
function calcularTotal(item) {
  return item.precio * item.cantidad + item.extras.length * 10;
}

/* Eventos */

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  populateForm();
  renderCart();
});

// Al enviar el formulario
form.addEventListener('submit', event => {
  event.preventDefault();
  console.log('▶ Formulario enviado');
  const bebida = selectBebida.value;
  const precio = parseInt(selectBebida.selectedOptions[0].dataset.precio, 10);
  const cantidad = parseInt(form.cantidad.value, 10);
  const extras = Array.from(form.extras)
    .filter(chk => chk.checked)
    .map(chk => chk.value);

  const item = { bebida, precio, cantidad, extras };
  item.total = calcularTotal(item);

  cart.push(item);
  saveCart();
  renderCart();
  form.reset();
});

// Al vaciar carrito
clearBtn.addEventListener('click', () => {
  cart = [];
  saveCart();
  renderCart();
});