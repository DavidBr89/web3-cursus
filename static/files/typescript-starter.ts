// TODO: beschrijf de mogelijke statussen van een film.
type FilmStatus = never;

interface Film {
  // TODO: beschrijf een film
}

interface Vertoning {
  // TODO: beschrijf een vertoning
}

// TODO: leid deze types af uit Film zonder de properties opnieuw uit te schrijven.
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
]; // TODO: type deze array als Film[]

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
]; // TODO: type deze array als Vertoning[]

const getActieveFilms = (films) => {
  // TODO: voeg parameter- en returntypes toe
  return films.filter((film) => film.status === "actief");
};

const findFilmById = (films, id) => {
  // TODO: voeg parameter- en returntypes toe
  return films.find((film) => film.id === id);
};

const maakFilmPreview = (film) => {
  // TODO: voeg types toe en return alleen id, titel en status
};

const maakNieuweFilm = (data, id) => {
  // TODO: voeg types toe en maak een volledige Film
};

const pasFilmAan = (film, wijzigingen) => {
  // TODO: voeg types toe en muteer de oorspronkelijke film niet
};

const getVertoningenVoorFilm = (vertoningen, filmId) => {
  // TODO: voeg parameter- en returntypes toe
};

interface ApiResponse<T> {
  // TODO: voeg success, data en message toe
}

const findById = <T>(items: T[], id: number): T | undefined => {
  // TODO: zorg ervoor dat deze functie veilig met item.id kan werken.
  return undefined;
};

const isFilmStatus = (waarde: unknown): waarde is FilmStatus => {
  // TODO: controleer of de ontvangen waarde een geldige filmstatus is.
  return false;
};

const isFilm = (waarde: unknown): waarde is Film => {
  // TODO: controleer alle verplichte properties en hun types
  return false;
};

const parseFilm = (waarde: unknown): Film => {
  // TODO: return een geldige film of gooi een duidelijke Error
  throw new Error("Nog niet geïmplementeerd");
};

// TODO: beschrijf de mogelijke resultaten tijdens het laden van data.
type LaadResultaat<T> = never;

const beschrijfLaadResultaat = <T>(resultaat: LaadResultaat<T>): string => {
  // TODO: geef voor ieder mogelijk resultaat een duidelijke beschrijving.
  return "Nog niet geïmplementeerd";
};

// TODO: voeg eigen tests toe voor geldige en ongeldige situaties.

export {};
