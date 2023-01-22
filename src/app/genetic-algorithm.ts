import Logger from "./utils/logger";
import DataManipulation from "./utils/data-manipulation";
import type Lesson from "./classes/lesson";
import type Subject from "./classes/subject";
import { NumLessonsPerRoom } from "./data/subjects";
import _ from "lodash-es";

export default class GeneticAlgo {
  /* --------- add to constructor ------------------------------------ */
  population: Lesson[][];
  candidatesPerTournament: number = 0.05;
  weights;
  mutationRate: number;
  numRooms: number;
  /* ----------------------------------------------------------------- */
  numGeneration: number = 0;
  bestOffspring: Lesson[] = [];
  bestFitness: number = -Infinity;
  parents: number[] = [];
  populationFitnesses: number[] = [];

  constructor(
    firstGeneration: Lesson[][],
    weights,
    candidatesPerTournament: number,
    mutationRate: number,
    numRooms: number
  ) {
    this.population = firstGeneration;
    this.candidatesPerTournament = candidatesPerTournament;
    this.weights = weights;
    this.mutationRate = mutationRate;
    this.numRooms = numRooms;
  }

  start(maximumNumberOfGenerations: number) {
    for (let index = 1; index <= maximumNumberOfGenerations; index++) {
      this.numGeneration = index;
      postMessage({ eventType: "generationCount", value: index });
      this.evaluate();
      this.selection();
      this.recombination();
      this.mutate();
    }
    postMessage({ eventType: "noSolution" });
  }

  /* --------- Evaluation -------------------------------------------- */
  evaluate(): void {
    this.population.forEach((individual: Lesson[]) => {
      const { fitness, brokenConstrains } = this.calculateFitness(individual);
      if (fitness > this.bestFitness) {
        this.bestFitness = fitness;
        this.bestOffspring = JSON.parse(JSON.stringify(individual));
        postMessage({
          eventType: "newBestFitness",
          value: {
            brokenConstrains: _.cloneDeep(brokenConstrains),
            generationsCount: this.numGeneration,
            timetable: _.cloneDeep(this.bestOffspring),
          },
        });
      }
      if (this.bestFitness === 0) {
        postMessage({
          eventType: "foundSolution",
          value: {
            generationsCount: this.numGeneration,
            timetable: JSON.parse(JSON.stringify(this.bestOffspring)),
          },
        });
        throw new Error("found best solution");
      }
      this.populationFitnesses.push(fitness);
    });
  }

  calculateFitness(individual: Lesson[]): any {
    const brokenConstrains = this.getBrokenConstrains(individual);
    const { byTeacherConflicts, byOverNumDays, byOutOfRangeDay } = this.weights;
    let fitness: number = 0;

    fitness += brokenConstrains.teacherConflicts * byTeacherConflicts.weight;
    fitness += brokenConstrains.overNumDays * byOverNumDays.weight;
    fitness += brokenConstrains.outOfRangeDay * byOutOfRangeDay.weight;
    return { fitness, brokenConstrains };
  }

