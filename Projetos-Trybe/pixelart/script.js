const corPincel = document.getElementById('pincel');
const corPaleta = document.getElementsByClassName('color');
const txtTamanho = document.getElementById('board-size');
const quadroPixel = document.getElementById('pixel-board');
const todosPixels = document.getElementsByClassName('pixel');

corPaleta[0].className += ' selected';
corPincel.className = 'black';

function selecionaCor(evento) {
  const divAreceberSelecao = evento.target;
  const corSelecionadaAtual = document.querySelector('.selected');

  corSelecionadaAtual.classList.remove('selected');
  corPincel.className = divAreceberSelecao.className.replace('color ', '');
  divAreceberSelecao.classList.add('selected');
}

function pintaPixel(evento) {
  const alvo = evento.target;
  const cor = document.querySelector('.selected');

  alvo.className = `pixel${cor.className
    .replace('color', '')
    .replace(' selected', '')}`;
}

function limpaTodosPixels() {
  for (let index = 0; index < todosPixels.length; index += 1) {
    todosPixels[index].className = 'pixel white';
  }
}

function criaTag(tipo, id, classe) {
  const tag = document.createElement(tipo);

  if (id !== '') {
    tag.id = id;
  }

  if (classe !== '') {
    tag.className = classe;
  }

  return tag;
}

function geraGradePixels(pixelBaseAltura) {
  quadroPixel.style.width = `${40 * pixelBaseAltura + 2 * pixelBaseAltura}px`;

  for (let index = 1; index <= pixelBaseAltura ** 2; index += 1) {
    const tagPixel = criaTag('div', '', 'pixel white');
    tagPixel.addEventListener('click', pintaPixel);

    quadroPixel.appendChild(tagPixel);
  }
}

function novaGradePixels() {
  if (txtTamanho.value === '') {
    window.alert('Board inválido!');
  } else {
    if (parseInt(txtTamanho.value) < 5) {
      txtTamanho.value = 5;
    } else if (parseInt(txtTamanho.value) > 50) {
      txtTamanho.value = 50;
    }

    while (todosPixels.length > 0) {
      quadroPixel.removeChild(todosPixels[0]);
    }

    geraGradePixels(parseInt(txtTamanho.value));
  }
}

function geraInteiroRandomicoRGB() {
  const UnidadeR = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
  const UnidadeG = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
  const UnidadeB = Math.floor(Math.random() * (255 - 0 + 1)) + 0;

  return `rgb(${UnidadeR}, ${UnidadeG}, ${UnidadeB})`;
}

function corAleatoriaPaleta() {
  const sheetList = document.styleSheets[0];

  for (let index = 1; index < corPaleta.length; index += 1) {
    corPaleta[index].className = `color corAleatoria${index}`;
    sheetList.insertRule(`.corAleatoria${index} { background-color: ${geraInteiroRandomicoRGB()}; }`, 0);
  }
}

window.onload = function () {
  const btnLimpar = document.getElementById('clear-board');
  const btnTamanho = document.getElementById('generate-board');

  btnLimpar.innerText = 'Limpar';
  btnLimpar.addEventListener('click', limpaTodosPixels);
  btnTamanho.addEventListener('click', novaGradePixels);

  for (let index = 0; index < corPaleta.length; index += 1) {
    corPaleta[index].addEventListener('click', selecionaCor);
  }

  corAleatoriaPaleta();

  geraGradePixels(5);
};
