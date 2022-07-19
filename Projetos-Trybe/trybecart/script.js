const classeCarrinho = '.cart__items';
const carrinho = document.querySelector(classeCarrinho);
const btnLimparCarrinho = document.querySelector('.empty-cart');
const qtCarrinho = document.querySelector('.qtCarrinho');
let chaveFiltro = '';
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

  section.className = 'item card shadow p-3 mb-5 bg-body rounded';
  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add btn', 'Adicionar ao carrinho!'));

  return section;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const round = (num, places) => {
	if (!("" + num).includes("e")) {
		return +(Math.round(num + "e+" + places)  + "e-" + places);
	} else {
		let arr = ("" + num).split("e");
		let sig = ""
		if (+arr[1] + places > 0) {
			sig = "+";
		}

		return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
	}
}

const totalizaCarrinho = () => {
  const totalCarrinho = document.querySelector('.total-price');
  let resultado = precosCarrinho.reduce((acc, curr) => acc + parseFloat(curr), 0);

  resultado = round(resultado, 2);
  resultado = resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  totalCarrinho.innerText = resultado;
};

const formataTextoLi = (texto) => {
  let objeto = texto.split(' ');
  objeto = objeto[objeto.length - 1].replace('$', '');
  objeto = objeto.replace(".","").replace(",",".")
  return objeto;
};

const remArrayPrecos = (texto) => {
  if (precosCarrinho.indexOf(parseFloat(texto)) > -1) precosCarrinho.splice(precosCarrinho.indexOf(texto), 1);
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
  precosCarrinho.push(parseFloat(objeto));
};

const createCartItemElement = ({ id, title, price, thumbnail }) => {
  const li = document.createElement('li');
  const liImage = document.createElement('img');
  const p1 = document.createElement('div');
  const p2 = document.createElement('div');
  const p3 = document.createElement('div');

  li.className = 'cart__item';
  liImage.src = thumbnail;
  li.appendChild(liImage);
  p1.innerText = `SKU: ${id}`
  li.appendChild(p1);
  p2.innerText = `${title} | `
  li.appendChild(p2);
  precosCarrinho.push(price);
  price = round(price, 2);
  price = price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  p3.innerHTML = `<span class='spanPrice'>PRICE: R$ ${price}</span>`;
  li.appendChild(p3);
  li.addEventListener('click', cartItemClickListener);

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
  carregando.style.display = 'flex';
  const dados = await fetchProducts(chaveFiltro);
  carregando.style.display = 'none';
  const telaProdutos = document.querySelector('.items');
  telaProdutos.innerHTML = '';

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
    corpoPrincipal.style.marginRight = '31.5%';
  }
};

window.onload = async () => {
  const iconeCarrinho = document.querySelector('.material-icons');
  const txtFiltro = document.querySelector('#inputFiltro');
  const param = new URLSearchParams(window.location.search);
  chaveFiltro = param.get('filtro');
  txtFiltro.value = chaveFiltro;
  if (!chaveFiltro) chaveFiltro = 'computador';

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