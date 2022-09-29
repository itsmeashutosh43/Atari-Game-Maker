import { Controller } from "../controller/controller";

export function initAssets(images:string [], window: HTMLElement, control:Controller,selectedSpriteList: HTMLElement){
    images.forEach( (element) =>{
        let curImage = document.createElement('div');
        curImage.setAttribute("id","displayedImg");
        curImage.style.background = `url(./src/sprites/${element}.png)`
        curImage.style.backgroundRepeat = "no-repeat"
        curImage.style.backgroundSize = "contain"
        curImage.style.backgroundPosition = 'center'
        

        curImage.addEventListener("click",function (){
            control.handleSpriteSelection(`./src/sprites/${element}.png`)
            curImage.setAttribute("id","bottomDisplayedImg")
            selectedSpriteList.appendChild(curImage)
        })
        
        window.appendChild(curImage)
        
        
        

    })
}