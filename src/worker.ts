import type Lesson from "./app/classes/lesson";
import { generateFistGeneration } from "./app/setup";
import GeneticAlgo from "./app/genetic-algorithm";
import Logger from "./app/utils/logger";

onmessage = (message: MessageEvent) => {
  const {
    totalPopulation,
    maxNumGeneration,
    candidatesPerTournament,
    mutationRate,
    numRooms,
    conflict,
    outOfRange,
    overDays,
  } = message.data;

  const constrainsWeights = {
    byTeacherConflicts: {
      type: "hard",
      weight: conflict,
    },
    byOverNumDays: {
      type: "hard",
      weight: overDays,
    },
    byOutOfRangeDay: {
      type: "hard",
      weight: outOfRange,
    },
  };

  const population: Lesson[][] = generateFistGeneration(
    +totalPopulation,
    +numRooms
  );

  // Logger.checkAll("first generation", +numRooms, population[0]);
  const ga = new GeneticAlgo(
    population,
    constrainsWeights,
    +candidatesPerTournament,
    +mutationRate,
    +numRooms
  );

  ga.start(maxNumGeneration);
};