  private getBrokenConstrains(individual: Lesson[]) {
    const brokenConstrainsBy = {
      overNumDays: 0,
      outOfRangeDay: 0,
      teacherConflicts: 0,
    };
    const subjectsOverDays: {
      [key: string]: { [key: string]: { [key: string]: number } };
    } = {};

    // calculate teacher conflicts
    const subjByTime: number[][][] = [[], [], [], [], []];

    individual.forEach((lesson: Lesson) => {
      const { day, time, subject, room } = lesson;
      const dayId = day.id;
      const subjectId = subject.id;
      const roomId = room.id;
      if (
        subjByTime[dayId][time] !== undefined &&
        subjByTime[dayId][time][subjectId] !== undefined
      ) {
        subjByTime[dayId][time][subjectId]++;
      } else if (subjByTime[dayId][time] !== undefined) {
        subjByTime[dayId][time][subjectId] = 0;
      } else {
        subjByTime[dayId][time] = [];
        subjByTime[dayId][time][subjectId] = 0;
      }

      if (subjectsOverDays?.[roomId]?.[subjectId]?.[dayId] !== undefined) {
        subjectsOverDays[roomId][subjectId][dayId]++;
      } else if (subjectsOverDays?.[roomId]?.[subjectId] !== undefined) {
        subjectsOverDays[roomId][subjectId][dayId] = 1;
      } else if (subjectsOverDays?.[roomId] !== undefined) {
        subjectsOverDays[roomId][subjectId] = {};
        subjectsOverDays[roomId][subjectId][dayId] = 1;
        subjectsOverDays[roomId][subjectId].overNumDays = subject.overNumDays;
        subjectsOverDays[roomId][subjectId].minPerDay = subject.minPerDay;
        subjectsOverDays[roomId][subjectId].maxPerDay = subject.maxPerDay;
      } else {
        subjectsOverDays[roomId] = {};
        subjectsOverDays[roomId][subjectId] = {};
        subjectsOverDays[roomId][subjectId][dayId] = 1;
        subjectsOverDays[roomId][subjectId].overNumDays = subject.overNumDays;
        subjectsOverDays[roomId][subjectId].minPerDay = subject.minPerDay;
        subjectsOverDays[roomId][subjectId].maxPerDay = subject.maxPerDay;
      }
    });

    // count  teacher conflicts
    brokenConstrainsBy.teacherConflicts = subjByTime
      .flat(2)
      .reduce((totalCount, currentCount) => totalCount + currentCount, 0);

    // count number of subjects with brokenConstrainsBy.overNumDays
    brokenConstrainsBy.overNumDays = Object.values(subjectsOverDays).reduce(
      (totalCount, room) => {
        Object.values(room).forEach((subject) => {
          if (Object.keys(subject).length - 3 !== subject.overNumDays) {
            totalCount++;
          }
        });
        return totalCount;
      },
      0
    );

    // // count number of subjects with brokenConstrainsBy.outOfRange
    brokenConstrainsBy.outOfRangeDay = Object.values(subjectsOverDays).reduce(
      (totalCount, room) => {
        Object.values(room).forEach((subject) => {
          for (const day in subject) {
            if (day.length > 3) continue;
            if (
              subject[day] < subject.minPerDay ||
              subject[day] > subject.maxPerDay
            ) {
              totalCount++;
            }
          }
        });
        return totalCount;
      },
      0
    );

    return brokenConstrainsBy;
  }
  /* ----------------------------------------------------------------- */

  /* --------- Selection by using tournament method ------------------ */
  selection(): void {
    const numTournaments = this.population.length;
    const numCandidates = Math.max(
      2,
      numTournaments * this.candidatesPerTournament
    );

    for (let index = 0; index < numTournaments; index++) {
      const candidates = this.selectRandomCandidates(
        numCandidates,
        this.population.length
      );
      const bestCandidateIndex: number = this.selectBestCandidate(candidates);
      this.parents.push(bestCandidateIndex);
    }
  }

  private selectRandomCandidates = (numCandidates, maxValue) => {
    const selectedCandidates: number[] = [];
    for (let index = 0; index < numCandidates; index++) {
      selectedCandidates.push(Math.floor(Math.random() * maxValue));
    }
    return selectedCandidates;
  };

  // fix this function to deal with candidates less or equal to two
  private selectBestCandidate(candidates) {
    let bestCandidate;
    let currentBestCandidateFitness = -Infinity;
    candidates.forEach((candidateIndex) => {
      if (
        this.populationFitnesses[candidateIndex] > currentBestCandidateFitness
      ) {
        currentBestCandidateFitness = this.populationFitnesses[candidateIndex];
        bestCandidate = candidateIndex;
      }
    });
    return bestCandidate;
  }
  /* ----------------------------------------------------------------- */

