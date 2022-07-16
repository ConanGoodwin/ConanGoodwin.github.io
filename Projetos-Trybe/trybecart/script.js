const classeCarrinho = '.cart__items';
const carrinho = document.querySelector(classeCarrinho);
const btnLimparCarrinho = document.querySelector('.empty-cart');
let precosCarrinho = [];

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');

  section.className = 'item card';
  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add btn', 'Adicionar ao carrinho!'));

  return section;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const totalizaCarrinho = () => {
  const totalCarrinho = document.querySelector('.total-price');

  totalCarrinho.innerText = precosCarrinho.reduce((acc, curr) => acc + parseFloat(curr), 0);
};

const formataTextoLi = (texto) => {
  let objeto = texto.split(' ');
  objeto = objeto[objeto.length - 1].replace('$', '');
  return objeto;
};

const remArrayPrecos = (texto) => {
  if (precosCarrinho.indexOf(texto) > -1) precosCarrinho.splice(precosCarrinho.indexOf(texto), 1);
};

const cartItemClickListener = async (event) => {
  // coloque seu código aqui
  await remArrayPrecos(formataTextoLi(event.target.innerText));
  await totalizaCarrinho();
  carrinho.removeChild(event.target);
  saveCartItems(carrinho);
};

const addArrayPrecos = (texto) => {
  objeto = formataTextoLi(texto);
  precosCarrinho.push(objeto);
};

const createCartItemElement = ({ id, title, price, thumbnail }) => {
  const li = document.createElement('li');
  const liImage = document.createElement('img');
  const p1 = document.createElement('div');

  li.className = 'cart__item';
  liImage.src = thumbnail;
  li.appendChild(liImage);
  p1.innerText = `SKU: ${id}`
  li.appendChild(p1);
  li.innerHTML += `${title} | <span class='spanPrice'>PRICE: R$ ${price}</span>`;
  li.addEventListener('click', cartItemClickListener);
  addArrayPrecos(li.innerText);

  return li;
};

async function addItemCar(event) {
  const alvo = event.target;
  const idProduto = alvo.parentElement.firstChild.innerText;
  const itemAdd = await fetchItem(idProduto);

  carrinho.appendChild(createCartItemElement(itemAdd));
  totalizaCarrinho();
  saveCartItems(carrinho);
}

async function montaListaProdutos() {
  const carregando = document.querySelector('.loading');
  const dados = await fetchProducts('computador');
  carregando.parentElement.removeChild(carregando);
  const telaProdutos = document.querySelector('.items');

  dados.results.forEach((item) => {
    const produto = createProductItemElement(item);

    telaProdutos.appendChild(produto);
  });
}

function montaEventoBtnAddCarrinho() {
  const btnAddCarrinho = document.querySelectorAll('.item__add');

  btnAddCarrinho.forEach((btn) => btn.addEventListener('click', addItemCar));
}

async function montaCarrinhoInicial() {
  const newList = getSavedCartItems();
  carrinho.innerHTML = newList;
  const lisCarrinho = document.getElementsByClassName('cart__item');

  for (let index = 0; index < lisCarrinho.length; index += 1) {
    lisCarrinho[index].addEventListener('click', cartItemClickListener);
    addArrayPrecos(lisCarrinho[index].innerText);
  }
}

const showUnshowCart = () => {
  const menuCarrinho = document.querySelector('.container-cartTitle');
  const cabecalho = document.querySelector('.container-title');
  const corpoCarrinho = document.querySelector('.cart');
  const corpoPrincipal = document.querySelector('.items');

  if (menuCarrinho.style.display !== 'none') {
    menuCarrinho.style.display = 'none';
    cabecalho.style.width = '100%';
    corpoCarrinho.style.display = 'none';
    corpoPrincipal.style.flexBasis = '100%';
    corpoPrincipal.style.marginRight = '0';
  } else {
    menuCarrinho.style.display = 'flex';
    cabecalho.style.width = '80%';
    corpoCarrinho.style.display = 'flex';
    corpoPrincipal.style.flexBasis = '70%';
    corpoPrincipal.style.marginRight = '32%';
  }
};

window.onload = async () => {
  const iconeCarrinho = document.querySelector('.material-icons');

  await montaListaProdutos();
  await montaCarrinhoInicial();
  await montaEventoBtnAddCarrinho();
  btnLimparCarrinho.addEventListener('click', () => {
    carrinho.innerHTML = '';
    precosCarrinho = [];
    totalizaCarrinho();
    saveCartItems(carrinho);
  });
  iconeCarrinho.addEventListener('click', showUnshowCart);
  totalizaCarrinho();
};
//codando