import confetti from "canvas-confetti";
const worker = new Worker("./worker.ts");
let isWorking = false;
const goButton: HTMLButtonElement = document.getElementById(
  "go-button"
) as HTMLButtonElement;
const formElement: HTMLFormElement = document.getElementById(
  "setup-form"
) as HTMLFormElement;
const submitButton: HTMLButtonElement = document.getElementById(
  "setup-form-button"
) as HTMLButtonElement;

const bestFitnessBadge = document.getElementById(
  "best-fitness-badge"
) as HTMLSpanElement;
const conflictsBadge = document.getElementById(
  "conflicts-badge"
) as HTMLSpanElement;
const outOfRangeBadge = document.getElementById(
  "out-of-range-badge"
) as HTMLSpanElement;
const overNumberOfDaysBadge = document.getElementById(
  "over-number-of-days-badge"
) as HTMLSpanElement;

const tablesContainer: HTMLElement = document.getElementById(
  "tables-container"
) as HTMLElement;

goButton.addEventListener("click", () => {
  submitButton.click();
});

if (typeof Worker !== "undefined") {
  worker.onmessage = (message) => {
    switch (message.data.eventType) {
      case "newBestFitness":
        newBestFitnessHandler(message.data.value);
        break;
      case "foundSolution":
        foundSolutionHandler();
        break;
      case "generationCount":
        generationCountHandler(message.data.value);
        break;
      case "noSolution":
        finished();
        break;
      default:
        break;
    }
  };

  formElement.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    isWorking && location.reload();
    tablesContainer.innerHTML = "";
    let {
      population: totalPopulation,
      generations: maxNumGeneration,
      candidates: candidatesPerTournament,
      mutationRate,
      rooms: numRooms,
      conflict,
      outOfRange,
      overDays,
    } = getData(event.target);

    worker.postMessage({
      totalPopulation: +totalPopulation,
      maxNumGeneration: +maxNumGeneration,
      candidatesPerTournament: +candidatesPerTournament,
      mutationRate: +mutationRate,
      numRooms: +numRooms,
      conflict: conflict === "on" ? -1 : 0,
      outOfRange: outOfRange === "on" ? -1 : 0,
      overDays: overDays === "on" ? -1 : 0,
    });

    document.getElementById("current-state")?.classList.remove("d-none");
    isWorking = !isWorking;
  });
} else {
}

function generationCountHandler(count) {
  goButton.innerText = count;
}

function foundSolutionHandler() {
  finished();
  let count = 200;
  let defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
function newBestFitnessHandler(value) {
  let { teacherConflicts, overNumDays, outOfRangeDay } = value.brokenConstrains;
  const refinedData = refineData(value.timetable);
  tablesContainer.innerHTML = "";
  for (let index = 0; index < refinedData.length / 5; index++) {
    const startIndex = index * 5;
    const endIndex = startIndex + 5;
    const table = generateTable(refinedData.slice(startIndex, endIndex));
    tablesContainer.appendChild(table);
  }

  teacherConflicts *= -1;
  overNumDays *= -1;
  outOfRangeDay *= -1;
  const totalFitness = teacherConflicts + outOfRangeDay + overNumDays;

  bestFitnessBadge.innerText = totalFitness + "";
  conflictsBadge.innerText = teacherConflicts + "";
  outOfRangeBadge.innerText = outOfRangeDay + "";
  overNumberOfDaysBadge.innerText = overNumDays + "";

  totalFitness === 0 && bestFitnessBadge.classList.add("green");
  teacherConflicts === 0 && conflictsBadge.classList.add("green");
  outOfRangeDay === 0 && outOfRangeBadge.classList.add("green");
  overNumDays === 0 && overNumberOfDaysBadge.classList.add("green");

  teacherConflicts < 0 && conflictsBadge.classList.remove("green");
  outOfRangeDay < 0 && outOfRangeBadge.classList.remove("green");
  overNumDays < 0 && overNumberOfDaysBadge.classList.remove("green");
}

function getData(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData);
}

function finished() {
  goButton.innerText = "Finished";
}

function refineData(timetable) {
  const refinedData: any = [];
  let prevDay = undefined;
  let prevRoom = undefined;
  let currentRow: any = [];

  for (const lesson of timetable) {
    if (prevRoom !== lesson._room_id || prevDay !== lesson._day._id) {
      currentRow.length && refinedData.push([...currentRow]);
      prevDay = lesson._day._id;
      prevRoom = lesson._room_id;
      currentRow = [`${lesson._day._name}`, lesson._subject._name];
    } else {
      currentRow.push(lesson._subject._name);
    }
  }
  refinedData.push([...currentRow]);
  return refinedData;
}

function generateTable(tableData) {
  const tableElement = document.createElement("table");
  tableElement.classList.add("table", "table-striped");
  tableElement.innerHTML = ` 
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">1</th>
      <th scope="col">2</th>
      <th scope="col">3</th>
      <th scope="col">4</th>
      <th scope="col">5</th>
      <th scope="col">6</th>
      <th scope="col">7</th>
      <th scope="col">8</th>
    </tr>
  </thead>`;

  const generateRow = (rowData) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `<th scope="row">${rowData[0]}</th>
    `;
    for (let index = 1; index < rowData.length; index++) {
      const td = document.createElement("td");
      td.innerText = rowData[index];
      trElement.appendChild(td);
    }
    return trElement;
  };

  const tbodyElement = document.createElement("tbody");

  tableData.forEach((element) => {
    tbodyElement.appendChild(generateRow(element));
  });

  tableElement.appendChild(tbodyElement);

  return tableElement;
}
