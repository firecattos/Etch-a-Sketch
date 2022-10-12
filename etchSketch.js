const globalContainer=document.querySelector('.etchContainer');
let newDiv, pixInput=16; //pixInput must be an user input, with standard value of 16
let pixNum=pixInput*pixInput;
for(let i=0; i<pixNum; i++){
    newDiv=document.createElement('div');
    //newDiv.textContent=i;
    newDiv.setAttribute('id', 'pix');
    globalContainer.appendChild(newDiv);
}

const gridChild=document.querySelectorAll('#pix');
gridChild.forEach((div)=>{
    div.addEventListener('mouseover', bkColor);
});

function bkColor(e){
    e.target.style.backgroundColor="black";
}