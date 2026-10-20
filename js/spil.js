(function () {
  "use strict";

  const LYKILL = "spilastokkur-v1";
  const HEITI = { bolvun: "Bölvun", verkefni: "Verkefni", spurning: "Spurning" };
  const spil = window.SPIL || [];

  /* Tegundir þrauta. Hver tegund birtir þrautina í `el` og athugar svarið.
     Nýja tegund má bæta við hér og vísa í hana með `gerd` í js/spil-gogn.js. */
  const SPIL_THRAUTIR = {
    svar: {
      birta(thraut, el) {
        el.innerHTML = '<input id="svar" autocomplete="off" spellcheck="false" placeholder="Skrifaðu svarið…" aria-label="Svar">';
        return el.querySelector("input");
      },
      athuga(thraut, el) {
        const svar = jafna(el.querySelector("input").value);
        return svar !== "" && thraut.svor.some(s => jafna(s) === svar);
      }
    }
  };

  function jafna(s) {
    return String(s).trim().toLowerCase().replace(/\s+/g, " ").replace(/,/g, ".");
  }

  function stokka(n) {
    const r = [...Array(n).keys()];
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  }

  function nyttSpil() {
    return { rod: stokka(spil.length), snuid: [], lokid: [] };
  }

  function lesa() {
    try {
      const s = JSON.parse(localStorage.getItem(LYKILL));
      if (s && Array.isArray(s.rod) && s.rod.length === spil.length) return s;
    } catch (e) { /* tómt eða lokað geymslusvæði */ }
    return nyttSpil();
  }

  function vista() {
    try { localStorage.setItem(LYKILL, JSON.stringify(stada)); } catch (e) { /* hunsa */ }
  }

  let stada = lesa();
  let virkt = null; // staða (sæti) spilsins sem er opið

  const $ = id => document.getElementById(id);
  const deck = $("deck");

  function pips(n) {
    if (!n) return "";
    return '<span class="pips" aria-label="' + n + ' stig">' +
      [1, 2, 3].map(i => '<i class="' + (i <= n ? "" : "off") + '"></i>').join("") + "</span>";
  }

  /* Táknmyndir á framhlið spilanna (24×24, línuteikning). */
  const TAKN = {
    bolvun: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    verkefni: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.5h6V4M8.5 11l2 2 4-4M8.5 17h7"/>',
    spurning: '<path d="M4 5h16v11H10l-5 4v-4H4z"/><path d="M10 8.5a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2v.5M12 14v.01"/>',
    gegnsaett: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15l4-6M11 15l4-6M15 15l2-3"/>',
    fani: '<path d="M5 22V3"/><path d="M5 4h12l-3 4 3 4H5"/>',
    hauskupa: '<path d="M12 3a8 8 0 0 0-8 8c0 2.6 1.3 4.3 3 5.3V20h10v-3.7c1.7-1 3-2.7 3-5.3a8 8 0 0 0-8-8z"/><circle cx="9" cy="11.5" r="1.8"/><circle cx="15" cy="11.5" r="1.8"/><path d="M12 14.5l-1 1.5h2zM10 20v-2M14 20v-2"/>',
    myndavel: '<path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/>',
    steinn: '<path d="M4 18c0-5 3.5-9 8-9s8 3.5 8 8c0 1.5-1 2.5-2.5 2.5h-11C5 19.5 4 19 4 18z"/><path d="M10 13.5v.01M14.5 13.5v.01M10.5 16.2c1 .7 2.5.7 3.5 0"/>',
    bio: '<rect x="3" y="9" width="18" height="11" rx="1"/><path d="M3 5h18v4H3zM8 5 6 9M13 5l-2 4M18 5l-2 4"/>',
    fugl: '<path d="M3 10c1.5 0 2.8.7 3.6 1.8C7.5 8.5 9.6 6 12.5 6c2.2 0 3.8 1.5 4 3.5L21 10l-4.5 1.2c-.3 4.2-3.3 7.3-7.5 7.3-2.6 0-4.6-1-5.8-2.8 2.6 0 4.6-1 5.6-3"/><path d="M13.5 9v.01"/>',
    pensill: '<path d="M18 3l3 3-9 9-3-3z"/><path d="M9 12c-3 0-4 2-4 4s-1 3-2 4c4 0 8-1 8-5"/>',
    steinturn: '<ellipse cx="12" cy="19" rx="7" ry="2.5"/><ellipse cx="12" cy="14.5" rx="5" ry="2"/><ellipse cx="12" cy="10.5" rx="3.5" ry="1.8"/><ellipse cx="12" cy="7" rx="2.5" ry="1.5"/><ellipse cx="12" cy="4" rx="1.5" ry="1"/>',
    hitamaelir: '<path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z"/><path d="M12 9v6.5"/><circle cx="12" cy="17" r="1.5"/>',
    skaeri: '<circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.2 16 19 4M15.8 16 5 4"/>',
    skutla: '<path d="M22 3 2 11l7 3 2 7 3-5 5 3z"/><path d="M9 14 22 3"/>',
    bolti: '<circle cx="12" cy="12" r="9"/><path d="M12 8l3.5 2.5-1.3 4H9.8l-1.3-4zM12 8V3.5M15.5 10.5l4-1.5M14.2 14.5l2.5 3.5M9.8 14.5l-2.5 3.5M8.5 10.5l-4-1.5"/>',
    okei: '<path d="M7 11v9H4v-9zM7 11l4-8c1.5 0 2.5 1 2.5 2.5L13 9h6a2 2 0 0 1 2 2.3l-1.2 7a2 2 0 0 1-2 1.7H7"/>',
    hjarta: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
    nota: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    fotspor: '<path d="M12 21v-9M12 12 6.5 5M12 12l5.5-7M12 12V3"/>',
    hond: '<path d="M8 13V5a1.5 1.5 0 0 1 3 0v6M11 11V3.5a1.5 1.5 0 0 1 3 0V11M14 11V5a1.5 1.5 0 0 1 3 0v6M17 10a1.5 1.5 0 0 1 3 0v4a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-2.7l-3-4.8a1.5 1.5 0 0 1 2.5-1.6L8 13"/>'
  };

  function takn(nafn) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (TAKN[nafn] || "") + "</svg>";
  }

  function framhlid(s) {
    const stig = s.tegund === "bolvun" ? "Engin stig" : s.stig + " stig";
    return '<div class="side face ' + s.tegund + (s.raudt ? " raudt" : "") + '">' +
      '<div class="band"><span>' + HEITI[s.tegund] + "</span>" + pips(s.stig) + "</div>" +
      "<h3>" + esc(s.titill) + "</h3>" +
      "<p>" + esc(s.texti) + "</p>" +
      '<div class="art">' + takn(s.takn || s.tegund) + "</div>" +
      '<div class="foot"><span>' + stig + "</span><span>" + (s.tegund === "bolvun" ? "☠" : "★") + "</span></div>" +
      "</div>";
  }

  function esc(t) {
    return String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  function teikna() {
    deck.innerHTML = "";
    stada.rod.forEach((idx, saeti) => {
      const s = spil[idx];
      const snuid = stada.snuid.includes(saeti);
      const b = document.createElement("button");
      b.className = "card" + (snuid ? " flipped" : "") + (stada.lokid.includes(saeti) ? " done" : "");
      b.style.animationDelay = (saeti * 35) + "ms";
      b.setAttribute("role", "listitem");
      b.setAttribute("aria-label", snuid ? "Spil " + (saeti + 1) + ": " + HEITI[s.tegund] + ", " + s.titill : "Spil " + (saeti + 1) + ", á grúfu");
      b.innerHTML =
        '<div class="side back' + (s.raudt ? " raudt" : "") + '"><div class="emblem"><span>?</span></div><span class="num">' + (saeti + 1) + "</span></div>" +
        framhlid(s);
      b.addEventListener("click", () => (stada.snuid.includes(saeti) ? syna(saeti) : opnaThraut(saeti)));
      deck.appendChild(b);
    });
    uppfaeraTolur();
  }

  function uppfaeraTolur() {
    $("statFlipped").textContent = stada.snuid.length;
    $("statFlipped").nextElementSibling.textContent = "af " + spil.length + " snúið";
    $("statScore").textContent = stada.lokid.reduce((t, saeti) => t + (spil[stada.rod[saeti]].stig || 0), 0);
  }

  /* Þraut */
  const dlg = $("puzzle");
  const form = $("puzzleForm");

  function opnaThraut(saeti) {
    virkt = saeti;
    const s = spil[stada.rod[saeti]];
    const gerd = SPIL_THRAUTIR[s.thraut.gerd];
    $("puzzleNo").textContent = saeti + 1;
    $("puzzleQ").textContent = s.thraut.spurning;
    $("puzzleFeedback").textContent = "";
    $("puzzleFeedback").className = "feedback";
    const fokus = gerd.birta(s.thraut, $("puzzleBody"));
    dlg.showModal();
    if (fokus) fokus.focus();
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const saeti = virkt;
    const s = spil[stada.rod[saeti]];
    const fb = $("puzzleFeedback");
    if (SPIL_THRAUTIR[s.thraut.gerd].athuga(s.thraut, $("puzzleBody"))) {
      fb.textContent = "Rétt! Spilinu er snúið við…";
      fb.className = "feedback right";
      setTimeout(() => {
        dlg.close();
        snua(saeti);
      }, 550);
    } else {
      fb.textContent = "Rangt svar. Reyndu aftur.";
      fb.className = "feedback wrong";
      form.classList.remove("shake");
      void form.offsetWidth;
      form.classList.add("shake");
      const inp = $("puzzleBody").querySelector("input");
      if (inp) inp.select();
    }
  });

  $("puzzleCancel").addEventListener("click", () => dlg.close());

  function snua(saeti) {
    if (!stada.snuid.includes(saeti)) stada.snuid.push(saeti);
    vista();
    const b = deck.children[saeti];
    const s = spil[stada.rod[saeti]];
    b.classList.add("flipped");
    b.setAttribute("aria-label", "Spil " + (saeti + 1) + ": " + HEITI[s.tegund] + ", " + s.titill);
    uppfaeraTolur();
    setTimeout(() => syna(saeti), 750);
  }

  function snuaTilBaka(saeti) {
    stada.snuid = stada.snuid.filter(x => x !== saeti);
    stada.lokid = stada.lokid.filter(x => x !== saeti);
    vista();
    const b = deck.children[saeti];
    b.classList.remove("flipped", "done");
    b.setAttribute("aria-label", "Spil " + (saeti + 1) + ", á grúfu");
    uppfaeraTolur();
  }

  /* Stækkað spil */
  const view = $("view");

  function syna(saeti) {
    const s = spil[stada.rod[saeti]];
    const lokid = stada.lokid.includes(saeti);
    $("viewCard").innerHTML = '<div class="big">' + framhlid(s) + "</div>";
    const a = $("viewActions");
    a.innerHTML = "";
    if (s.tegund !== "bolvun") {
      const k = document.createElement("button");
      k.className = "btn" + (lokid ? "" : " primary");
      k.textContent = lokid ? "Afturkalla (−" + s.stig + " stig)" : "Lokið (+" + s.stig + " stig)";
      k.addEventListener("click", () => {
        if (lokid) stada.lokid = stada.lokid.filter(x => x !== saeti);
        else stada.lokid.push(saeti);
        vista();
        deck.children[saeti].classList.toggle("done", !lokid);
        uppfaeraTolur();
        view.close();
      });
      a.appendChild(k);
    }
    const aftur = document.createElement("button");
    aftur.className = "btn ghost";
    aftur.textContent = "Snúa aftur á grúfu";
    aftur.addEventListener("click", () => {
      if (lokid && !confirm("Spilið er merkt lokið. Ef því er snúið aftur á grúfu dragast " + s.stig + " stig frá. Halda áfram?")) return;
      view.close();
      snuaTilBaka(saeti);
    });
    a.appendChild(aftur);
    const loka = document.createElement("button");
    loka.className = "btn ghost";
    loka.textContent = "Loka";
    loka.addEventListener("click", () => view.close());
    a.appendChild(loka);
    view.showModal();
  }

  [dlg, view].forEach(d => d.addEventListener("click", e => { if (e.target === d) d.close(); }));

  $("reset").addEventListener("click", () => {
    if (stada.snuid.length && !confirm("Stokka upp og byrja nýjan leik? Öll spil snúa aftur á grúfu og stigin núllstillast.")) return;
    stada = nyttSpil();
    vista();
    teikna();
  });

  teikna();
})();
