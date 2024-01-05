var $1, $2, $3, $4, $5, $6, $7, $8, $9, $0;
var operate, number, operator, action, symbol;
function load() {
  operate = document.querySelector("#operate");
  if (operate.innerHTML == "None") {
    //visibility
    //default is hidden
    operate.style.visibility = "hidden";
  }

  number = document.querySelectorAll('.number');
  for (var i=0; i < number.length; i++) {
    number[i].onclick = num_click;
  }

  operator = document.querySelectorAll('.operator');
  for (var i=0; i < operator.length; i++) {
    operator[i].onclick = operator_click;
  }

  action = document.querySelectorAll('.action');
  for (var i=0; i < action.length; i++) {
    action[i].onclick = action_click;
  }

  symbol = document.querySelectorAll('.symbol');
  for (var i=0; i < symbol.length; i++) {
    symbol[i].onclick = symbol_click;
  }
}

function num_click() {
  //add number to operate line
  if (operate.innerHTML == "None") {
    operate.style.visibility = "visible";
    operate.innerHTML = "";
  }
  operate.innerHTML += this.id;
}

function operator_click() {
  last = operate.innerHTML[operate.innerHTML.length - 1];
  console.log(last);
  if (last == "+" || last == "-" || last == "*" || last == "/") {
    //if already have operator, then remove the exist one, and add the new one
    //"3+" => "3-"
    operate.innerHTML = operate.innerHTML.slice(0, -1);
  }
  operate.innerHTML += this.id;
}

function action_click() {

}

function symbol_click() {
  
}

function calculate() {
  
}