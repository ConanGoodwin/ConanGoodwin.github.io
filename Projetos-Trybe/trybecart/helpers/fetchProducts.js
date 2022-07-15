const fetchProducts = async (typeProduct) => {
  // seu código aqui
  if (!typeProduct) return new Error('You must provide an url');

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${typeProduct}`;
  const resposta = await fetch(url);
  const dados = await resposta.json();

  return dados;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
