const MIDA = 100;
const FILES = 3;
const COLS = 4;
let moviments = 0;
let jocAcabat = false;

let tauler = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 0]
];

const container = document.getElementById('puzzle-container');
const txtMoviments = document.getElementById('comptador');
const txtMissatge = document.getElementById('missatge');
const btnReset = document.getElementById('btn-reset');

function init() {
    crearPecesDOM();
    btnReset.onclick = iniciarJoc;
    iniciarJoc();
}

function iniciarJoc() {
    moviments = 0;
    jocAcabat = false;
    if(txtMoviments) txtMoviments.innerText = "0";
    if(txtMissatge) txtMissatge.innerText = "";
    barrejar();
    dibuixar();
}

function crearPecesDOM() {
    container.innerHTML = "";
    for (let i = 1; i <= 11; i++) {
        const div = document.createElement('div');
        div.id = `peca-${i}`;
        div.classList.add('peca');
        
        const filaOriginal = Math.floor((i - 1) / COLS);
        const colOriginal = (i - 1) % COLS;
        
        div.style.backgroundPosition = `-${colOriginal * MIDA}px -${filaOriginal * MIDA}px`;
        
        div.onclick = () => clicarPeca(i);
        container.appendChild(div);
    }
}

// AQUESTA FUNCIÓ S'EXECUTA QUAN ES CLICA UNA PEÇA, COMPROVA SI ES POT MOURE I ACTUALITZA EL TAULER:
function clicarPeca(num) {
    if (jocAcabat) return;

    const pBuit = trobarPosicio(0);
    const pPeca = trobarPosicio(num);

    const df = Math.abs(pPeca.f - pBuit.f);
    const dc = Math.abs(pPeca.c - pBuit.c);

    if (df + dc === 1) {
        tauler[pBuit.f][pBuit.c] = num;
        tauler[pPeca.f][pPeca.c] = 0;
        
        moviments++;
        if(txtMoviments) txtMoviments.innerText = moviments;
        dibuixar();
        comprovarVictoria();
    }
}

function dibuixar() {
    for (let f = 0; f < FILES; f++) {
        for (let c = 0; c < COLS; c++) {
            const valor = tauler[f][c];
            if (valor !== 0) {
                const p = document.getElementById(`peca-${valor}`);
                p.style.transform = `translate(${c * MIDA}px, ${f * MIDA}px)`;
            }
        }
    }
}

function trobarPosicio(n) {
    for (let f = 0; f < FILES; f++) {
        for (let c = 0; c < COLS; c++) {
            if (tauler[f][c] === n) return { f, c };
        }
    }
    return null;
}

function barrejar() {
    tauler = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 0]];
    for (let i = 0; i < 200; i++) {
        const buit = trobarPosicio(0);
        const adjacents = [];
        if (buit.f > 0) adjacents.push({f: buit.f - 1, c: buit.c});
        if (buit.f < FILES - 1) adjacents.push({f: buit.f + 1, c: buit.c});
        if (buit.c > 0) adjacents.push({f: buit.f, c: buit.c - 1});
        if (buit.c < COLS - 1) adjacents.push({f: buit.f, c: buit.c + 1});
        
        const randomPos = adjacents[Math.floor(Math.random() * adjacents.length)];
        const valor = tauler[randomPos.f][randomPos.c];
        tauler[buit.f][buit.c] = valor;
        tauler[randomPos.f][randomPos.c] = 0;
    }
}

function comprovarVictoria() {
    const resolt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0].join(",");
    const actual = tauler.flat().join(",");
    if (actual === resolt && moviments > 0) {
        jocAcabat = true;
        if(txtMissatge) txtMissatge.innerText = `Resolt en ${moviments} moviments!`;
    }
}

// CRIDEM LA FUNCIÓ PER COMENÇAR
init();