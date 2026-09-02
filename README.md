# Web 3 — Docusaurus (React/MDX) proof-of-concept

Losstaand experiment om te vergelijken met de Antora-opzet (`../web3-cursus-site`) en de
MkDocs Material-opzet (`../web3-cursus-site-mkdocs-poc`). Er is niets aangepast aan die projecten.

## Lokaal draaien

```bash
cd web3-cursus
npm start
```

Open daarna <http://localhost:3000>. Wijzigingen aan `.mdx`-bestanden worden live herladen (hot reload, incl. React state).

## Bouwen / lokaal preview van de productie-build

```bash
npm run build
npm run serve
```

## Structuur

- `docusaurus.config.js` — site-config (navbar, footer, kleuren-thema, GitHub Pages instellingen)
- `src/css/custom.css` — HoGent-blauw (`#0A6190`) als Infima-primaire kleur
- `docs/intro.mdx` — omgezette versie van `01-introductie.adoc`
- `docs/react/hooks.mdx` — omgezette versie van `0404-hooks.adoc`, met `<Tabs>`/`<TabItem>` (React-componenten!), admonities en codeblokken

## Verrijkte codeblokken

### Code annoteren

Importeer de component bovenaan de MDX-pagina:

```mdx
import AnnotatedCodeBlock from "@site/src/components/AnnotatedCodeBlock";
```

Plaats vervolgens een normaal codeblok in de component. Voeg de uitleg met `// [!note ...]` toe aan de relevante regel:

````mdx
<AnnotatedCodeBlock>

```javascript
const naam = "Alice"; // [!note Deze variabele kan niet opnieuw worden toegewezen.]
```

</AnnotatedCodeBlock>
````

De tekst van de note verdwijnt uit de getoonde code. Op die plaats verschijnt een genummerde marker met de uitleg onder het codeblok.

### Live code

Voeg `live` toe na de taal om een JSX-codeblok bewerkbaar en uitvoerbaar te maken:

````mdx
```jsx live
function Voorbeeld() {
  return <p>Pas mij aan</p>;
}
```
````

## Verrijkte codeblokken

### Annotaties

Importeer de component bovenaan de MDX-pagina:

```mdx
import AnnotatedCodeBlock from "@site/src/components/AnnotatedCodeBlock";
```

Gebruik daarna `// [!note ...]` aan het einde van een JavaScriptregel:

```mdx
<AnnotatedCodeBlock language="javascript">
{`const naam = "Alice"; // [!note Deze variabele kan niet opnieuw worden toegewezen.]`}
</AnnotatedCodeBlock>
```

Het codeblok toont een genummerde marker. De tekst van iedere annotatie verschijnt automatisch onder het codeblok.

### Live code

Voeg `live` toe na de taal van een JSX-codeblok:

````mdx
```jsx live
function Voorbeeld() {
  return <p>Pas mij aan</p>;
}
```
````

## Deployen (indien je hiervoor kiest)

```bash
GIT_USER=<jouw-github-username> npm run deploy
```

Bouwt de site en pusht ze naar de `gh-pages`-branch.

## Wat dit toont t.o.v. MkDocs

- Tabs (`<Tabs>`/`<TabItem>`) zijn hier **echte React-componenten** i.p.v. een markdown-extensie — dat opent de deur naar volledig interactieve elementen (bv. een live, uitvoerbare React-codesandbox) rechtstreeks in je lesmateriaal.
- Meer boilerplate/config dan MkDocs, en je schrijft MDX (Markdown + JSX) in plaats van pure Markdown.

```

If you are using GitHub Pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
```
