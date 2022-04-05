let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/


let arrayComparison = [];

document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer
var interval;
var iconsFind = document.getElementsByClassName('find');
var modale = document.getElementById('modal');
var timer = document.getElementsByClassName('timer')[0];


///PARTE UNO
//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
// una funzione che rimuove la classe active e chiama la funzione startGame()
function playAgain() {
    modale.classList.remove('active');
    startGame();
}
// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto

function startGame() {
    contatore = 0;
    //pulisco il timer
    clearInterval(interval);
    arrayComparison = [];
    //mescolo l'array degli animali
    var arrayShuffle = shuffle(arrayAnimali);

    let lista = document.getElementById('griglia');

    //se lista contine elementi la ripulisco
    for (let i = lista.children.length - 1; i >= 0; i--) {
        lista.removeChild(lista.children[i]);
    }
    // appnedo contenitore ed elemento, inserendo l'animale
    for (let i = 0; i < 24; i++) {
        let contenitore = document.createElement('div');
        let elemento = document.createElement('div');
        elemento.className = 'icon';
        document.getElementById('griglia').appendChild(contenitore).appendChild(elemento);
        elemento.innerHTML = arrayShuffle[i];
    }

    startTimer();
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

    for (var i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", displayIcon);
        icons[i].addEventListener("click", apriModale);
    }

}


var contatore = 0;

function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show
    this.classList.toggle("show");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        contatore++;
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function (item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function () {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function (item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
function apriModale() {
    if (iconsFind.length == 24) {
        clearInterval(interval);
        modale.classList.add('active');
        document.getElementById('tempoTrascorso').innerHTML = timer.innerHTML + `, ed hai effettuato ${contatore} confronti.`;
        chiudiModale();
    }
}
// una funzione che nasconde la modale alla fine e riavvia il gioco
let closebtn = document.querySelector('div p input');
function chiudiModale() {
    closebtn.addEventListener("click", function (e) {
        modale.classList.remove("active");
        startGame();
    });
}
// una funzione che calcola il tempo e aggiorna il contenitore sotto
function startTimer() {

    let s = 0;
    let m = 0;
    let h = 0;

    interval = setInterval(function () {
        timer.innerHTML = 'Tempo: ' + m + " min " + s + " sec";
        s++;
        if (s == 60) {
            m++;
            s = 0;
        }
        if (m == 60) {
            h++;
            m = 0;
        }
    }, 1000);
}