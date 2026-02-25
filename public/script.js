"use strict";

const midaCasella = 100;
const numFiles = 3;
const numColumnes = 3;

let posicioActual = {
  fila: 0,
  columna: 0
};

function init() {
  const refTauler = document.querySelector(".tauler");
  const refReset = document.getElementById("refReset");

  // Definir els valors de les variables CSS
  const refCSSRoot = document.documentElement;
  refCSSRoot.style.setProperty("--mida", midaCasella + "px");
  refCSSRoot.style.setProperty("--files", numFiles);
  refCSSRoot.style.setProperty("--columnes", numColumnes);

  // Afegir caselles al tauler
  for (let fila = 0; fila < numFiles; fila++) {
    for (let columna = 0; columna < numColumnes; columna++) {

      const refCasella = document.createElement("div");
      refCasella.classList.add("casella");
      refCasella.addEventListener("click", () => mouFitxa(fila, columna));
      refCasella.textContent = `${fila * numColumnes + columna}`;
      refCasella.style.left = `${columna * midaCasella}px`;
      refCasella.style.top = `${fila * midaCasella}px`;
      refTauler.appendChild(refCasella);
      
    }
  }

  // Afegir fitxa al tauler
  var refFitxa = document.createElement("div");
  refFitxa.classList.add("fitxa");
  refTauler.appendChild(refFitxa);

  // Afegir event al botó de reset
  refReset.addEventListener("click", reset);

  mouFitxa(1, 1);
}

function mouFitxa(fila, columna) {
  // Actualitzar posició actual
  posicioActual.fila = fila;
  posicioActual.columna = columna;

  // Moure fitxa a la nova posició
  posicionaFitxa();
}

function posicionaFitxa() {
  const refFitxa = document.querySelector(".fitxa");
  const refInfo = document.getElementById("refInfo");

  refFitxa.style.transform = `translate(${posicioActual.columna * midaCasella}px, ${posicioActual.fila * midaCasella}px)`;
  refInfo.textContent = `Fila: ${posicioActual.fila}, Columna: ${posicioActual.columna}`;
}

function reset() {

  posicioActual.fila = 1;
  posicioActual.columna = 1;

  posicionaFitxa();
}