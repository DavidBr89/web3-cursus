/*
 * DEEL 1 — DOMEINTYPES
 *
 * Een filmstatus mag alleen "concept", "actief" of "gearchiveerd" zijn.
 * Beschrijf hieronder een type dat geen andere waarden aanvaardt.
 */
type FilmStatus = never;

interface Film {
  /*
   * Beschrijf een film met:
   * - id: een getal;
   * - titel: tekst;
   * - speelduur: een getal in minuten;
   * - genres: een array van teksten;
   * - status: een geldige FilmStatus;
   * - beschrijving: optionele tekst.
   */
}

interface Vertoning {
  /*
   * Beschrijf een vertoning met:
   * - id en filmId: getallen;
   * - starttijd: een Date;
   * - zaal: tekst;
   * - vrijePlaatsen: een getal.
   */
}

/*
 * Leid de volgende types af uit Film. Schrijf de properties van Film niet
 * opnieuw uit. Kies zelf welk TypeScript-hulpmiddel bij ieder resultaat past.
 *
 * FilmPreview: alleen id, titel en status.
 * NieuweFilm: alle nodige filmgegevens behalve id.
 * FilmUpdate: alleen aanpasbare filmeigenschappen, allemaal optioneel.
 * ReadonlyFilm: een film waarvan properties niet opnieuw toegewezen mogen worden.
 */
type FilmPreview = never;
type NieuweFilm = never;
type FilmUpdate = never;
type ReadonlyFilm = never;

const films = [
  {
    id: 1,
    titel: "The Matrix",
    speelduur: 136,
    genres: ["actie", "sciencefiction"],
    status: "actief",
    beschrijving: "Een programmeur ontdekt de waarheid over zijn wereld."
  },
  {
    id: 2,
    titel: "Inception",
    speelduur: 148,
    genres: ["actie", "sciencefiction"],
    status: "concept"
  }
]; // TODO: zorg ervoor dat alleen geldige films aan deze array toegevoegd kunnen worden.

const vertoningen = [
  {
    id: 1,
    filmId: 1,
    starttijd: new Date("2026-10-12T20:00:00"),
    zaal: "Zaal 1",
    vrijePlaatsen: 42
  },
  {
    id: 2,
    filmId: 1,
    starttijd: new Date("2026-10-13T20:00:00"),
    zaal: "Zaal 2",
    vrijePlaatsen: 18
  }
]; // TODO: zorg ervoor dat alleen geldige vertoningen aan deze array toegevoegd kunnen worden.

/*
 * DEEL 2 — GETYPEERDE FUNCTIES
 *
 * Voorzie iedere functie van correcte parameter- en returntypes. Controleer ook
 * op de plaatsen waar je ze gebruikt welk type TypeScript afleidt.
 */

const getActieveFilms = (films) => {
  // Return alle films met status "actief". Pas de oorspronkelijke array niet aan.
  return films.filter((film) => film.status === "actief");
};

const findFilmById = (films, id) => {
  // Return de film met dit id. Hou rekening met een id dat niet bestaat.
  return films.find((film) => film.id === id);
};

const maakFilmPreview = (film) => {
  // Return een nieuw object dat alleen id, titel en status bevat.
};

const maakNieuweFilm = (data, id) => {
  // Combineer de aangeleverde filmgegevens met het nieuwe id tot een volledige film.
};

const pasFilmAan = (film, wijzigingen) => {
  // Return een aangepaste film zonder het oorspronkelijke object te muteren.
};

const getVertoningenVoorFilm = (vertoningen, filmId) => {
  // Return alle vertoningen die bij het opgegeven film-id horen.
};

/*
 * DEEL 3 — HERBRUIKBARE TYPES
 *
 * ApiResponse moet een boolean success, data van het ontvangen type en een
 * tekstuele message bevatten. Maak daarna zelf minstens één response voor een
 * film en één response voor een array van films.
 */
interface ApiResponse<T> {
  // TODO: beschrijf de drie eigenschappen.
}

/*
 * Werk deze functie af zodat ze voor films én vertoningen bruikbaar is.
 * Elk ontvangen item moet een numeriek id hebben. Een onbekend id levert geen
 * item op; zorg dat dit zichtbaar is in het returntype.
 */
const findById = <T>(items: T[], id: number): T | undefined => {
  // TODO: werk de zoekfunctie af en pas de types aan waar nodig.
  return undefined;
};

/*
 * DEEL 4 — ONBEKENDE GEGEVENS
 *
 * Data van buiten de applicatie begint als unknown. Controleer de waarde voor
 * je ze als Film gebruikt; omzeil de controles niet met een type assertion.
 */
const isFilmStatus = (waarde: unknown): waarde is FilmStatus => {
  // Return alleen true voor een geldige filmstatus.
  return false;
};

const isFilm = (waarde: unknown): waarde is Film => {
  /*
   * Controleer de verplichte properties en hun types. Controleer ook dat genres
   * een array is waarin ieder element tekst is en dat de status geldig is.
   */
  return false;
};

const parseFilm = (waarde: unknown): Film => {
  // Return de film wanneer ze geldig is; gooi anders een duidelijke Error.
  throw new Error("Nog niet geïmplementeerd");
};

/*
 * DEEL 5 — LAADTOESTANDEN
 *
 * LaadResultaat kent drie toestanden:
 * - loading;
 * - success, met data van het ontvangen type;
 * - error, met een foutmelding.
 */
type LaadResultaat<T> = never;

const beschrijfLaadResultaat = <T>(resultaat: LaadResultaat<T>): string => {
  /*
   * Return voor iedere toestand een duidelijke boodschap. Zorg dat TypeScript
   * ook een melding geeft wanneer later een toestand toegevoegd maar hier
   * vergeten wordt. Bepaal zelf hoe je dat realiseert.
   */
  return "Nog niet geïmplementeerd";
};

/*
 * DEEL 6 — CONTROLEREN EN ONDERZOEKEN
 *
 * Voeg eigen controles toe voor normale en foutieve situaties. Onderzoek ook:
 * - een ongeldige filmstatus;
 * - tekst gebruiken waar een getal verwacht wordt;
 * - een optionele property gebruiken zonder te controleren of ze bestaat;
 * - een property van een ReadonlyFilm proberen aan te passen;
 * - onbekende data gebruiken voordat ze gecontroleerd werd.
 *
 * Noteer kort wat TypeScript bij elk geval meldt en corrigeer de code daarna.
 * Gebruik geen any, @ts-ignore of onveilige type assertion als uitweg.
 */

export {};
