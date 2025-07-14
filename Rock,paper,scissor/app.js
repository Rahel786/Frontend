let userScore=0;
let comScore=0;
let total=5; 
let wint=Math.ceil(total/2);

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");
const rstBtn=document.querySelector(".rst-btn");

const genCompChoice=()=>{
    const options=["rock","paper","scissor"];
    const randIdx=Math.floor(Math.random()*3);
    return options[randIdx];
}

const drawGame=()=>{
    msg.innerText="It's a draw!";
}

const rest=()=>{
    rstBtn.addEventListener("click",()=>{
    RestartGame();
    }
)
}

const userScorePara=document.querySelector("#user-score");
const CompScorePara=document.querySelector("#comp-score");

const RestartGame=()=>{
    userScore=0;
    comScore=0;
    userScorePara.innerText=userScore;
    CompScorePara.innerText=comScore;
    msg.innerText="play your move";
    enableChoices();
}

const showWinner=(userWin)=>{
    
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        if(userScore===wint){
            msg.innerText="You won the game!";
            disableChoice();
        }else{
            msg.innerText="You won this round!"
        }
    }else{
        comScore++;
        CompScorePara.innerText=comScore;
        
        if(comScore===wint){
            msg.innerText="Comp won the game!";
            disableChoice();
        }else{
            msg.innerText="Comp won this round!";
        }
    }
}
const playGame=(choiceId)=>{
    const compChoice=genCompChoice();
    highlightSelection(choiceId,compChoice)
    if(choiceId===compChoice){
        drawGame();
    }else{
        let userWin=true;
        if(choiceId==="rock"){
            userWin=compChoice==="paper"?false:true;
        }else if(choiceId==="paper"){
            userWin=compChoice==="scissor"?false:true;
        }else{
            userWin=compChoice==="rock"?false:true;
        }
        showWinner(userWin);
    }
};

const disableChoice=()=>{
    choices.forEach((choice)=>{
        choice.style.pointerEvents = "none";
    }
);
};

const enableChoices = () => {
    choices.forEach((choice) => {
        choice.style.pointerEvents = "auto";
        choice.classList.remove("selected", "comp-selected");
    });
};

const highlightSelection = (userChoice, compChoice) => {
    choices.forEach((choice) => {
        choice.classList.remove("selected", "comp-selected");
        const id = choice.getAttribute("id");
        if (id === userChoice) {
            choice.classList.add("selected");
        }
        if (id === compChoice) {
            choice.classList.add("comp-selected");
        }
    });
};


choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const choiceId=choice.getAttribute("id");
        playGame(choiceId);
    });
});

rstBtn.addEventListener("click",RestartGame);



