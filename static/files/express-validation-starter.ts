import type { NextFunction, Request, Response } from 'express';

type CreateScreeningInput = {
  movieId: number;
  room: string;
  startsAt: string;
  availableSeats: number;
};

// Deze starter bevat bewust meerdere problemen. Onderzoek eerst wat er fout
// kan gaan en verbeter daarna de volledige validatie- en foutflow.
export const createScreening = async (
  request: Request,
  response: Response,
  _next: NextFunction,
) => {
  try {
    const input = request.body as CreateScreeningInput;

    const screening = await screeningService.create(input);
    response.status(201).json(screening);

    console.log('Deze code blijft na de response nog uitvoeren');
  } catch (error) {
    response.status(500).json(error);
  }
};

export const readScreening = async (request: Request, response: Response) => {
  const screeningId = Number(request.params.screeningId);
  const screening = await screeningService.findById(screeningId);

  response.status(200).json(screening);
};

// De echte Classroom50-repository bevat een tijdelijke service zodat dit
// bestand uitgevoerd kan worden. De service zelf hoef je niet aan te passen.
declare const screeningService: {
  create(input: CreateScreeningInput): Promise<unknown>;
  findById(id: number): Promise<unknown>;
};
