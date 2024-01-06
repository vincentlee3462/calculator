var $1, $2, $3, $4, $5, $6, $7, $8, $9, $0;
var operate, number, operator, action, symbol;
var nums = ['']; //nums is a array that storing numbers for calculate.
var oper = [];
var oper_count = 0; //oper_count is the number that show how many operator are waiting to calculate.
var num_count = 0; //num_count is the number that show how many numbers are waiting to calculate.
var open_blan = [];
var close_blan = [];
var result, answer;
function load() {
  operate = document.querySelector("#operate");
  result = document.querySelector("#result");
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
  console.log("before", nums);
  nums[num_count] += this.id;
  console.log("after", nums);

}

function operator_click() {
  last = operate.innerHTML[operate.innerHTML.length - 1];

  if (operate.innerHTML != "None") {
    if (last == "+" || last == "-" || last == "*" || last == "/") {
      //if already have operator, then remove the exist one, and add the new one
      //"3+" => "3-"
      operate.innerHTML = operate.innerHTML.slice(0, -1);
  
      //also change operator in the "oper" array
      nums[num_count-1] = this.id;
      console.log(nums);
    } else if (this.id == "-" && !(nums[num_count-1] > "0" && nums[num_count-1] < "9")) {
      //num_count -= 1;
      nums[num_count] += this.id;
    } else {
      //num_count++;
      
      num_count++;
      nums[num_count] = this.id;
      num_count++;
      nums[num_count] = '';
      console.log(nums);
    }
    operate.innerHTML += this.id;
    
  } else if (this.id == "-") {
    nums[num_count] += this.id;
  }
}

function symbol_click() {
  if (operate.innerHTML == "None") {
    operate.style.visibility = "visible";
    operate.innerHTML = ""
  }

  if (this.id == "dot") {
    //dot symbol
    if (nums[num_count].length == 0) {
      operate.innerHTML += "0.";
      nums[num_count] += "0."
      console.log(nums[num_count]);
    } else if (nums[num_count].includes(".") == false) {
      operate.innerHTML += ".";
      nums[num_count] += ".";
    } 
  } else if (this.id == "open") {
    //open blanket
    if (nums[num_count] != "") {
      num_count++;
      nums[num_count] = "";
    }
    if (nums[num_count-1] > "0" && nums[num_count-1] < "9") {
      nums[num_count] = "*";
      num_count++;
      nums[num_count] = "";
    }
    nums[num_count] = "(";
    open_blan.push(num_count);
    num_count++;
    nums[num_count] = "";
    operate.innerHTML += "(";
  } else if (this.id == "close") {
    if (close_blan.length < open_blan.length) {
      if (nums[num_count] != "") {
        num_count++;
        nums[num_count] = "";
      }
      nums[num_count] = ")";
      close_blan.push(num_count);
      num_count++;
      nums[num_count] = "";
      operate.innerHTML += ")";
      
    }
  }
  console.log(nums);
}

function action_click() {
  if (this.id == "clear") {
    nums = [''];
    //oper = [];
    num_count = 0;
    //oper_count = 0;

    operate.innerHTML = "None";
    operate.style.visibility = "hidden";
    result.innerHTML = "0";
    answer = result.innerHTML;
  }
}

function calculate() {
  
}

//when type operator, mark number and operator onto "nums" and "oper"
//num_count and oper_count add one
//if there does not exist close blanket at the end, add a close blanket automatically when calculating.