  /* --------- Recombination by using crossover ---------------------- */
  recombination() {
    let parent_1: Lesson[];
    let parent_2: Lesson[];
    let offsprings: any = [];

    this.sortLessonsBySubject();

    // population length needs to be even or one of the individuals will be ignored
    for (let index = 0; index < this.population.length; index += 2) {
      const parentIndex_1 = this.parents[index];
      const parentIndex_2 = this.parents[index + 1];

      parent_1 = DataManipulation.copyLessons(this.population[parentIndex_1]);
      // Logger.checkAll(
      //   `recombination ${index} -> parent 1`,
      //   this.numRooms,
      //   parent_1
      // );

      parent_2 = DataManipulation.copyLessons(this.population[parentIndex_2]);
      // Logger.checkAll(
      //   `recombination ${index} -> parent 2`,
      //   this.numRooms,
      //   parent_2
      // );

      if (parentIndex_1 === parentIndex_2) {
        offsprings.push(parent_1, parent_2);
        continue;
      }

      const destructedParent_1 =
        DataManipulation.destructLessonsToSubsetsByRoom(parent_1);
      const destructedParent_2 =
        DataManipulation.destructLessonsToSubsetsByRoom(parent_2);
      const offspring_1: Lesson[][] = [];
      const offspring_2: Lesson[][] = [];

      for (
        let subsetIndx = 0;
        subsetIndx < destructedParent_1.length;
        subsetIndx++
      ) {
        const recombinedData: Lesson[][] = this.orderedCrossoverRecombination(
          destructedParent_1[subsetIndx],
          destructedParent_2[subsetIndx]
        );
        offspring_1.push(recombinedData[0]);
        offspring_2.push(recombinedData[1]);
      }

      offsprings.push(offspring_1.flat(), offspring_2.flat());
    }

    this.population = offsprings;
    this.populationFitnesses = [];
    this.parents = [];
  }

  private orderedCrossoverRecombination(
    parent_1: Lesson[],
    parent_2: Lesson[]
  ) {
    const numLessons: number = parent_1.length;
    const subjects_1: Subject[] =
      DataManipulation.copySubjectsFromLessons(parent_1);
    const subjects_2: Subject[] =
      DataManipulation.copySubjectsFromLessons(parent_2);

    const leftIndx: number = Math.floor(numLessons / 3) - 1;
    const rightIndx: number = leftIndx * 2;

    const selectedFromParent_1: any = {};
    const selectedFromParent_2: any = {};

    // you need to use room too if your planning to use than more the one room
    for (let i = leftIndx; i < rightIndx; i++) {
      const day1 = parent_1[i].day.id;
      const day2 = parent_2[i].day.id;
      const time1 = parent_1[i].time;
      const time2 = parent_2[i].time;

      selectedFromParent_1[day1] = {
        [time1]: true,
        ...selectedFromParent_1[day1],
      };
      selectedFromParent_2[day2] = {
        [time2]: true,
        ...selectedFromParent_2[day2],
      };
    }

    const filteredParent_1: Lesson[] = parent_1.filter(
      (lesson: Lesson) =>
        selectedFromParent_2?.[lesson.day.id]?.[lesson.time] === undefined
    );
    // Logger.checkAll("filteredParent_1 -> parent_1", this.numRooms, parent_1);
    // Logger.checkAll("filteredParent_1 -> parent_2", this.numRooms, parent_2);

    const filteredParent_2: Lesson[] = parent_2.filter(
      (lesson: Lesson) =>
        selectedFromParent_1?.[lesson.day.id]?.[lesson.time] === undefined
    );
    // Logger.checkAll("filteredParent_2 -> parent_1", this.numRooms, parent_1);
    // Logger.checkAll("filteredParent_2 -> parent_2", this.numRooms, parent_2);
    let child_1 = [
      ...filteredParent_1.slice(0, leftIndx),
      ...parent_2.slice(leftIndx, rightIndx),
      ...filteredParent_1.slice(leftIndx),
    ];
    // Logger.checkAll("slice1-> child_1", child_1);
    child_1 = DataManipulation.copyLessons(child_1);
    let child_2 = [
      ...filteredParent_2.slice(0, leftIndx),
      ...parent_1.slice(leftIndx, rightIndx),
      ...filteredParent_2.slice(leftIndx),
    ];

    child_2 = DataManipulation.copyLessons(child_2);

    for (let i = 0; i < numLessons; i++) {
      child_1[i].subject = subjects_1[i];
      child_2[i].subject = subjects_2[i];
    }

    // Logger.checkAll("adding subject -> child_1", this.numRooms, child_1);
    // Logger.checkAll("adding subject -> child_2", this.numRooms, child_2);
    // Logger.checkAll("adding subject -> parent_1", this.numRooms, parent_1);
    // Logger.checkAll("adding subject -> parent_2", this.numRooms, parent_2);
    return [child_1, child_2];
  }

