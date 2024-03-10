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


function markAnswer(i){
    poll.selectedAnswer= +i;
    try{
     console.log(document.querySelector(".poll .answers .answer.selected")); 
     document.querySelectorAll('.answers .answer.selected').forEach(item => item.classList.remove("selected"));
    }catch(err){

    }
    document.querySelectorAll(".poll .answers .answer")[+i]
     .classList.add("selected");

     showResults()
}

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

