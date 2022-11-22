const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const savingsInput = document.querySelector("#savings");
const rentInput = document.querySelector("#rent");
const foodInput = document.querySelector("#food");
const utilitiesInput = document.querySelector("#utilities");
const insuranceInput = document.querySelector("#insurance");

const budgetTableContainer = document.querySelector(".budget-table");
const table = document.querySelector(".table");
const button = document.querySelector(".btn");
const resetButton = document.querySelector(".btn-reset");

const categories = [
  savingsInput,
  rentInput,
  foodInput,
  utilitiesInput,
  insuranceInput,
];

function computeSum(array) {
  let sum = 0;
  array.forEach((el) => {
    sum += Number(el.value || 0);
  });
  return sum;
}

function buildBudgetData(array, total) {
  const data = [];

  array.forEach((el) => {
    const category = {
      name: el.id,
      amount: Number(el.value || 0),
      percentage: ((Number(el.value) / total) * 100).toFixed(2),
    };

    data.push(category);
  });

  return data;
}

function displayRow(data) {
  const row = document.createElement("tr");

  //creates a new column element
  let column1 = document.createElement("td");

  //create text for the column element
  const column1text = document.createTextNode(`${data.name}`);

  //appends the text to the column element
  column1.appendChild(column1text);

  let column2 = document.createElement("td");

  const column2text = document.createTextNode(
    `${data.amount.toLocaleString()}`
  );
  column2.appendChild(column2text);

  let column3 = document.createElement("td");

  const column3text = document.createTextNode(`${data.percentage}%`);
  column3.appendChild(column3text);

  //appends the first column to the new row
  row.appendChild(column1);

  //appends the second column to the new row
  row.appendChild(column2);

  //appends the third column to the new row
  row.appendChild(column3);

  table.appendChild(row);
}

function resetForm() {
  categories.forEach((el) => (el.value = ""));
}

button.addEventListener("click", function (e) {
  e.preventDefault();

  // compute sum of budget categories
  const sum = computeSum(categories);

  // build budget data
  const data = buildBudgetData(categories, sum);

  budgetTableContainer.style.display = "block";

  // Show budget data on table
  data.forEach((el) => {
    displayRow(el);
  });

  resetForm();
});

resetButton.addEventListener("click", function (e) {
  e.preventDefault();
  // resetForm();
  budgetTableContainer.style.display = "none";
});
