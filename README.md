# Web 3-cursus

De online cursus voor het OLOD Web 3 aan HOGENT. De website is gebouwd met Docusaurus en wordt automatisch gepubliceerd via GitHub Pages.

## Online cursus

<https://davidbr89.github.io/web3-cursus/>

## Lokaal starten

Installeer eerst Node.js 20 of hoger. Voer daarna uit:

```shell
npm install
npm start
```

De ontwikkelserver toont de lokale URL in de opdrachtregel.

## Productiebuild controleren

```shell
npm run build
npm run serve
```

## Publiceren

Een push naar `main` start automatisch de workflow **Deploy Docusaurus naar GitHub Pages**. De repository moet onder **Settings → Pages → Build and deployment** ingesteld staan op **GitHub Actions**.

## Cursusinhoud aanpassen

- Cursuspagina’s staan in `docs`.
- De sidebar staat in `sidebars.js`.
- De algemene Docusaurus-configuratie staat in `docusaurus.config.js`.
- De eigen styling staat in `src/css/custom.css`.
- Statische bestanden en afbeeldingen staan in `static`.

Codeannotaties gebruiken `AnnotatedCodeBlock`. Bewerkbare gewone JavaScript-oefeningen gebruiken `JavaScriptPlayground`.
