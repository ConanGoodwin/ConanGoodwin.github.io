const fetchItem = async (id) => {
  // seu código aqui
  if (!id) return new Error('You must provide an url');

  const url = `https://api.mercadolibre.com/items/${id}`;
  const resultado = await fetch(url);
  const dados = await resultado.json();

  return dados;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
