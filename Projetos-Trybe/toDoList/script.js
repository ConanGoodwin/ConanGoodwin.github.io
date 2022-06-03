const listaTarefa = document.getElementById("lista-tarefas");
const todosLi = document.getElementsByTagName("li");
const btnUp = document.getElementById("mover-cima");
const btnDown = document.getElementById("mover-baixo");
const meuModal = new bootstrap.Modal("#alertaModal");
const txtCorpoModal = document.querySelector(".modal-body").children[0];
let seSalvarLista = false;
let qtLista;

function posicaoBotoesNav() {
  const imgLapis = document.getElementById("imgLapis");

  imgLapis.style.height = `${qtLista * 10 + 150}px`;
}

function destacaTarefa(evento) {
  const alvo = evento.target;

  for (let index = 0; index < todosLi.length; index += 1) {
    todosLi[index].className = todosLi[index].className
      .replace("marcado", "")
      .replace(" ", "");
  }

  alvo.className += " marcado";
}

function marcaTarefaCompleta(evento) {
  const alvo = evento.target;

  if (!alvo.className.includes("completed")) {
    alvo.className = "completed";
  } else {
    alvo.className = "";
  }
}

function addTarefa() {
  const txtTarefa = document.getElementById("texto-tarefa");
  const tagLi = document.createElement("li");

  tagLi.addEventListener("click", destacaTarefa);
  tagLi.addEventListener("dblclick", marcaTarefaCompleta);
  tagLi.innerText = txtTarefa.value;
  txtTarefa.value = "";

  listaTarefa.appendChild(tagLi);
  qtLista += 1;
  posicaoBotoesNav();
}

function apagaTodasLi() {
  while (todosLi.length > 0) {
    listaTarefa.removeChild(todosLi[0]);
    qtLista -= 1;
  }
  posicaoBotoesNav();
}

function apagaLiRiscadas() {
  for (let index = 0; index < todosLi.length; index += 1) {
    if (todosLi[index].className === "completed") {
      listaTarefa.removeChild(todosLi[index]);
      qtLista -= 1;
      index -= 1;
    }
  }
  posicaoBotoesNav();
}

function exibeModal(evento) {
  const alvo = evento.target;

  if (alvo.id === "salvar-tarefas") {
    txtCorpoModal.innerHTML =
      '<span style="color: red;">Atenção!</span> A lista atual será salva na memória, inclusive listas vazias, <span style="color: red;">substituindo qualquer lista previamente salva!</span>';
    seSalvarLista = true;
  } else {
    txtCorpoModal.innerHTML =
      '<span style="color: red;">Atenção!</span> Caso confirme a alteração, a lista atual será toda apagada, <span style="color: red;">mas as alterações não ficarão gravadas na memória!</span>';
    salvaLista = false;
  }
  meuModal.show();
}

function salvaLista() {
  localStorage.clear();

  for (let index = 0; index < todosLi.length; index += 1) {
    localStorage.setItem(`txtLi${index}`, todosLi[index].innerText);
    localStorage.setItem(`classeLi${index}`, todosLi[index].className);
  }
}

function btnModalSave() {
  if (seSalvarLista) {
    salvaLista();
  } else {
    apagaTodasLi();
  }

  meuModal.hide();
}

function recuperaLi() {
  qtLista = 0;
  if (localStorage.length > 0) {
    for (let index = 0; index < localStorage.length / 2; index += 1) {
      const tagLi = document.createElement("li");
      tagLi.innerHTML = localStorage.getItem(`txtLi${index}`);
      tagLi.className = localStorage.getItem(`classeLi${index}`);
      tagLi.addEventListener("click", destacaTarefa);
      tagLi.addEventListener("dblclick", marcaTarefaCompleta);
      listaTarefa.appendChild(tagLi);
      qtLista += 1;
    }
  }
  posicaoBotoesNav();
}

function sobeLi() {
  const tagTemp = document.querySelector(".marcado");

  if (tagTemp) {
    const tagInsercao = tagTemp.previousElementSibling;

    if (tagInsercao) {
      listaTarefa.insertBefore(tagTemp, tagInsercao);
    }
  }
}

function desceLi() {
  const tagTemp = document.querySelector(".marcado");

  if (tagTemp) {
    const tagInsercao = tagTemp.nextElementSibling;

    if (tagInsercao) {
      listaTarefa.insertBefore(tagTemp, tagInsercao.nextElementSibling);
    } else {
      listaTarefa.appendChild(tagTemp);
    }
  }
}

function removeMarcado() {
  const tagTemp = document.querySelector(".marcado");

  if (tagTemp) {
    listaTarefa.removeChild(tagTemp);
    qtLista -= 1;
    posicaoBotoesNav();
  }
}

window.onload = function setaPagina() {
  qtLista = 0;

  recuperaLi();
};

document.getElementById("criar-tarefa").addEventListener("click", addTarefa);
document.getElementById("apaga-tudo").addEventListener("click", exibeModal);
document
  .getElementById("remover-finalizados")
  .addEventListener("click", apagaLiRiscadas);
document.getElementById("salvar-tarefas").addEventListener("click", exibeModal);
document.getElementById("btnSave").addEventListener("click", btnModalSave);
btnUp.addEventListener("click", sobeLi);
btnDown.addEventListener("click", desceLi);
document
  .getElementById("remover-selecionado")
  .addEventListener("click", removeMarcado);
