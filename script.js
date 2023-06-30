let current=document.querySelector('.current');
let gameBoard=document.querySelector('.game-board');
let btn=document.querySelector('.new-game');
let boxes=document.querySelectorAll('.box');

let gameGrid;
let winningPos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let currentPlayer;


function initGame(){
    currentPlayer="X";
    current.textContent=`Current Player - ${currentPlayer}`;
    gameGrid=["","","","","","","","",""];
    btn.classList.remove('active');
}

initGame();

function checkResult(){
    let result="";
    winningPos.forEach((x)=>{
        if((gameGrid[x[0]]!=="" || gameGrid[x[1]]!=="" || gameGrid[x[2]]!=="") && (gameGrid[x[0]]===gameGrid[x[1]]) && (gameGrid[x[1]]===gameGrid[x[2]])){

            if(gameGrid[x[0]]==='X')
            {
                result="X";
            }
            else{
                result="O";
            }

            boxes[x[0]].classList.add('win');
            boxes[x[1]].classList.add('win');
            boxes[x[2]].classList.add('win');

            // If a person wins then disable pointer events

            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            });
        }
    });

    if(result!=="")
    {
        current.innerText=`Winner - ${currentPlayer}`;
        btn.classList.add('active');
        return 1;
    }

    let fillCount=0;
    gameGrid.forEach((x)=>{
        if(x!=""){
            fillCount++;
        }
    });

    if(fillCount==9)
    {
        current.innerText=`Match Tied!`;
        btn.classList.add('active');
        return 0;
    }

    return -1;
    

}


function swapTurn(){
    if(currentPlayer=='X')
    {
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    } 
    current.textContent=`Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index]==="")
    {
        gameGrid[index]=currentPlayer;
        if(currentPlayer=="X")
        {
            boxes[index].style.color="#E81E43";
        }
        else{
            boxes[index].style.color="#4F72D4";
        }
        boxes[index].innerHTML=currentPlayer;
        
        let ans=checkResult();
        if(ans==-1)
        {
            swapTurn();
        }
        // swapTurn();
    }
}

// console.log(boxes);

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        // console.log('Box-',(index+1));
        // btn.classList.add('active');
        handleClick(index);
    });
});

btn.addEventListener('click',function(){
    boxes.forEach((box)=>{
        box.innerHTML="";
        box.classList.remove('win');
        box.style.pointerEvents="auto";
    });
    initGame();
});


