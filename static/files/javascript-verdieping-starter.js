/*
 * Classroom50-assignment: JavaScript verdieping
 * Bioscoopwebapplicatie
 *
 * Lees eerst de volledige opdracht. Vul daarna de TODO's aan, test iedere
 * functie afzonderlijk en commit regelmatig. Gebruik voor deel 1 geen manuele
 * for-lussen en pas de oorspronkelijke filmgegevens niet aan.
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
// Schrijf functies om de filmgegevens te zoeken, filteren en om te zetten.
// Iedere functie moet ook correct werken met een lege array.
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
  // TODO: return een nieuwe array waarin iedere film vrijePlaatsen bevat.
  // De waarde is de som van de vrije plaatsen van alle bijbehorende vertoningen.
  // Een film zonder vertoningen krijgt vrijePlaatsen: 0.
  // Pas de oorspronkelijke films en vertoningen niet aan.
};

/*
 * MUTATIEBUG ONDERZOEKEN
 *
 * Deze functie bevat bewust een mutatiebug. Voorspel eerst de drie resultaten
 * van de controlecode en voer ze daarna uit. Leg uit welke referenties gedeeld
 * worden en waarom daardoor ook de oorspronkelijke gegevens wijzigen.
 *
 * Herschrijf de functie vervolgens zodat:
 * - ze een nieuwe array returnt;
 * - alleen de gewijzigde film een nieuw object wordt;
 * - de geneste genre-array veilig aangepast wordt;
 * - de andere filmobjecten behouden blijven;
 * - een onbekend film-id de gegevens ongewijzigd laat.
 */
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

// TODO: voeg minstens vijf controles toe, waaronder lege en onbekende invoer.


// ============================================================
// DEEL 2: RESILIENT CINEMA LOADER
// De onderstaande API simuleert trage requests en fouten. Wijzig de API zelf
// niet. Schrijf de functies die ze gebruiken onder de test voor uitvoervolgorde.
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

/*
 * Voorspel eerst de uitvoervolgorde. Noteer bij iedere regel of ze rechtstreeks,
 * via de microtask queue of via de task queue uitgevoerd wordt. Voer de functie
 * daarna uit en vergelijk het resultaat met je voorspelling.
 */
// testUitvoervolgorde();

const loadFilms = async () => {
  // TODO: haal alle films op. Zorg dat een fout niet stilzwijgend verdwijnt.
};

const loadFilm = async (id) => {
  // TODO: haal één film op en bepaal wat er bij een onbekend id gebeurt.
};

const loadFilmDetails = async (id) => {
  /*
   * TODO: haal de film en zijn vertoningen op en return:
   * {film, vertoningen}
   *
   * De twee requests zijn onafhankelijk. Zorg dat de totale wachttijd niet
   * onnodig langer wordt en dat een fout niet verborgen wordt.
   */
};

const loadFilmDetailsMetFallback = async (id) => {
  /*
   * TODO: de film moet nog beschikbaar zijn wanneer alleen het ophalen van de
   * vertoningen mislukt. Return altijd deze vorm wanneer de film geladen is:
   * {film, vertoningen, vertoningenGeladen}
   *
   * Bij mislukte vertoningen is de array leeg en vertoningenGeladen false.
   * Een fout tijdens het ophalen van de film zelf mag niet verborgen worden.
   */
};

const loadFilmTitles = async (ids) => {
  /*
   * TODO: haal alle onafhankelijke films zo efficiënt mogelijk op en return de
   * titels in dezelfde volgorde als de ontvangen ids.
   */
};

const loadFilmSafely = async (id) => {
  /*
   * TODO: verberg de fout niet, maar zet het resultaat om naar een voorspelbare
   * vorm voor de rest van de applicatie:
   * - bij succes: {status: "success", data};
   * - bij een fout: {status: "error", message}.
   */
};

// ============================================================
// FOUTIEVE IMPLEMENTATIES
// Beschrijf bij iedere functie eerst wat er fout loopt en wanneer dit zichtbaar
// wordt. Herstel ze daarna zonder de fout enkel te verbergen.
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
// Wanneer films snel na elkaar geselecteerd worden, kan een oudere aanvraag pas
// na een nieuwere aanvraag eindigen. Toon dit probleem eerst aan en zorg daarna
// dat alleen het resultaat van de recentste selectie verwerkt wordt.
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
// Leg uit waarom het probleem niet altijd zichtbaar is en welke beperking jouw
// oplossing nog heeft.

/*
 * OPLEVERING
 *
 * Voeg hieronder of in aparte testbestanden controles toe voor succesvolle en
 * foutieve situaties. Zorg dat je ook de mutatiebug, uitvoervolgorde en race
 * condition kan aantonen. Je moet iedere keuze en ieder codefragment uit je
 * oplossing zelf kunnen uitleggen en aanpassen.
 */
