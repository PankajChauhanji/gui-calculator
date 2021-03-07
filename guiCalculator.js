// Calculator

// Stack.
class Stack{
    constructor() { this.items = []; }
    pushStack(value) { this.items.push(value); }
    popStack() { 
        return (this.items.length<1) ? -1 : this.items.pop();
    }
    top() { return this.items[this.items.length-1]; }
    isStackEmpty() { return this.items.length == 0 ; }
}

// Function to check if It is Number.
function isNumber(num) {
    for (let i=0; i<num.length; ++i)
        if (num[i].charCodeAt()<48 || num[i].charCodeAt()>=58 ) return false;
    return true;
}

// Function to check if operator
function isOperator(value) {
    let operators = ['+', '-', '*', '/', '^', '%'];
    return (operators.includes(value)) ? true : false;
}

// Function to check order of operators.
function order(value) {
    if(value=='^') return 3;
    else if(value=='*' || value=='/') return 2;
    else if(value=='+' || value=='-') return 1;
}

// Function to convert string of arithematic expressions to array.
function splitArray(str) {
    let arr = new Array(), temp = '';
    for (let i=0; i<str.length; i++) {
        if (isNumber(str[i]) || str[i]=='.') {
            temp += str[i];
        }
        else if(isOperator(str[i])) {
            arr.push(temp);
            arr.push(str[i]);
            temp = '';
        }
    }
    arr.push(temp);
    return arr;
}

// Function to convert infix to inFixToPostFix
function inFixToPostFix(str) {
    let s1 = new Stack(), ans = new Array();
    s1.pushStack("@");
    for (let i=0; i<str.length; ++i) {
        if (isNumber(str[i])) {
            ans.push(str[i]);
        } else {
            while(s1.top()!="@" && order(str[i])<=order(s1.top())) {
                ans.push(s1.top());
                s1.popStack();
            }
            s1.pushStack(str[i]);
        }
    }
    while (s1.top()!="@") {
        ans.push(s1.top());
        s1.popStack();
    }
    return ans;
}
// Evaluate postfix notations.
function evaluate(str) {
    let resultStack = new Stack();
    for (let i=0; i<str.length; i++) {
        if (isNumber(str[i])) {
            resultStack.pushStack(str[i]);
        } else { 
            let val1 = Number(resultStack.top());
            resultStack.popStack();
            let val2 = Number(resultStack.top());
            resultStack.popStack();
            switch (str[i]) {  
                case '+': resultStack.pushStack(val2 + val1); break;  
                case '-': resultStack.pushStack(val2 - val1); break;
                case '*': resultStack.pushStack(val2 * val1); break;  
                case '/': resultStack.pushStack(val2/val1); break;
                case '%': resultStack.pushStack(val2%val1); break;
                case '^': resultStack.pushStack(val1**val2); break;
            }
        }
    }
    return resultStack.top();
}

//  Function to solve numerical data from display screen and add result to screen.
function solve() {
    let answer = 0, str1 = [], str2 = [], str3 = [];
    try {
        str1 = document.querySelector(".input-area").value;
        str2 = splitArray(str1);
        str3 = inFixToPostFix(str2);
        answer = evaluate(str3);
        document.querySelector(".input-area").value = answer;
    } catch(e) {
        // if there is any error then display that on screen.
        document.querySelector(".input-area").value = e;
    }
}

// Function to display data on screen.
function displayOnScreen( value ) {
    document.querySelector(".input-area").value += value;
}

//  To clear all data from sreen.
function clearScreen() {
    document.querySelector(".input-area").value = "";
}

//  To clear just last data from screen.
function clearScreenOne() {
    let value1 = document.querySelector(".input-area").value, value2 = "";
    for (let i=0; i<value1.length-1; i++) {
        value2 += value1[i];
    }
    document.querySelector(".input-area").value = value2;
}