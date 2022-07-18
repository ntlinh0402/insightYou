import {
  setDoc,
  doc,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";
import { getCookie } from "../util/cookie.js";
const db = getFirestore();
const currentYear = 2022;
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octomber",
  "November",
  "December",
];
const colors = ["#2d6b5f", "#72e3a6", "#dff4c7", "#edbf98", "#ea3d36"];
const react = ["Happy", "Normal", "Neutral", "Sad", "Cry"];
const defaultColor = "#888";
let activeColor = "";

let moodList;

const calendar = document.getElementById("calendar");
const moods = document.querySelectorAll(".mood");

let querySnapshot;

moods.forEach((mood) => {
  mood.addEventListener("click", () => {
    // if is already selected, deselect it
    if (mood.classList.contains("selected")) {
      mood.classList.remove("selected");
      activeColor = defaultColor;
    } else {
      moods.forEach((mood) => {
        mood.classList.remove("selected");
      });

      mood.classList.add("selected");
      activeColor = getComputedStyle(mood).getPropertyValue("color");
    }
  });
});

const getAllDays = (year) => {
  // First day of the year - 1st January
  const firstDay = new Date(`January 1 ${year}`);
  // Last day of the year - 31th December - used to stop adding days to the array
  const lastDay = new Date(`December 31 ${year}`);

  // Add first day
  const days = [firstDay];

  // Used to keep track of the day
  let lastDayInArray = firstDay;

  // Loop while there are new days to be added in the current year
  while (lastDayInArray.getTime() !== lastDay.getTime()) {
    days.push(addDays(lastDayInArray, 1));
    lastDayInArray = days[days.length - 1];
  }

  return days;
};

const dates = getAllDays(currentYear);

let monthsHTML = "";

// Loop over the months and create a div for each month
months.forEach((month, idx) => {
  monthsHTML += `<div style="height:250px; position: relative"class="months month_${idx}">
        <h3>${month}</h3>
        <div class="week_days_container">
            ${weekDays
              .map((day) => `<div class="week_days">${day}</div>`)
              .join("")}
        </div>
        <div class="days_container"></div>
		<button style="width: 40%; bottom: 0; position: absolute;" name="dmjs" id="month${
      idx + 1
    }" >Show analysis</button>
    </div>`;

  calendar.innerHTML = monthsHTML;
  const element = document.getElementById("analysisBtn");
});


// document.getElementsByClassName("dmjs").onclick = function(){
// 	// let monthElement = this.id;
// 	// console.log(monthElement);
// 	console.log('sadoa');
// 	var ctx = document.getElementById("chart-line");
// 	var myLineChart = new Chart(ctx, {
// 		type: 'doughnut',
// 		data: {
// 			labels: months,
// 			datasets: [{
// 				data: [1200, 1700, 800, 200, 200],
// 				backgroundColor: ["rgba(255, 0, 0, 0.5)", "rgba(100, 255, 0, 0.5)", "rgba(200, 50, 255, 0.5)", "rgba(0, 100, 255, 0.5)"]
// 			}]
// 		},
// 		options: {
// 			title: {
// 				display: true,
// 				text: 'Weather'
// 			}
// 		}
// 	});
// }
// Loop over each day and
dates.forEach((date) => {
  const month = date.getMonth();
  const monthEl = document.querySelector(`.month_${month} .days_container`);

  // create extra day slots if needed before day 1
  if (date.getDate() === 1 && date.getDay() !== 0) {
    for (let i = 0; i < date.getDay(); i++) {
      const emptySpot = createEmptySpot();

      monthEl.appendChild(emptySpot);
    }
  }

  const dateEl = createDateEl(date);

  monthEl.appendChild(dateEl);
});

async function setData(circle, activeColor) {
  let day = circle.id;
  await setDoc(doc(db, getCookie("email"), circle.id), {
    time: circle.id,
    color: activeColor,
  });
}

// Add click event to all the .circles
const circles = document.querySelectorAll(".circle");
circles.forEach(function (circle) {
  circle.addEventListener("click", () => {
    circle.style.backgroundColor = activeColor;
    if (document.getElementById(circle.id).style.backgroundColor != "") {
      console.log(circle.id);
      try {
        setData(circle, activeColor);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  });
});

// Randomize functionality
// randomize.addEventListener('click', () => {
// 	circles.forEach(circle => {
// 		circle.style.backgroundColor = getRandomColor();
// 	});
// });

// Clear functionality
// clear.addEventListener('click', () => {
// 	circles.forEach(circle => {
// 		circle.style.backgroundColor = defaultColor;
// 	});
// });

window.getMoodFromMonth = function getMoodFromMonth(month) {
  let dataMood;
  getSnapshot();
  dataMood = month;
  // querySnapshot.forEach((doc) => {
  //   if (doc.data().time.toString().slice(-1) == month) {
  //     dataMood.add({
  //       "doc.data().time.toString().slice(-1)": doc.data().color,
  //     });
  //   }
  // });
  return dataMood;
}

async function getSnapshot() {
  querySnapshot = await getDocs(collection(db, getCookie("email")));
}

async function SetDataMood() {
  const querySnapshot = await getDocs(collection(db, getCookie("email")));
  querySnapshot.forEach((doc) => {
    document.getElementById(doc.data().time).style.backgroundColor =
      doc.data().color;
  });
}

function createDateEl(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const dateEl = document.createElement("div");
  dateEl.classList.add("days");
  dateEl.innerHTML = `<span id="${day}-${month}" name="daymood" class="circle">${day}</span>`;
  SetDataMood();
  return dateEl;
}

function createEmptySpot() {
  const emptyEl = document.createElement("div");
  emptyEl.classList.add("days");

  return emptyEl;
}

// function from StackOverflow: https://stackoverflow.com/questions/563406/add-days-to-javascript-date
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}