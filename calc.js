var $1, $2, $3, $4, $5, $6, $7, $8, $9, $0;
var operate, number, operator, action, symbol;
var nums = ['']; //nums is a array that storing numbers for calculate.
var num_count = 0; //num_count is the number that show how many numbers are waiting to calculate.
var open_blan = [];
var close_blan = [];
var result, answer;
var needClear = false;
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
  } else if (nums[num_count-1] == ")" && nums[num_count] != "-" && nums[num_count] != "*") {
    nums[num_count] = "*";
    num_count++;
    nums[num_count] = ""

    operate.innerHTML += "*"
  } else if (nums[num_count-1] == ")" && nums[num_count] == "-") {
    num_count++;
    nums[num_count] = "";
  } else if (needClear == true) {
    operate.innerHTML = "";
    nums = [''];
    num_count = 0;
    open_blan = [];
    close_blan = [];
    needClear = false;
  }
  operate.innerHTML += this.id;
  nums[num_count] += this.id;
  console.log(num_count);
}

function operator_click() {
  last = operate.innerHTML[operate.innerHTML.length - 1];

  if (operate.innerHTML != "None") {
    if (last == "+" || last == "-" || last == "*" || last == "/") {
      //if already have operator, then remove the exist one, and add the new one
      //"3+" => "3-"
      operate.innerHTML = operate.innerHTML.slice(0, -1);
  
      //also change operator in the "nums" array
      nums[num_count-1] = this.id;
    } else if (this.id == "-" && !(nums[num_count-1] >= "0" && nums[num_count-1] <= "9")) {
      if (nums[num_count] == "") {
        console.log("this");
        nums[num_count] += this.id;
        //operate.innerHTML += this.id;
      } else {
        console.log("else");
        //operate.innerHTML += this.id;
        nums.push(this.id);
        nums.push("");
        num_count += 2;
      }
    } else if (nums[num_count] == "") {
      nums[num_count] = this.id;
      num_count++;
      nums[num_count] = '';
    } else if (needClear == true) {
      needClear = false;
      operate.innerHTML = "";
      nums = [''];
      num_count = 0;
      open_blan = [];
      close_blan = [];  
    } else {
      num_count++;
      nums[num_count] = this.id;
      num_count++;
      nums[num_count] = '';
    }
    operate.innerHTML += this.id;
    
  } else if (this.id == "-") {
    nums[num_count] += this.id;
    operate.style.visibility = "visible";
    operate.innerHTML = "";
    operate.innerHTML += this.id;
  }
}

