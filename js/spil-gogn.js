/* Spilastokkurinn: 20 spil.
   tegund: "bolvun" | "verkefni" | "spurning"
   stig:   1–3 (bölvanir gefa ekki stig)
   raudt:  true ef spilið er rautt (rauð bakhlið og rauð framhlið)
   takn:   táknmynd á framhlið (sjá TAKN í js/spil.js); annars tákn tegundarinnar
   thraut: þrautin sem þarf að leysa til að snúa spilinu við.
           Í bili er hver þraut spurning með einu réttu svari (svor = leyfileg svör).
           Nýjar tegundir þrauta má skrá í SPIL_THRAUTIR í js/spil.js. */
window.SPIL = [
  { tegund: "verkefni", stig: 1, titill: "Mæld skref", texti: "Teljið hve mörg skref eru frá innganginum að næsta tré og takið mynd af trénu.",
    thraut: { gerd: "svar", spurning: "Hvað hét gamli maðurinn í fjallaþorpinu?", svor: ["Ernesto", "Ernestó"] } },
  { tegund: "spurning", stig: 1, takn: "hitamaelir", titill: "Hitamælir", texti: "Finnið kennara. Hann nefnir borg í heiminum. Þið eigið að giska hversu heitt er þar núna. Ef þið eruð innan við 5 °C frá réttu svari fáið þið stig. (Þetta má endurtaka en ekki með sama kennara.)",
    thraut: { gerd: "svar", spurning: "Hvernig dýr notaði stíginn ofan við bæinn í sögunni?", svor: ["geit", "geitur", "geitin", "geiturnar"] } },
  { tegund: "bolvun", takn: "nota", titill: "Bölvun söngsins", texti: "Þið verðið að söngla allt sem þið segið og fá kennara til að syngja líka til að aflétta bölvuninni. Bölvunin afléttist af sjálfu sér eftir 5 mínútur.",
    thraut: { gerd: "svar", spurning: "Þrír kennarar í Úllónolló eru fæddir sama árið. Hvaða ár?", svor: ["1976"] } },
  { raudt: true, tegund: "verkefni", stig: 1, takn: "gegnsaett", titill: "Gegnsætt", texti: "Hafið hluta farartækis ykkar gegnsæjan.",
    thraut: { gerd: "svar", spurning: "Hve margar reikistjörnur eru í sólkerfinu?", svor: ["8", "átta"] } },
  { tegund: "spurning", stig: 1, takn: "skaeri", titill: "Skæri, blað, steinn", texti: "Sigrið kennara í skæri, blað, steinn. Ef þið tapið má reyna aftur, en bara með nýjum kennara.",
    thraut: { gerd: "svar", spurning: "Hvað er 144 deilt með 12?", svor: ["12", "tólf"] } },
  { tegund: "verkefni", stig: 2, takn: "steinn", titill: "Steinn lifnar við", texti: "Finnið stein þyngri en 100 g og teiknið eða málið hann svo hann breytist í persónu eða dýr.",
    thraut: { gerd: "svar", spurning: "Hvaða reikistjarna er næst sólinni?", svor: ["merkúr", "merkur"] } },
  { tegund: "bolvun", takn: "fotspor", titill: "Bölvun hægagangsins", texti: "Næstu 5 mínútur megið þið bara taka hænuskref.",
    thraut: { gerd: "svar", spurning: "Hver er höfuðborg Noregs?", svor: ["osló", "oslo"] } },
  { raudt: true, tegund: "verkefni", stig: 1, takn: "fani", titill: "Fáni", texti: "Setjið fána á farartækið ykkar.",
    thraut: { gerd: "svar", spurning: "Hvað heitir stærsti jökull Íslands?", svor: ["vatnajökull"] } },
  { tegund: "verkefni", stig: 1, takn: "bio", titill: "Bíómynd", texti: "Matur og mynd ætlar að sýna bíómynd í dag. Finnið Ragnar og segið við hann eina setningu úr myndinni sem sýnd verður.",
    thraut: { gerd: "svar", spurning: "Hve margar gráður eru í rétthyrndu horni?", svor: ["90", "90°", "níutíu"] } },
  { tegund: "spurning", stig: 1, takn: "skutla", titill: "Hringflug", texti: "Gerið skutlu sem flýgur í hring þegar henni er kastað. Sýnið kennara kast eða myndband.",
    thraut: { gerd: "svar", spurning: "Hvaða lofttegund anda plöntur að sér við ljóstillífun?", svor: ["koltvísýringur", "co2", "koldíoxíð"] } },
  { tegund: "bolvun", titill: "Bölvun þagnarinnar", texti: "Næstu 5 mínútur má liðið aðeins tjá sig með bendingum.",
    thraut: { gerd: "svar", spurning: "Hvað er 15 % af 200?", svor: ["30", "þrjátíu"] } },
  { raudt: true, tegund: "verkefni", stig: 1, takn: "hauskupa", titill: "Hauskúpa", texti: "Teiknið mynd af hauskúpu á farartækið ykkar.",
    thraut: { gerd: "svar", spurning: "Hve margir sentímetrar eru í einum metra?", svor: ["100", "hundrað"] } },
  { tegund: "spurning", stig: 2, takn: "bolti", titill: "Boltinn á lofti", texti: "Takið upp myndband af einhverjum í hópnum halda bolta á lofti 50 sinnum.",
    thraut: { gerd: "svar", spurning: "Hvert er minnsta frumtalan?", svor: ["2", "tveir"] } },
  { tegund: "verkefni", stig: 2, takn: "fugl", titill: "Fuglar", texti: "Náið kvikmynd af fugli sem er í mynd í a.m.k. 10 sekúndur án þess að hverfa.",
    thraut: { gerd: "svar", spurning: "Hvað heitir fræðigreinin um veður?", svor: ["veðurfræði"] } },
  { raudt: true, tegund: "verkefni", stig: 1, takn: "myndavel", titill: "Stafrófsröð", texti: "Takið mynd af ykkur í stafrófsröð með farartækið ykkar fullklárað.",
    thraut: { gerd: "svar", spurning: "Hvað er 9²?", svor: ["81"] } },
  { tegund: "spurning", stig: 1, takn: "okei", titill: "Ókei", texti: "Fáið kennara til að segja „Ókei“.",
    thraut: { gerd: "svar", spurning: "Hvaða frumefni hefur efnatáknið Fe?", svor: ["járn"] } },
  { tegund: "verkefni", stig: 2, takn: "pensill", titill: "Listamaður", texti: "Er listamaður í hópnum? Látið hann teikna mynd af París með nautinu sínu.",
    thraut: { gerd: "svar", spurning: "Hve margar mínútur eru í 3 klukkustundum?", svor: ["180"] } },
  { tegund: "spurning", stig: 1, takn: "hjarta", titill: "Hrós", texti: "Hrósið kennara fyrir eitthvað sem þið meinið í alvöru.",
    thraut: { gerd: "svar", spurning: "Hvað heitir hæsta fjall Íslands?", svor: ["Hvannadalshnjúkur", "Hvannadalshnúkur"] } },
  { tegund: "verkefni", stig: 2, takn: "steinturn", titill: "Steinturninn", texti: "Látið 5 steina verða að turni sem stendur í að minnsta kosti 30 sekúndur. Takið myndband.",
    thraut: { gerd: "svar", spurning: "Hvað er 2 + 2 × 2?", svor: ["6", "sex"] } },
  { tegund: "bolvun", takn: "hond", titill: "Bölvun vinstri handarinnar", texti: "Næstu 5 mínútur má aðeins nota aðra höndina í liðinu ykkar.",
    thraut: { gerd: "svar", spurning: "Hvaða dýr er stærst á jörðinni?", svor: ["steypireyður", "steypireiður", "steypireyðurin"] } }
];
