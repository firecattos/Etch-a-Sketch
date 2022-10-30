const pixDefault=16;
const globalContainer=document.querySelector(".etchContainer");
const pixChange=document.querySelector("#size");
pixChange.addEventListener('click', changeSize);
const erase=document.querySelector("#erase");
erase.addEventListener('click', eraseGrid);
let newDiv;

newGrid(pixDefault);

function newGrid(pixIn){
    removeGrid(globalContainer); //Deletes the current grid
    let columnsTemplate="auto ";
    for(let i=0; i<(pixIn-1); i++){ //Sets the columns number
        columnsTemplate+="auto";
        if(i<(pixIn-2)) columnsTemplate+=" ";
    }
    globalContainer.style.gridTemplateColumns=columnsTemplate;
    let pixNum=pixIn*pixIn;
    for(let i=0; i<pixNum; i++){  //Creates the grid
        newDiv=document.createElement('div');
        newDiv.setAttribute('id', 'pix');
        globalContainer.appendChild(newDiv);
    }
    const gridChild=document.querySelectorAll("#pix");
    gridChild.forEach((div)=>{
        div.addEventListener('mouseover', bkColor);
    });
}

function bkColor(e){
    e.target.style.backgroundColor="black";
}

function changeSize(){
    let pixChar=prompt("How many squares per side do you want from 1 to 100?", 16);
    let newPix=parseInt(pixChar, 10);
    if(newPix<1 || newPix>100 || newPix===NaN){
        alert("Invalid choice, using standard value instead.");
        newPix=pixDefault;
    }
    newGrid(newPix);
}

function eraseGrid(){
    const gridCh=document.querySelectorAll("#pix");
    gridCh.forEach((div)=>{
        div.style.backgroundColor="white";
    });
}

function removeGrid(grid){
    while(grid.hasChildNodes()){
        grid.removeChild(grid.firstChild);
    }
}