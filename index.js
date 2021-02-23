//STATE

const laptops = {
  1: {
    name: "ASUS VIVOBOOK",
    model: "R438DA-EB274T",
    cpu: "AMD Ryzen™ 3 3250U",
    ram: "4GB",
    storage: "256GB SSD",
    screenSize: '14"',
    price: 3999,
    imgUrl:
      "https://media.power-cdn.net/images/h-5bf09a4f3466b9ff719e65192966bda5/products/1078042/1078042_3_1200x1200_t_g.webp",
  },
  2: {
    name: "HP PAVILION",
    model: "15-CS3816NO",
    cpu: "AMD Ryzen™ 3 3250U",
    ram: "4GB",
    storage: "256GB SSD",
    screenSize: '15"',
    price: 5949,
    imgUrl:
      "https://media.power-cdn.net/images/h-e22874e9b76f5896c308419c5dc7677d/products/1101912/1101912_12_1200x1200_t_g.webp",
  },
  3: {
    name: "ACER CHROMEBOOK",
    model: "CB314-1H-C8VP",
    cpu: "Intel® Celeron® N4020",
    ram: "4GB",
    storage: "64GB eMMC",
    screenSize: '14"',
    price: 2220,
    imgUrl:
      "https://media.power-cdn.net/images/h-3113d3aed9c1b12ab77d0de5285f51a2/products/1100679/1100679_8_1200x1200_t_g.webp",
  },
  4: {
    name: "ASUS GAMING",
    model: "FX506LI-HN212T",
    cpu: "Intel® Core™ i5-10300H",
    ram: "8GB",
    storage: "512GB M.2 SSD",
    screenSize: '15.6"',
    price: 6799,
    imgUrl:
      "https://media.power-cdn.net/images/h-7f9e31fdfc3eae65627e4c3ee4edcb46/products/1130705/1130705_11_1200x1200_t_g.webp",
  },
};

const bank = {
  balance: 0,
  loan: 0,
};

const work = {
  balance: 0,
  pay: 100,
};

let selected = Object.keys(laptops)[0];

// HTML element references and event listeners.

const bankBalance = document.getElementById("bankBalance");
const loanBalance = document.getElementById("loanBalance");
const workBalance = document.getElementById("workBalance");
const shortSpecs = document.getElementById("shortSpecs");
const longSpecs = document.getElementById("longSpecs");
const laptopImg = document.getElementById("laptopImg");
const bankWindow = document.getElementById("bankWindow");
const laptopSelect = document.getElementById("laptopSelect");
laptopSelect.addEventListener("click", function () {
  listSelect();
});
const workButton = document.getElementById("workBtn");
workButton.addEventListener("click", function () {
  goToWork();
});
const loanButton = document.getElementById("loanBtn");
loanButton.addEventListener("click", function () {
  takeLoan();
});
const repayLoanButton = document.getElementById("repayLoanBtn");
repayLoanButton.addEventListener("click", function () {
  repayLoan();
});
const buyButton = document.getElementById("buyBtn");
buyButton.addEventListener("click", function () {
  buyLaptop();
});
const bankPayButton = document.getElementById("bankPayBtn");
bankPayButton.addEventListener("click", function () {
  bankPay();
});

// BUSINESS LOGIC

/* 
Logic for taking a loan
*/
const takeLoan = () => {
  let amount = 0;
  bank.loan
    ? alert("You must repay your loan before taking another")
    : (amount = prompt("How much do you want to loan?"));
  if (amount) {
    if (amount > bank.balance * 2) {
      alert("You can only loan up to double your current balance");
    } else {
      bank.loan = amount;
      bank.balance += eval(bank.loan);
    }
  }
  render();
};

/*
Logic for repaying the loan
*/
const repayLoan = () => {
  if (bank.balance > bank.loan) {
    bank.balance -= bank.loan;
    bank.loan = 0;
  } else {
    alert("You do not have enough money");
  }
  render();
};

/*
Logic for going to work
*/
const goToWork = () => {
  work.balance += work.pay;
  render();
};

/*
Logic for banking the pay from work. If there is a loan present, it will deduct 10% to the loan.
*/
const bankPay = () => {
  if (bank.loan) {
    let loanFee = work.balance * 0.1;
    loanFee > bank.loan && (loanFee = bank.loan);
    bank.balance += work.balance - loanFee;
    bank.loan -= loanFee;
  } else {
    bank.balance += work.balance;
  }
  work.balance = 0;
  render();
};

/* 
Logic for buying a laptop
*/
const buyLaptop = () => {
  const selectedPrice = laptops[selected].price;
  const laptopName = laptops[selected].name;
  if (selectedPrice > bank.balance) {
    alert("You do not have enough money");
  } else {
    alert(`You bought ${laptopName} for: ${selectedPrice} DKK`);
    bank.balance -= selectedPrice;
    render();
  }
};

// GUI

/*
 Updates the HTML of the dynamic variables
*/
const render = () => {
  workBalance.innerText = `Balance: ${work.balance} DKK`;
  bankBalance.innerText = `Balance: ${bank.balance} DKK`;
  loanBalance.innerText = `Loan: ${bank.loan} DKK`;

  work.balance
    ? bankPayButton.classList.remove("btnhide")
    : bankPayButton.classList.add("btnhide");

  bank.loan
    ? repayLoanButton.classList.remove("btnhide")
    : repayLoanButton.classList.add("btnhide");
};

/*
Updates the laptop view when a laptop is chosen on the dropdown menu
*/
const listSelect = () => {
  selected = laptopSelect.value;
  shortSpecs.innerHTML = `<p>Storage: <b>${laptops[selected].storage}</b> <br/> Screen size:  <b>${laptops[selected].screenSize}</b> <br/> Price: <b>${laptops[selected].price} DKK</b> </p>`;
  longSpecs.innerHTML = `<h2>${laptops[selected].name}</h2><p>CPU: <b>${laptops[selected].cpu}</b> <br/> Model: <b>${laptops[selected].model}</b> <br/> RAM: <b>${laptops[selected].ram}</b> <br/> Storage: <b>${laptops[selected].storage}</b> <br/> Screen size:  <b>${laptops[selected].screenSize}</b> <br/> Price: <b>${laptops[selected].price} DKK</b> </p>`;
  laptopImg.src = laptops[selected].imgUrl;
};

// SETUP
/*
Adds the elements to the dropdown from the laptops state object
*/
Object.keys(laptops).forEach((id) => {
  const option = document.createElement("option");
  option.textContent = laptops[id].name;
  option.value = id;
  laptopSelect.appendChild(option);
});

render();
listSelect();
