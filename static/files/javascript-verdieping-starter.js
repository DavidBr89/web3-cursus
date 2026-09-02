/*
 * Classroom50-assignment: JavaScript verdieping
 * Bioscoopwebapplicatie
 *
 * Vul de TODO's aan zonder de oorspronkelijke data te muteren.
 * Test iedere functie afzonderlijk en commit regelmatig.
 */

const films = [
  {
    id: 1,
    titel: "The Matrix",
    genres: ["actie", "sciencefiction"],
    speelduur: 136,
    minimumLeeftijd: 16,
    actief: true,
  },
  {
    id: 2,
    titel: "Inception",
    genres: ["actie", "sciencefiction"],
    speelduur: 148,
    minimumLeeftijd: 12,
    actief: true,
  },
  {
    id: 3,
    titel: "Interstellar",
    genres: ["drama", "sciencefiction"],
    speelduur: 169,
    minimumLeeftijd: 12,
    actief: false,
  },
];

// ============================================================
// DEEL 1: FILM DATA LAB
// ============================================================

const getActieveFilms = (films) => {
  // TODO: return alle actieve films.
};

const findFilmById = (films, id) => {
  // TODO: return de film met het gevraagde id of undefined.
};

const getFilmsKorterDan = (films, minuten) => {
  // TODO: return films die maximaal het opgegeven aantal minuten duren.
};

const getFilmTitels = (films) => {
  // TODO: return alleen de titels.
};

const getUniekeGenres = (films) => {
  // TODO: return ieder genre exact één keer.
};

const getTotaleSpeelduur = (films) => {
  // TODO: return de totale speelduur van alle films.
};

const heeftFilmVoorLeeftijd = (films, leeftijd) => {
  // TODO: controleer of minstens één actieve film toegelaten is.
};

const addTotaalVrijePlaatsen = (films, vertoningen) => {
  // TODO: voeg aan iedere film de som van de vrije plaatsen toe.
  // Een film zonder vertoningen krijgt vrijePlaatsen: 0.
  // Pas de oorspronkelijke films en vertoningen niet aan.
};

// Deze functie bevat bewust een mutatiebug.
const voegGenreToe = (films, filmId, genre) => {
  const film = films.find((film) => film.id === filmId);

  if (!film) {
    return films;
  }

  film.genres.push(genre);
  return films;
};

// TODO: voorspel eerst de drie resultaten en voer de code daarna uit.
// const aangepasteFilms = voegGenreToe(films, 1, "klassieker");
// console.log(films[0].genres);
// console.log(aangepasteFilms === films);
// console.log(aangepasteFilms[0] === films[0]);

// TODO: voeg hieronder minstens vijf eigen controles toe.


// ============================================================
// DEEL 2: RESILIENT CINEMA LOADER
// ============================================================

const vertoningen = [
  { id: 1, filmId: 1, tijdstip: "14:30", vrijePlaatsen: 42 },
  { id: 2, filmId: 1, tijdstip: "20:30", vrijePlaatsen: 8 },
  { id: 3, filmId: 2, tijdstip: "17:30", vrijePlaatsen: 16 },
];

const delay = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const getRandomDelay = () => 200 + Math.floor(Math.random() * 1000);

const api = {
  async getFilms() {
    await delay(getRandomDelay());

    if (Math.random() < 0.2) {
      throw new Error("De films konden niet geladen worden.");
    }

    return films.map((film) => ({...film, genres: [...film.genres]}));
  },

  async getFilm(id) {
    await delay(getRandomDelay());

    const film = films.find((film) => film.id === id);

    if (!film) {
      throw new Error(`Film met id ${id} bestaat niet.`);
    }

    return {...film, genres: [...film.genres]};
  },

  async getVertoningen(filmId) {
    await delay(getRandomDelay());

    if (Math.random() < 0.2) {
      throw new Error("De vertoningen konden niet geladen worden.");
    }

    return vertoningen
      .filter((vertoning) => vertoning.filmId === filmId)
      .map((vertoning) => ({...vertoning}));
  },
};

const testUitvoervolgorde = () => {
  console.log("start");

  setTimeout(() => console.log("timer"), 0);

  Promise.resolve()
    .then(() => console.log("promise 1"))
    .then(() => console.log("promise 2"));

  console.log("einde");
};

// TODO: voorspel eerst de uitvoer en verwijder daarna de commentaar.
// testUitvoervolgorde();

const loadFilms = async () => {
  // TODO: haal alle films op en handel fouten niet stilzwijgend af.
};

const loadFilm = async (id) => {
  // TODO: haal één film op en hou rekening met een onbekend id.
};

const loadFilmDetails = async (id) => {
  // TODO: haal de film en zijn vertoningen samen op met Promise.all().
};

const loadFilmDetailsMetFallback = async (id) => {
  // TODO: laad de film en probeer daarna de vertoningen te laden.
  // Bij een fout voor de vertoningen return je:
  // {film, vertoningen: [], vertoningenGeladen: false}
  // Verberg een fout bij het laden van de film zelf niet.
};

const loadFilmTitles = async (ids) => {
  // TODO: haal de films samen op en return hun titels.
};

const loadFilmSafely = async (id) => {
  // TODO: return {status: "success", data} bij succes.
  // TODO: return {status: "error", message} bij een fout.
};

// ============================================================
// FOUTIEVE IMPLEMENTATIES
// Beschrijf het probleem en herstel daarna iedere functie.
// ============================================================

const brokenLoad1 = () => {
  api.getFilms().then((films) => films);
};

const brokenLoad2 = async () => {
  try {
    api.getFilms();
  } catch (error) {
    console.error(error.message);
  }
};

const brokenLoad3 = async () => {
  const eersteFilm = await api.getFilm(1);
  const tweedeFilm = await api.getFilm(2);
  return [eersteFilm, tweedeFilm];
};

// ============================================================
// RACE CONDITION
// Toon het probleem aan en verwerk alleen de nieuwste selectie.
// ============================================================

let geselecteerdeFilm = null;

const selecteerFilm = async (id) => {
  const film = await api.getFilm(id);
  geselecteerdeFilm = film;
  console.log(`Geselecteerd: ${geselecteerdeFilm.titel}`);
};

// TODO: roep selecteerFilm snel na elkaar aan met verschillende ids.
// TODO: pas de functie daarna aan zodat een oud resultaat de nieuwste
// selectie niet meer kan overschrijven.

// Voeg je overige controles onder deze regel toe.
