let products = [
{id:1,sku:'prod-1',price:12},
{id:2,sku:'prod-2',price:15},
{id:3,sku:'prod-3',price:18},
{id:4,sku:'prod-1',price:12},
{id:5,sku:'prod-2',price:15},
]

let oneProduct = {id:6,sku:'prod-3',price:12};

let addedProduct = [];

products.map(function(product,index){
    product.quantity=1;
    const findProduct = addedProduct.filter((item) => {
        if((item.sku===product.sku)){
            item.quantity+=1;
            item.price = (item.price + product.price);
            return item;
        }
    });
    // console.log(findProduct);
    if(findProduct.length===0){
        addedProduct.push(product);
    }
});
addedProduct.map((item) => {
    if(item.sku===oneProduct.sku){
        item.quantity+=1;
        item.price = (item.price + oneProduct.price);
    }
})
// console.log(addedProduct);
document.querySelector('.product').innerHTML= addedProduct.map(function(item,index){
    return `<div>${item.id} ${item.sku} ${item.price} ${item.quantity}</div>`
}).join('');


let poll = {question : "Whats your faviorite language?",
 answer : ["C", "Java", "Html", "C++"],
 pollCount : 20,
 answerWeight: [4,4,2,10], // sum of 20
 selectedAnswer:-1
}



let pollDom = {
    question: document.querySelector('.poll .question'),
    answers: document.querySelector('.poll .answers'),
}

pollDom.question.innerHTML=poll.question;
pollDom.answers.innerHTML=poll.answer.map(function(answer,i){
    return (`
    <div class="answer" data-index='${i}' onclick="markAnswer('${i}')">
       ${answer}
        <span class="percentage-bar"></span>
        <span class="percentage-value"></span>
   </div>
    `);
}).join('');


// function markAnswer(i){
//     poll.selectedAnswer= +i;
//     try{
//      document.querySelectorAll('.answers .answer.selected').forEach(item => item.classList.remove("selected"));
//     }catch(err){

//     }
//     document.querySelectorAll(".poll .answers .answer")[+i]
//      .classList.add("selected");

//      showResults()
// }

function showResults(){
    let answers = document.querySelectorAll(".poll .answers .answer");
    for (let index = 0; index < answers.length; index++) {
        const element = answers[index];
        let percentage = 0;
        if(index === poll.selectedAnswer){
            percentage= Math.round((poll.answerWeight[index]+1)*100/(poll.pollCount+1));
        }else{
            percentage= Math.round((poll.answerWeight[index])*100/(poll.pollCount+1));
        }
        answers[index].querySelector('.percentage-value').innerText=percentage+"%";
        answers[index].querySelector('.percentage-bar').style.width=percentage+"%";
    }
}

let container = {
    question: document.querySelector('container'),
}
// /     /////////////////////////////////////////////////////////////////////////////////////////////////


function markAnswer(i){
    const answersNode = i.parentNode;
   let id=  i.dataset.id;
   let poll=  JSON.parse(i.dataset.poll);
   poll.answer.map((item) => {
       if(item._id==id){
           item.count=item.count+1;
        }
    })
    poll.total=poll.total+1;
    let url =`http://localhost:3000/polls/${poll.id}`;
    fetch(url,{
        method:"PATCH",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(poll),
    }).then((response) => response.json())
    .then(data => updateAnsDom(data,answersNode))
    .catch((error) => {
         console.log(error);
    });
}

const updateAnsDom =(data,ansNode)=>{
    console.log(data);
    console.log(ansNode);
} 

const initialize =(json) => {
    let result = [];
    document.querySelector('.container').innerHTML =  json.map(function(item,index){
        let total=0;
        let question = {}; 
        question.question = item.question;
        question.id = item._id;
        question.answer = []
        item.answer.map(ans => {
            question.answer.push(ans);
            total+=ans.count;
        })
        question.total=total;
        result.push(question);
    });
    document.querySelector('.container').innerHTML = result.map(function(item,index){
        let num = Math.round(100/(item.total));
        return `<div class="poll" id='${item.id}' data-total='${item.total}'>
        <div class="question">${item.question}</div>
        <div class="answers">
        ${item.answer.map(function(ie,index){
           return `<div class="answer" data-poll='${JSON.stringify(item)}' data-count='${ie.count}' data-ans='${ie.answer}' data-index="${index}" data-id='${ie._id}' onclick="markAnswer(this)">
                ${ie.answer}
                <span class="percentage-bar" style='width:${num*ie.count}%'></span>
                <span class="percentage-value">${num*ie.count}%</span>
            </div>`
        }).join('')}       
      </div>
    </div>
        `;
    }).join('')
}

fetch("http://localhost:3000/polls")
   .then((response) => response.json())
   .then(data => initialize(data))
   .catch((error) => {
        console.log(error);
   });

