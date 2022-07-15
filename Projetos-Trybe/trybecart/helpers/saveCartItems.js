const saveCartItems = (carrinho) => {
  // seu código aqui
  localStorage.setItem('cartItems', carrinho.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
