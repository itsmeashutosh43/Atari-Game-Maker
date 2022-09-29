import { Controller } from "../controller/controller";

export function initAssets(images:string [], selectionWindow: HTMLElement, control:Controller){
    images.forEach( (element) =>{
        let curImage = document.createElement('div');
        curImage.setAttribute("id","displayedImg");
        curImage.style.background = `url(./src/sprites/${element}.png)`
        curImage.style.backgroundRepeat = "no-repeat"
        curImage.style.backgroundSize = "contain"
        curImage.style.backgroundPosition = 'center'

        curImage.addEventListener("click",function (){
            control.handleSpriteSelection(`./src/sprites/${element}.png`)
            //curImage.setAttribute("id","bottomDisplayedImg")
            
        })
        selectionWindow.appendChild(curImage)
    })
}


export function drawSpriteList(images:string [], selectedWindow:HTMLElement){
    
    images.forEach( (element) =>{
        let curImage = document.createElement('div');
        curImage.setAttribute("id","bottomDisplayedImg");
        curImage.style.background = `url(${element})`
        curImage.style.backgroundRepeat = "no-repeat"
        curImage.style.backgroundSize = "contain"
        curImage.style.backgroundPosition = 'center'

        curImage.addEventListener("click",function (){
          
            console.log("clicked")
            
        })
        selectedWindow.appendChild(curImage)
    })
}

export function clearSelectedSpriteList(parent:HTMLElement) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
