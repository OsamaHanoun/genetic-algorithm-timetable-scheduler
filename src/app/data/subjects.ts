import Subject from "../classes/subject";

const SubjectData = [
  {
    name: "math",
    numLessons: 5,
    maxPerDay: 1,
    minPerDay: 1,
    overNumDays: 5,
  },
  {
    name: "arabic",
    numLessons: 7,
    maxPerDay: 2,
    minPerDay: 1,
    overNumDays: 5,
  },
  {
    name: "socialStudies",
    numLessons: 3,
    maxPerDay: 1,
    minPerDay: 1,
    overNumDays: 3,
  },
  {
    name: "english",
    numLessons: 5,
    maxPerDay: 1,
    minPerDay: 1,
    overNumDays: 5,
  },
  {
    name: "chemistry",
    numLessons: 2,
    maxPerDay: 1,
    minPerDay: 1,
    overNumDays: 2,
  },
  {
    name: "physics",
    numLessons: 2,
    maxPerDay: 1,
    minPerDay: 1,
    overNumDays: 2,
  },
  {
    name: "biology",
    numLessons: 2,
    maxPerDay: 1,
    minPerDay: 1,
    overNumDays: 2,
  },
  {
    name: "geology",
    numLessons: 1,
    maxPerDay: 1,
    minPerDay: 1,
    overNumDays: 1,
  },
  {
    name: "computerScience",
    numLessons: 2,
    maxPerDay: 2,
    minPerDay: 2,
    overNumDays: 1,
  },
  {
    name: "vocationalEduction",
    numLessons: 2,
    maxPerDay: 2,
    minPerDay: 2,
    overNumDays: 1,
  },
  {
    name: "artEduction",
    numLessons: 1,
    maxPerDay: 1,
    minPerDay: 1,
    overNumDays: 1,
  },
  {
    name: "islamicEduction",
    numLessons: 3,
    maxPerDay: 1,
    minPerDay: 1,
    overNumDays: 3,
  },
  {
    name: "sport",
    numLessons: 1,
    maxPerDay: 1,
    minPerDay: 1,
    overNumDays: 1,
  },
];

const subjects: Subject[] = [];

SubjectData.forEach((item, indx) => {
  subjects.push(
    new Subject(
      indx,
      item.name,
      item.numLessons,
      item.maxPerDay,
      item.minPerDay,
      item.overNumDays
    )
  );
});

const NumLessonsPerRoom: number = SubjectData.reduce(
  (total, subject) => total + subject.numLessons,
  0
);

export default subjects;

export { SubjectData, NumLessonsPerRoom };
