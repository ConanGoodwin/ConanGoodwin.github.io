const txtTarefa = document.getElementById("texto-tarefa");
const btnAttTarefa = document.getElementById("criar-tarefa");
const listaTarefa = document.getElementById("lista-tarefas");
const todosLi = document.getElementsByTagName("li");
const btnUp = document.getElementById("mover-cima");
const btnDown = document.getElementById("mover-baixo");
const meuModal = new bootstrap.Modal("#alertaModal");
const txtCorpoModal = document.querySelector(".modal-body").children[0];
let atualMarcado = document.querySelector(".marcado");
let seSalvarLista = false;
let qtLista;
let indiceElementoLista;

function destacaTarefa(evento) {
  const alvo = evento.target;
  atualMarcado = document.querySelector(".marcado");

  if (atualMarcado !== null) {
    if (alvo.className.includes("marcado") === true) {
      if (alvo.innerText === txtTarefa.value) {
        txtTarefa.value = "";
      }
      btnAttTarefa.innerText = "+";
      alvo.classList.remove("marcado");
      return false;
    }
    atualMarcado.classList.remove("marcado");
  }

  alvo.className += " marcado";
  txtTarefa.value = alvo.innerText;
  btnAttTarefa.innerText = "#";
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
  const tagLi = document.createElement("li");

  tagLi.addEventListener("click", destacaTarefa);
  tagLi.addEventListener("dblclick", marcaTarefaCompleta);
  tagLi.innerText = txtTarefa.value;
  txtTarefa.value = "";

  listaTarefa.appendChild(tagLi);
  qtLista += 1;
}

function atualizaTarefa() {
  atualMarcado = document.querySelector(".marcado");

  atualMarcado.innerText = txtTarefa.value;
  txtTarefa.value = "";
  atualMarcado.classList.remove("marcado");
  btnAttTarefa.innerText = "+";
}

function defineAttTarefa(evento) {
  const alvo = evento.target;

  if (alvo.innerText === "#") {
    atualizaTarefa();
  } else {
    addTarefa();
  }
}

function apagaTodasLi() {
  while (todosLi.length > 0) {
    listaTarefa.removeChild(todosLi[0]);
    qtLista -= 1;
  }
}

function apagaLiRiscadas() {
  for (let index = 0; index < todosLi.length; index += 1) {
    if (todosLi[index].className === "completed") {
      listaTarefa.removeChild(todosLi[index]);
      qtLista -= 1;
      index -= 1;
    }
  }
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
  atualMarcado = document.querySelector(".marcado");

  if (atualMarcado) {
    listaTarefa.removeChild(atualMarcado);
    qtLista -= 1;
    txtTarefa.value = "";
    btnAttTarefa.innerText = "+";
  }
}

function verificaTxtTarefa(evento) {
  const alvo = evento.target;
  atualMarcado = document.querySelector(".marcado");

  if (alvo.value === "") {
    btnAttTarefa.innerText = "+";
  } else {
    if (atualMarcado) {
      btnAttTarefa.innerText = "#";
    }
  }
}

window.onload = function setaPagina() {
  qtLista = 0;

  recuperaLi();
};

txtTarefa.addEventListener("keyup", verificaTxtTarefa);
btnAttTarefa.addEventListener("click", defineAttTarefa);
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
