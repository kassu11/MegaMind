let pohja = document.getElementById("pohja");
let kohde;
let kyseinenRuutu = 5;
let valitutVarit = [];
let kaikkiVarit = ["sininen", "vihree", "keltanen", "oranssi", "punanen", "ruskea"];
let arvatutVarit = [];

function luoVarit() {
  let kopio = kaikkiVarit.slice();
  valitutVarit = [];
  for(let i = 0; i < 4; i++) {
    valitutVarit.push(kopio.splice(Math.floor(Math.random() * kopio.length), 1)[0]);
  }
}

aloitaAlusta();

pohja.addEventListener("click", painaVari);
function painaVari(e) {
  if(e.target.classList.contains("vari") && e.target.parentNode.id == `rivi${kyseinenRuutu}`) {
    if(kohde) kohde.classList.remove("valittu");
    e.target.classList.add("valittu");
    if(document.getElementById("variValita")) document.getElementById("variValita").remove();
    kohde = e.target;
  
    let variValita = document.createElement("div");
    variValita.id = "variValita";
    variValita.classList.add("variValinta");
  
    let sininen = document.createElement("div");
    sininen.classList.add("sininen");
    variValita.appendChild(sininen);
  
    let vihree = document.createElement("div");
    vihree.classList.add("vihree");
    variValita.appendChild(vihree);
  
    let keltanen = document.createElement("div");
    keltanen.classList.add("keltanen");
    variValita.appendChild(keltanen);
  
    let oranssi = document.createElement("div");
    oranssi.classList.add("oranssi");
    variValita.appendChild(oranssi);
  
    let punanen = document.createElement("div");
    punanen.classList.add("punanen");
    variValita.appendChild(punanen);
  
    let ruskea = document.createElement("div");
    ruskea.classList.add("ruskea");
    variValita.appendChild(ruskea);

    for(let i = 0; i < 6; i++) {
      if(arvatutVarit.indexOf(variValita.childNodes[i].classList[0]) !== -1) {
        variValita.childNodes[i].classList.add("variJoKaytossa");
      }
    }
  
    pohja.appendChild(variValita);
  }
  else if(e.target.parentNode.id == "variValita") {
    if(e.target.classList.contains("variJoKaytossa")) {
      e.target.classList.remove("variJoKaytossa");
      for(let i = 0; i < 4; i++) {
        if(document.getElementById(`rivi${kyseinenRuutu}`).childNodes[i].classList.contains(e.target.classList[0])) {
          document.getElementById(`rivi${kyseinenRuutu}`).childNodes[i].classList.remove(e.target.classList[0]);
          document.getElementById(`rivi${kyseinenRuutu}`).childNodes[i].classList.add(kohde.classList[1]);
          document.getElementById(`rivi${kyseinenRuutu}`).childNodes[i].classList.remove("valittu");
        }
        
        if(arvatutVarit[i] == e.target.classList[0]) arvatutVarit[i] = kohde.classList[1];
        if(arvatutVarit[i] == "valittu") {
          arvatutVarit[i] = null;    
        }
      } 
    }
    kohde.classList.remove("sininen", "vihree", "keltanen", "oranssi", "punanen", "ruskea", "valittu");
    kohde.classList.add(e.target.classList);
    document.getElementById("variValita").remove();
    Array.from(document.getElementById(`rivi${kyseinenRuutu}`).childNodes).indexOf(kohde);
    arvatutVarit[Array.from(document.getElementById(`rivi${kyseinenRuutu}`).childNodes).indexOf(kohde)] = e.target.classList[0];

    if(testaaTaytettuRuutu()) document.getElementById("pelaaNappi").classList.remove("eiVapaana");
  }
  else {
    if(kohde) kohde.classList.remove("valittu");
    if(document.getElementById("variValita")) document.getElementById("variValita").remove();
  }
}

function testaaTaytettuRuutu() {
  for(let a of arvatutVarit) {
    if(a == undefined) return false;
  } if(arvatutVarit.length < 4) return false;
  return true;
}

function pelaa() {
  if(testaaTaytettuRuutu() == false) return;
  document.getElementById("pelaaNappi").classList.add("eiVapaana");

  let kopio = arvatutVarit.slice();
  for(let i = 0; 0 < kopio.length && i < 100; i++) {
    let num = Math.floor(Math.random() * kopio.length);
    let vari = kopio.splice(num, 1)[0];
    if(valitutVarit.indexOf(vari) !== -1) {
      if(valitutVarit.indexOf(vari) == arvatutVarit.indexOf(vari)) {
        let arvaus = document.createElement("div");
        arvaus.classList.add("arvausB");
        document.getElementById(`arvausBox${kyseinenRuutu}`).appendChild(arvaus);
      } else {
        let arvaus = document.createElement("div");
        arvaus.classList.add("arvausW");
        document.getElementById(`arvausBox${kyseinenRuutu}`).appendChild(arvaus);
      }
    }
  }

  if(voittoTarkistus()) {
    document.getElementById("voitto").style.display = null;
    return;
  } else if(kyseinenRuutu == 0) {
    document.getElementById("havio").style.display = null;
    return;
  }

  arvatutVarit = [];
  kyseinenRuutu -= 1;
  document.getElementById(`rivi${kyseinenRuutu}`).classList.remove("eiValittu");
}

function voittoTarkistus() {
  for(let i = 0; i < 4; i++) {
    if(valitutVarit[i] !== arvatutVarit[i]) return false;
  } return true;
}

function aloitaAlusta() {
  document.getElementById("pelaaNappi").onclick = () => pelaa();
  document.getElementById("pelaaNappi").textContent = "Arvaa";
  document.getElementById("pelaaNappi").classList.add("eiVapaana");
  document.getElementById("pelaaNappi").style.backgroundColor = null;

  arvatutVarit = [];
  kyseinenRuutu = 5;
  valitutVarit = [];

  pohja.textContent = "";  
  
  for(let i = 0; i < 6; i++) {
    let rivi = document.createElement("div");
    rivi.classList.add("rivi");
    rivi.id = `rivi${i}`;
    if(i != 5) rivi.classList.add("eiValittu");
    for(let u = 0; u < 4; u++) {
      let vari = document.createElement("div");
      vari.classList.add("vari");
      rivi.appendChild(vari);
    }

    let arvausBox = document.createElement("div");
    arvausBox.classList.add("arvausBox");
    arvausBox.id = `arvausBox${i}`;

    rivi.appendChild(arvausBox);
    pohja.appendChild(rivi);
  }

  luoVarit()
}

function painaOk() {
  document.getElementById("voitto").style.display = "none";
  document.getElementById("havio").style.display = "none";

  document.getElementById("pelaaNappi").textContent = "Pelaa";
  document.getElementById("pelaaNappi").onclick = () => aloitaAlusta();
  document.getElementById("pelaaNappi").classList.remove("eiVapaana");
  document.getElementById("pelaaNappi").style.backgroundColor = "green";
}