const globalContainer=document.querySelector('.etchContainer');
let newDiv, pixDefault=16; //pixInput must be an user input, with standard value of 16

newGrid(pixDefault);

/*const gridChild=document.querySelectorAll('#pix');
gridChild.forEach((div)=>{
    div.addEventListener('mouseover', bkColor);
});*/

const pixChange=document.querySelector("#size");
//let pixChar, newPix;
pixChange.addEventListener('click', changeSize);

function changeSize(){
    let pixChar=prompt("How many squares per side do you want from 1 to 100?", 16);
    let newPix=parseInt(pixChar, 10);
    if(newPix<1 || newPix>100 || newPix===NaN){
        pixChar=prompt("Invalid choice, try again.");
        changeSize;
    }
    newGrid(newPix);
}

function newGrid(pixIn){
    let columnsTemplate="auto ";
    for(let i=0; i<(pixIn-1); i++){ //Sets the columns number
        columnsTemplate+="auto";
        if(i<(pixIn-2)) columnsTemplate+=" ";
    }
    /*console.log(columnsTemplate.length);
    console.log(columnsTemplate);*/
    globalContainer.style.gridTemplateColumns=columnsTemplate;

    removeGrid(globalContainer);

    let pixNum=pixIn*pixIn;
    for(let i=0; i<pixNum; i++){  //Creates the grid
        newDiv=document.createElement('div');
        newDiv.setAttribute('id', 'pix');
        globalContainer.appendChild(newDiv);
    }

    const gridChild=document.querySelectorAll('#pix');
    gridChild.forEach((div)=>{
        div.addEventListener('mouseover', bkColor);
    });
}

function bkColor(e){
    e.target.style.backgroundColor="black";
}

function removeGrid(grid){
    while(grid.hasChildNodes()){
        grid.removeChild(grid.firstChild);
    }
//    console.log("Deleted.")
}