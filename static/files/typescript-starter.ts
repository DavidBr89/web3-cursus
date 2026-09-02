type FilmStatus = never; // TODO: vervang door de toegelaten statussen

interface Film {
  // TODO: beschrijf een film
}

interface Vertoning {
  // TODO: beschrijf een vertoning
}

type FilmPreview = never; // TODO: gebruik Pick
type NieuweFilm = never; // TODO: gebruik Omit
type FilmUpdate = never; // TODO: gebruik Partial en Omit
type ReadonlyFilm = never; // TODO: gebruik Readonly

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
  // TODO: beperk T zodat item.id veilig gebruikt kan worden
  return undefined;
};

const isFilmStatus = (waarde: unknown): waarde is FilmStatus => {
  // TODO: controleer de drie toegelaten statussen
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

type LaadResultaat<T> = never; // TODO: maak de discriminated union

const beschrijfLaadResultaat = <T>(resultaat: LaadResultaat<T>): string => {
  // TODO: handel iedere status af en voorzie een exhaustiveness check
  return "Nog niet geïmplementeerd";
};

// TODO: voeg eigen tests toe voor geldige en ongeldige situaties.

export {};
