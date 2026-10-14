// // // // console.log("is the external js loading");

// // // // // in js we have thre variabe names --var let and const
// // // // // if (true) {
// // // // //     var a = 1;
// // // // //     let b = 2;
// // // // // }

// // // // // console.log(a);
// // // // // console.log(b);

// // // // // var x = 1;
// // // // // var x = 2;
 
// // // // // console.log(x);

// // // // // let a = 1;
// // // // // let a = 2;

// // // // // var a;
// // // // // console.log(a);

// // // // // let a;
// // // // // console.log(a);

// // // // // const a;
// // // // // console.log(a);


// // // // // const age = 22;
// // // // // age = 24;

// // // // // console.log(age);

// // // // // const user = { name:'Anjali'};

// // // // // user.name = "Ashish"; // This is allowed
// // // // // user.age = 22;      // this is also allowed

// // // // // console.log(user);

// // // // // console.log(a);

// // // // // var a = 5;

// // // // // console.log(a);

// // // // // // console.log(b);

// // // // // // const b = 5;

// // // // // // console.log(b);

// // // // // // {    //TDZ for c in starts here 
// // // // // //     console.log(c)   // Refrence Error
// // // // // //     let c = 10;       // TDZ ends here
// // // // // //     // console.log(c);
// // // // // // }


// // // // // // greet()
// // // // // // function greet() {
// // // // // //     console.log('Hello');
// // // // // // }

// // // // // // // greet();
// // // // // // var greet = function () {
// // // // // //     console.log('hello');
// // // // // // }
// // // // // // console.log('hello');
// // // // // // Declaration    Hoisted?    Usable before   what you get
// // // // // // var              Yes           Yes          undefined
// // // // // // let/const          Yes           No         Refrence error-- TDZ
// // // // // //function            Yes           Yes        the function       
// // // // // //function expression  only the varibables / NO/ TYpe error



// // // // // //Data TYpes --- 8 DataTypes --- 7 are primitive and the 1 is object tyope

// // // // // // 1. string
// // // // // // 2. numbers
// // // // // // 3. boolean
// // // // // // 4. undefined
// // // // // // 5. null
// // // // // // 6. Symbol 
// // // // // // 7.bignit

// // // // // // let x = null;
// // // // // // console.log(typeof x)

// // // // // // let a = 'hello'
// // // // // // a[0] = "H";
// // // // // // console.log(a);

// // // // // // let a;
// // // // // // console.log(a);

// // // // // // const user = {name: 'anjali'};
// // // // // // console.log(user.age)

// // // // // // let userr = null;
// // // // // // userr = {name: 'anjali'}

// // // // // // false 0 -0 On "" null undefined NaN

// // // // // == vs ===

// // // // console.log("5" + 3)  //8 or 53??
// // // // console.log("5" - 3); 
// // // // console.log("5" * 3); 

// // // // console.log('1' + 2 + 3)
// // // // console.log(false + 1)

// // // function greet(name) {
// // //     return "Hello" + " " +  name 
// // // }

// // // console.log(greet('Anjali')) // Hello 


// // function isAdult(age) {
// //     if (age >= 18) {
// //         return true;
// //     }
// //     return false;
// // }

// // console.log(isAdult(15))

// // function addition(a, b) {
// //     const sum = a + b;
// // }

// // console.log(addition(2, 5));




// // function greet(name = 'Guest') {
// //     return "Hello" + " " +  name 
// // }

// // console.log(greet()) // Hello 
// // console.log(greet('anjali')) // Hello 

// //traditional function
// const square = function(n) {
//     return n*n;
// };

// // console.log(369)

// // modern javascript
// //arrow function

// const cube = (n) => {
//     return n * n * n;
// };

// //arrow with a single expression -- the retun is automatic
// const double = (n) => n *2 ;

// console.log(square(3), cube(6), double(9));

// function runTwice(task){
//     task();
//     task();

// }

// runTwice(() => console.log("hi"));


// //Total 3 loops in javascript  --- for / while /do-while 
// for (let i = 1; i <=5; i++) {
//     console.log("Row!", i);
// }

// let attempts = 0;

// while(attempts < 3) {
//     console.log("Attempt", attempts + 1);
//     attempts++;
// }

// let n = 10;
// do {
//     console.log('Run once even through n is 10');
// } while (n < 5);


// //for... of 

// const subject = ['html', 'css', 'js', 'python'];

// for (const s of  subject) {
//     console.log(subject);
// }

// //break and continue
// const marks = [75, 45, -1, 88, 90];

// for (const mark of marks){
//     if (mark < 0) {
//       console.log("Invalid mark found");
//       break;
//     }

//     if(mark < 50) {
//         continue; 
//     }
//     console.log("Pass", mark);
// }

// // for --- you know how many times you need to print or need index
// //while --- when you only know the stopping condition
// //do...while ---- the body must run atleast once
// //for...of ---- you want each value from a list

const title = document.getElementById('title');
const firstinfo = document.querySelector('.info');
const allinfo = document.querySelectorAll('.info');

const  emailbox = document.querySelector('input[name="email"]');

console.log(title.textContent);

firstinfo.textContent   = 'Saved Successfuly';
firstinfo.innerHTML = "<b> Saved</b> Successfuly ";

firstinfo.style.color = 'red'

const btn = document.getElementById('btn');
const countText = document.getElementById('count');

let count = 0;

btn.addEventListener("click", () => {
    count++;
    countText.textContent = count;
})

function sayHi() {
    alert('hello Anjali');
}

btn.addEventListener('click', sayHi);

btn.addEventListener('click', (event) => {
    console.log(event.type);
    console.log(event.target);
});