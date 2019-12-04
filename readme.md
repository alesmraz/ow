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