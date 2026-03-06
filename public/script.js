const MIDA = 100;
const FILES = 3;
const COLS = 4;
let moviments = 0;
let jocAcabat = false;

// Matriu 3x4 (11 peces + el 0 que és el buit)
let tauler = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 0]
];

const container = document.getElementById('puzzle-container');

function crearPecesDOM() {
    container.innerHTML = "";
    // Ara n'hi ha 11 peces (l'espai 12 és el 0)
    for (let i = 1; i <= 11; i++) {
        const div = document.createElement('div');
        div.id = `peca-${i}`;
        div.classList.add('peca');
        
        // Càlcul de la posició original per a la imatge (3x4)
        const filaOriginal = Math.floor((i - 1) / COLS);
        const colOriginal = (i - 1) % COLS;
        
        div.style.backgroundPosition = `-${colOriginal * MIDA}px -${filaOriginal * MIDA}px`;
        
        div.onclick = () => clicarPeca(i);
        container.appendChild(div);
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
    // Reset de la matriu a estat resolt per seguretat
    tauler = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 0]
    ];
    
    for (let i = 0; i < 200; i++) {
        const buit = trobarPosicio(0);
        const adjacents = [];
        
        // Lògica de límits per a 3 files i 4 columnes
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
    // Generem l'string esperat per a un 3x4: "1,2,3,4,5,6,7,8,9,10,11,0"
    const resolt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0].join(",");
    const actual = tauler.flat().join(",");
    
    if (actual === resolt && moviments > 0) {
        jocAcabat = true;
        document.getElementById('missatge').innerText = `Resolt en ${moviments} moviments!`;
    }
}

init();