function symbol_click() {
  if (operate.innerHTML == "None") {
    operate.style.visibility = "visible";
    operate.innerHTML = ""
  } else if (needClear == true) {
    operate.innerHTML = "";
    nums = [''];
    num_count = 0;
    open_blan = [];
    close_blan = [];
    needClear = false;
  }

  if (this.id == "dot") {
    //dot symbol
    if (nums[num_count].length == 0) {
      operate.innerHTML += "0.";
      nums[num_count] += "0.";
      
    } else if (nums[num_count].includes(".") == false) {
      operate.innerHTML += ".";
      nums[num_count] += ".";
    } 
  } else if (this.id == "open") {
    //open bracket
    if (nums[num_count] != "") {
      num_count++;
      nums[num_count] = "";
      if ((nums[num_count-1][0] >= "0" && nums[num_count-1][0] <= "9")) {
        nums[num_count] = "*";
        num_count++;
        nums[num_count] = "";
      }
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
}

function action_click() {
  if (needClear == true) {
    needClear = false;
    operate.innerHTML = "";
    nums = [''];
    num_count = 0;
    open_blan = [];
    close_blan = [];
  }
  if (this.id == "clear") {
    nums = [''];
    num_count = 0;
    open_blan = [];
    close_blan = [];

    operate.innerHTML = "None";
    operate.style.visibility = "hidden";
    answer = result.innerHTML;
    result.innerHTML = "0";
  } else if (this.id == "result") {
    needClear = true;
    if (nums.at(-1) == "") {
      nums.pop();
    }

    if (nums.at(-1) == "(") {
      nums.pop();
      open_blan.pop();
    }

    if (nums.at(-1) == "+" || nums.at(-1) == "-" || nums.at(-1) == "*" || nums.at(-1) == "/") {
      nums.pop();
    }

    if (close_blan.length < open_blan.length) {
      add_close = open_blan.length - close_blan.length;
      for (var i=0; i<add_close; i++) {
        nums.push(")");
        num_count = nums.length-1;
        close_blan.push(num_count);
      }
    }
    
    //turn number string to numbers
    for (var i=0; i<nums.length; i++) {
      if (isNaN(nums[i]) == false) {
        nums[i] = Number(nums[i]);
      }
    }
    
    if (nums.includes("(") == true) {
      //have bracket
      result.innerHTML = Number(bracket(nums).toFixed(12));
      answer = result.innerHTML;
    } else {
      //calculate
      result.innerHTML = Number(calculate(nums).toFixed(12));
      answer = result.innerHTML;
    }
  } else if (this.id == "answer") {
    if (operate.innerHTML == "None") {
      operate.innerHTML = "";
      operate.style.visibility = "visible";
    }
    operate.innerHTML += answer;
    nums[num_count] = answer;
  }
}

function calculate(content) {
  var value = 0;
  var content_final, content_front, content_end;
  if (content.length < 4) {
    //only one operation, simply calculation.
    
    if (content[1] == "*") {
      value = content[2] * content[0];
    } else if (content[1] == "/") {
      value = content[0] / content[2];
    } else if (content[1] == "+") {
      value = content[2] + content[0];
    } else if (content[1] == "-") {
      value = content[0] - content[2];
    } else if (content.length == 1) {
      value = content[0];
    }
    return value;
  } else {
    //more than one operation, complicated calculation.
    //do multiply and division first, then do add and minus later.
    while (content.length != 1) {      
      if (content.includes("*") || content.includes("/")) {
      //still exist multiply and division.
        for (var i=0; i<content.length; i++) {
          if (content[i] == "*" || content[i] == "/") {
            content_front = content.slice(0, i-1);
            content_end = content.slice(i+2);
                        
            value = calculate(content.slice(i-1, i+2));
            content_final = content_front.concat(value);
            content_final = content_final.concat(content_end);
            content = content_final;
            break;
          }
        }
      } else if (content.includes("+") || content.includes("-")) {
        //only add and minus exist.
        for (var i=0; i<content.length; i++) {
          if (content[i] == "+" || content[i] == "-") {
            content_front = content.slice(0, i-1);
            content_end = content.slice(i+2);
                        
            value = calculate(content.slice(i-1, i+2));
            content_final = content_front.concat(value);
            content_final = content_final.concat(content_end);
            content = content_final;
            break;
          }
        }
      } 
    }
    return content[0];
  }
}

function bracket(content) {
  //determine whether a pair of bracket
  if (content.includes("(") == true) {
    while (content.includes("(") == true) {
      var start = 0;
      var brack_count = 0;
      var todelete;
      var content_final;
      var content_front, content_end;
      //find out different pair of bankets.
      for (var i=0; i<content.length; i++) {
        if (content[i] == "(") {  
          brack_count++;
        } else if (content[i] == ")") {
          brack_count--;
        }
        
        if (brack_count == 1 && content[i] == "(") {
          start = i;
        }
        
        if (brack_count == 0 && content[i] == ")") {
          todelete = content.slice(start+1, i);

          content_front = content.slice(0, start);
          content_end = content.slice(i+1);
                    
          value = bracket(todelete);
          content_final = content_front.concat(value);
          content_final = content_final.concat(content_end);
          
          content = content_final;
          break;
        }
      }
    } 
  } 
  if ((content.includes("+") || content.includes("-") || content.includes("*") || content.includes("/")) && (content.includes("(") == false)) {
    return calculate(content);
  } else {
    return content;
  }
}


//when type operator, mark number and operator onto "nums" and "oper"
//num_count add one
//if there does not exist close bracket at the end, add a close bracket automatically when calculating.