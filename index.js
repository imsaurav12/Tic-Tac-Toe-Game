const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn'); 

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initilize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI par empty bhi krna prega
    boxes.forEach((box,index) => {
        box.innerText = '';
        boxes[index].style.pointerEvents='all';
        //one more thing missing,initilizing box with css properties again...
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");   
    gameInfo.innerText = `Current Player - ${currentPlayer}`;        
    
}
initGame();

// Check Game Over Or Not Function -- Classssssyyy Function
function checkGameOver(){
    let answer = '';
    winningPosition.forEach((position) => {
        //all 3 boxes should be non-empty and same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) && ( gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            //
            //check if winner is 'X'
            if(gameGrid[position[0]] === 'X'){
                answer = 'X';
            }
            else
                answer='O';
            //Jab winner mil jaye to disable pointer events,click nhi hoga aage 
            boxes.forEach((box) =>{
                box.style.pointerEvents = "None";
            });
            //now we know X/O is winner
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }
    });
    //It means we have a winner
    if(answer !== ''){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
        return;
    }

    //let's check when all cell is filled and we do not got winner-->Game Tied
    let filledCount = 0;
    gameGrid.forEach((box)=>{
        if(box !=='')
            filledCount++;
    });
    if(filledCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add('active');
    }

}


//Swap function
function swapTurn(){
    if(currentPlayer ==='X'){
        currentPlayer = 'O';
    }
    else{
        currentPlayer = 'X';
    }
    //Current Player - UI Update
    gameInfo.innerText = `Current Player -${currentPlayer}`;
}

//Click ko handle krne ka function
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText = currentPlayer; // ->UI pe change krega
        gameGrid[index]=currentPlayer; // Ye hamara gameGrid se check krega game condition
        boxes[index].style.pointerEvents = 'none'; //- Jahan value dal jayega wahan cursor banega
        //swap kro turn ko
        swapTurn();
        //check koi jeet to nhi gya
        checkGameOver();
    }
}

//Click event Listener on all boxes and also  make it Unclickable

boxes.forEach((box,index) => {
    box.addEventListener('click',() => {
        handleClick(index);
    })
});

newGameBtn.addEventListener('click',initGame);

 