let divOnibusOculto = document.getElementById("onibusOculto");
let divCarroOculto = document.getElementById("carroOculto");
let spanCensura = document.getElementsByClassName("censura");
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('name');

function loadImage() {
  let senha = document.querySelector("#name").value;

  if (myParam != "churrasco") {
    for (let chave in spanCensura) {
      spanCensura[chave].innerText = " <BLOQUEADO> ";
      spanCensura[chave].src = "";
      spanCensura[chave].alt = " <BLOQUEADO> ";
    }
  }
}

divCarroOculto.style.display = "none";
divOnibusOculto.style.display = "none";
acertaTopoIndice();
window.onresize = function acertaTopoIndiceResize() {
  acertaTopoIndice();
};

function desbloqueiaConteudo() {
  let spanCensura = document.getElementsByClassName("censura");
  let senha = document.querySelector("#name").value;

  if (senha == "churrasco") {
    console.log(senha);
    for (let chave in spanCensura) {
      spanCensura[chave].removeAttribute("innerText");
      spanCensura[chave].removeAttribute("src");
      spanCensura[chave].removeAttribute("alt");
    }
  }
}

function acertaTopoIndice() {
  let topoMain = document.getElementById("indice");
  let tamanhoCabecalho = document.getElementsByTagName("header")[0];

  topoMain.style.marginBottom = tamanhoCabecalho.offsetHeight + 10 + "px";
  console.log(tamanhoCabecalho.offsetHeight + 10 + "px");
}

function escondeDiv(transporte) {
  let divTransporte = document.getElementById(transporte);
  let divOculto = document.getElementById(transporte + "Oculto");
  let divTransporteInverso;
  let divOcultoInverso;
  let transporteInverso;

  if (transporte === "onibus") {
    divTransporteInverso = document.getElementById("carro");
    divOcultoInverso = document.getElementById("carroOculto");
    transporteInverso = "carro";
  } else {
    divTransporteInverso = document.getElementById("onibus");
    divOcultoInverso = document.getElementById("onibusOculto");
    transporteInverso = "onibus";
  }

  if (divTransporte.style.display == "") {
    atualizaOlho(transporte + "Olho", "./Icones/invisivel.png");
    divTransporte.style.display = "none";
    divOculto.style.display = "";

    atualizaOlho(transporteInverso + "Olho", "./Icones/visivel.png");
    divTransporteInverso.style.display = "";
    divOcultoInverso.style.display = "none";
  }
}

function mostraEscondeDiv(transporte) {
  let divTransporte = document.getElementById(transporte);
  let divOculto = document.getElementById(transporte + "Oculto");

  if (mostraEscondeOlho(transporte + "Olho")) {
    divTransporte.style.display = "none";
    divOculto.style.display = "";
  } else {
    divTransporte.style.display = "";
    divOculto.style.display = "none";
  }
}

function atualizaOlho(tipoOlho, caminho) {
  let iconeOlho = document.getElementsByClassName(tipoOlho);
  let caminhoIcone = iconeOlho[0].src;

  for (let chave in iconeOlho) {
    iconeOlho[chave].src = caminho;
  }
}

function mostraEscondeOlho(tipoOlho) {
  let iconeOlho = document.getElementsByClassName(tipoOlho);
  let caminhoIcone = iconeOlho[0].src;

  if (caminhoIcone.indexOf("/in") === -1) {
    // iconeOlho[chave].src = "./Icones/invisivel.png";
    atualizaOlho(tipoOlho, "./Icones/invisivel.png");
  } else {
    // iconeOlho[chave].src = "./Icones/visivel.png";
    atualizaOlho(tipoOlho, "./Icones/visivel.png");
  }

  if (caminhoIcone.indexOf("/in") === -1) {
    return true;
  }
  return false;
}
