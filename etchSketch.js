const pixDefault=16;
const globalContainer=document.querySelector(".etchContainer");
const pixChange=document.querySelector("#size");
pixChange.addEventListener('click', changeSize);
const clear=document.querySelector("#clear");
clear.addEventListener('click', clearGrid);

let color=0; //0 for standard color, 1 for rainbow, 2 for darkening effect, 3 for eraser
const rainbow=document.querySelector("#rainbow");
rainbow.addEventListener('click', ()=>{
    if(color===1) color=0;
    else color=1
});
const darkening=document.querySelector("#rgdarken");
darkening.addEventListener('click', ()=>{
    if(color===2) color=0;
    else{
        color=2;
        const pixDarken=document.querySelectorAll("#pix");
        pixDarken.forEach((div)=>{
            div.dataset.dark=0;
        });
    }
});
const eraser=document.querySelector("#eraser");
eraser.addEventListener('click', ()=>{
    if(color===3) color=0;
    else color=3;
});

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

//Random value function
function coloRandom(){
    return Math.round(Math.random() * 201); //Avoids lighter colors 
}

//Assemble rgb random function
function RandGB(){
    return coloRandom()+", "+coloRandom()+", "+coloRandom();
}

function bkColor(e){
    switch(color){
        case 0:
            e.target.style.backgroundColor="black";
            break;
        case 1:
            e.target.style.backgroundColor="rgb("+RandGB()+")";
            break;
        case 2:
            darken(e);        
            break;
        case 3:
            e.target.style.backgroundColor="white";
            break;
    }
}

function darken(e){ //pixel darkening function
    if(e.target.dataset.dark==0){
        e.target.style.backgroundColor="rgb("+RandGB()+")";
        e.target.dataset.dark++;
    }
    else if(e.target.dataset.dark==9){
        e.target.style.backgroundColor="black";
        e.target.dataset.dark++;
    }
    else if(e.target.dataset.dark==10) return;
    else{
        let oldColor=e.target.style.backgroundColor;
        let oldString=oldColor.slice(4, (oldColor.length)-1);
        let oldArray=oldString.split(", "); //returns the values of the rgb
        let parsedRGB=[];
        for(let i=0; i<3; i++) parsedRGB[i]=parseInt(oldArray[i], 10);
        let percentRGB=[];
        for(let i=0; i<3; i++) percentRGB[i]=parseInt(parsedRGB[i]*0.10, 10);
        let darkeRGB=[];
        for(let i=0; i<3; i++) darkeRGB[i]=parsedRGB[i]-percentRGB[i];
        let newColor="rgb("+darkeRGB[0]+", "+darkeRGB[1]+", "+darkeRGB[2]+")";
        e.target.dataset.dark++;
        e.target.style.backgroundColor=newColor;
    }
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

function clearGrid(){ //Clears the grid from all pixels without deleting items
    const gridChild=document.querySelectorAll("#pix");
    gridChild.forEach((div)=>{
        div.style.backgroundColor="white";
        if(color===2) div.dataset.dark=0;
    });
}

function removeGrid(grid){ //Deletes the grid
    while(grid.hasChildNodes()){
        grid.removeChild(grid.firstChild);
    }
}