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
  } else if (nums[num_count-1] == ")") {
    nums[num_count] = "*";
    num_count++;
    nums[num_count] = ""

    operate.innerHTML += "*"
  }
  operate.innerHTML += this.id;
  console.log("before", nums);
  nums[num_count] += this.id;
  console.log("after", nums);
  console.log(num_count);
}

function operator_click() {
  last = operate.innerHTML[operate.innerHTML.length - 1];

  if (operate.innerHTML != "None") {
    if (last == "+" || last == "-" || last == "*" || last == "/") {
      console.log("if");
      //if already have operator, then remove the exist one, and add the new one
      //"3+" => "3-"
      operate.innerHTML = operate.innerHTML.slice(0, -1);
  
      //also change operator in the "nums" array
      nums[num_count-1] = this.id;
      console.log(nums);
    } else if (this.id == "-" && !(nums[num_count-1] >= "0" && nums[num_count-1] <= "9")) {
      //num_count -= 1;
      console.log("else if");
      if (nums[num_count] == "") {
        nums[num_count] += this.id;
      } else {
        nums.push(this.id);
        nums.push("");
        num_count += 2;
      }
    } else if (nums[num_count] == "") {
      nums[num_count] = this.id;
      console.log(num_count);
    } else {
      //num_count++;
      console.log("else");
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
  console.log(num_count);
  console.log(nums);
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
    }
    if (nums[num_count-1] >= "0" && nums[num_count-1] <= "9") {
      nums[num_count] = "*";
      num_count++;
      nums[num_count] = "";
    }
    console.log(nums);
    nums[num_count] = "(";
    open_blan.push(num_count);
    num_count++;
    nums[num_count] = "";
    operate.innerHTML += "(";
    console.log("open bracket", open_blan);
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
      console.log("close bracket", close_blan);
    }
  }
  console.log(nums);
  console.log(num_count);

}

function action_click() {
  if (this.id == "clear") {
    nums = [''];
    //oper = [];
    num_count = 0;
    //oper_count = 0;
    open_blan = [];
    close_blan = [];

    operate.innerHTML = "None";
    operate.style.visibility = "hidden";
    answer = result.innerHTML;
    result.innerHTML = "0";
  } else if (this.id == "result") {
    
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

    console.log(nums);
    console.log(open_blan);
    if (close_blan.length < open_blan.length) {
      console.log("open bracket", open_blan);
      console.log("close bracket", close_blan);
      add_close = open_blan.length - close_blan.length;
      for (var i=0; i<add_close; i++) {
        console.log(i);
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
    
    console.log("open bracket", open_blan);
    console.log("close bracket", close_blan);
    //var nums_final;
    if (nums.includes("(") == true) {
      //have bracket
      result.innerHTML = bracket(nums);
      answer = result.innerHTML;
    } else {
      //calculate
      result.innerHTML = calculate(nums);
      answer = result.innerHTML;

    }
  }
}

function calculate(content) {
  var value = 0;
  var content_final, content_front, content_end;
  console.log("calculate content", content);
  if (content.length < 4) {
    //only one operation, simply calculation.
    console.log("one operation, one calculate");
    
    if (content[1] == "*") {
      value = content[2] * content[0];
    } else if (content[1] == "/") {
      value = content[0] / content[2];
    } else if (content[1] == "+") {
      value = content[2] + content[0];
    } else if (content[1] == "-") {
      value = content[0] - content[2];
    }
    console.log(value);
    return value;
  } else {
    //more than one operation, complicated calculation.
    //do multiply and division first, then do add and minus later.
    console.log("multiple operation, complicated calculate");
    while (content.length != 1) {
      console.log(content.length);
      
      if (content.includes("*") || content.includes("/")) {
      //still exist multiply and division.
        for (var i=0; i<content.length; i++) {
          if (content[i] == "*" || content[i] == "/") {
            content_front = content.slice(0, i-1);
            content_end = content.slice(i+2);
            
            
            console.log("front", content_front);
            console.log("end", content_end);
            
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
            
            
            console.log("front", content_front);
            console.log("end", content_end);
            
            value = calculate(content.slice(i-1, i+2));
            content_final = content_front.concat(value);
            content_final = content_final.concat(content_end);
            content = content_final;
            break;
          }
        }
      }
    }
  }
  //return content;
}





function bracket(content) {
  //determine whether a pair of bracket
  console.log("======content", content, "======");
  if (content.includes("(") == true) {
    while (content.includes("(") == true) {
      var start = 0;
      var blan_count = 0;
      var todelete;
      var content_final;
      var content_front, content_end;
      //find out different pair of bankets.
      for (var i=0; i<content.length; i++) {
        if (content[i] == "(") {  
          blan_count++;
        } else if (content[i] == ")") {
          blan_count--;
        }
        
        if (blan_count == 1 && content[i] == "(") {
          start = i;
        }
        
        if (blan_count == 0 && content[i] == ")") {
          //console.log("i", i, "content[i]", content[i]);
          //delete content[start];
          //delete content[i];
          todelete = content.slice(start+1, i);
          console.log("todelete", todelete);

          //console.log(content);
          //console.log("content after delete", content);

          content_front = content.slice(0, start);
          content_end = content.slice(i+1);
          
          console.log("front", content_front);
          console.log("end", content_end);
          
          value = bracket(todelete);
          content_final = content_front.concat(value);
          content_final = content_final.concat(content_end);
          console.log("content_final", content_final);
          content = content_final;
          console.log("include bracket?", content.includes("("));
          break;
        }
      }
    } 
    //return content_final;
  } 
  if ((content.includes("+") || content.includes("-") || content.includes("*") || content.includes("/")) && (content.includes("(") == false)) {
    console.log("call calculate");  
    return calculate(content);
  } else {
    console.log("only number return number");
    console.log(content);
    return content;
  }
}


//when type operator, mark number and operator onto "nums" and "oper"
//num_count and oper_count add one
//if there does not exist close bracket at the end, add a close bracket automatically when calculating.