  private discreteRecombination(
    parent_1: Lesson[],
    parent_2: Lesson[]
  ): Lesson[][] {
    const firstChild = new Array(parent_1.length)
      .fill(0)
      .map((_, indx) =>
        Math.random() >= 0.5 ? parent_1[indx] : parent_2[indx]
      );

    const secondChild = new Array(parent_1.length)
      .fill(0)
      .map((_, indx) =>
        Math.random() >= 0.5 ? parent_1[indx] : parent_2[indx]
      );
    return [firstChild, secondChild];
  }
  private sortLessonsBySubject() {
    this.population.forEach((individual) => {
      individual.sort((lesson_1, lesson_2) => {
        const lessonSubject_1 = lesson_1.subject.id;
        const lessonSubject_2 = lesson_2.subject.id;
        // you might need to modify it if you are planning on using multiple rooms
        if (lessonSubject_1 < lessonSubject_2) {
          return -1;
        }
        if (lessonSubject_1 > lessonSubject_2) {
          return 1;
        }
        return 0;
      });
    });
  }
  /* ----------------------------------------------------------------- */

  /* --------- Mutation by exchange mutation method ------------------ */
  mutate() {
    this.sortLessonsByTimeDayRoom();
    const setSize = this.numRooms * NumLessonsPerRoom;
    const numOfMutations = this.mutationRate * setSize;
    const numSubsets = this.numRooms;
    const subsetSize = setSize / numSubsets;

    this.population.forEach((individual) => {
      for (let i = 0; i < numOfMutations; i++) {
        const randElemIndx_1: number = Math.floor(Math.random() * setSize);
        const minIndx: number = randElemIndx_1 - (randElemIndx_1 % subsetSize);
        const maxIndx: number = minIndx + subsetSize;
        let randElemIndx_2 = Math.floor(
          Math.random() * (maxIndx - minIndx) + minIndx
        );

        if (randElemIndx_1 === randElemIndx_2) {
          randElemIndx_2 =
            randElemIndx_1 + 1 === maxIndx
              ? randElemIndx_1 - 1
              : randElemIndx_1 + 1;
        }
        let tempSubject = individual[randElemIndx_1].subject;
        individual[randElemIndx_1].subject = individual[randElemIndx_2].subject;
        individual[randElemIndx_2].subject = tempSubject;
      }
    });
  }

  private sortLessonsByTimeDayRoom(): void {
    this.population.forEach((individual, idx) => {
      // Logger.checkAll(
      //   `sortLessonsByTimeDayRoom ${idx} -> before`,
      //   this.numRooms,
      //   individual
      // );

      individual.sort((lesson_1, lesson_2) => {
        const lessonRoom_1 = lesson_1.room.id;
        const lessonRoom_2 = lesson_2.room.id;
        const lessonDay_1 = lesson_1.day.id;
        const lessonDay_2 = lesson_2.day.id;
        const lessonTime_1 = lesson_1.time;
        const lessonTime_2 = lesson_2.time;

        if (lessonRoom_1 < lessonRoom_2) {
          return -1;
        }
        if (lessonRoom_1 > lessonRoom_2) {
          return 1;
        }

        if (lessonDay_1 < lessonDay_2) {
          return -1;
        }
        if (lessonDay_1 > lessonDay_2) {
          return 1;
        }

        if (lessonTime_1 < lessonTime_2) {
          return -1;
        }
        if (lessonTime_1 > lessonTime_2) {
          return 1;
        }
        return 0;
      });
      // Logger.checkAll(
      //   `sortLessonsByTimeDayRoom ${idx} -> after`,
      //   this.numRooms,
      //   individual
      // );
    });
  }
  /* ----------------------------------------------------------------- */
}
