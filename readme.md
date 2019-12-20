# Rozjetí projektu:
pro rozjetí css a js buildu je potřeba mít:

1) node.js - https://nodejs.org/en/
2) npm - https://nodejs.org/en/ - stejný balíček
3) parcel js - $ npm install -g parcel-bundler

----
po nainstalování tohoto je potřeba vlézt do rootu projektu a dát příkaz `npm i`
po doinstalování potřebných knihoven (příkaz npm i) stačí dám `npm run build`. Assety se zbuildí a minifikují sami.


Hlavní css soubor do kterého se includují ostatní najdu: assets/scss/main.scss
Hlavní JS najdu: assets/js/main.js

Obrázky:
Produktová fotka: assets/img/wines/detail.png - 854x1277 - fotka se zobrazuje dvakrát menší, ale pro správné (velké) zobrazení v náhledu (klik na fotku v detailu) má dvojnásobnou velikost.


------------------------------------------------------

# Changes - 20.12.2019
1) Přidán nový banner na hlavní straně

# Monitor - bannery
složka tv-banner a pak jednotlivé html soubory

# Changes - 15.12.2019
1) Přidání stránky moje-vinoteky.html
    
    1.1) Zatím přidat bez tlačítek jako je NÁPOJOVÝ LÍST, JÍDELNÍ LIST a AKCE (class - branch__btnGroup) - nemáme obsah pro odkazy

2) Opravy responsivu a přidání animací - stačí nahrát nové css a js soubory


# changes

Obecné:
1) Přeházet menu podle nové struktury.
2) Do patičky přesunout odkaz o nás
3) Změna stylů a js, dát na web ty upravené 
4) Byla změna faviconu
5) opravena responzivita na iPhone 5 a opraven problem se zobrazovanim menu - od vas neni potreba nic delat.

!!! 6) Kodérsky a obsahově připravuje stránku nase-vinoteky.html - tu prosím na web ještě nedávat.

Homepage - https://alesmraz.github.io/ow/:
1) hlavní slider - trošku jiná struktura. Aktuálně se změnil text uprostřed na 2 obrázky.

Kategorie - https://alesmraz.github.io/ow/kategorie.html:
1) Pod hlavička (např. slovo Lahvová vína) se změnila struktura. Nyní má v sobě ještě odkazy do dalších kategorií
2) Tlačítka ve filtraci jsou nyní zlaté

Detail - https://alesmraz.github.io/ow/detail.html:
1) Upravit toto: https://prnt.sc/q6tew7 na toto: detail.html:461
2) V detailu by se měl zobrazit ten alert po přidání do košíku.

Značky: https://alesmraz.github.io/ow/znacka.html:
1) Změna hlavní fotky na slider
2) Přidat výrobce
3) Příběh, tradice a detail - byli doplněny html stránky - vasen.html, pribeh.html, tradice.html