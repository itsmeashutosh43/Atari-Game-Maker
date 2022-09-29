import { createSpriteAction, eventList, spriteList } from "./util/form-const";
import { GameVariable } from "./game-variable";
//import { clearAllForm, editBehaviorForm, editNPSprite, editPSprite, editUserEvent } from "./form-editor";


// clear()
export function removeAllChildNodes(parent: HTMLElement) {
  if(parent == undefined) return;
  while (parent!.hasChildNodes()) {
      parent.removeChild(parent.firstChild);
    }
}

// clear() + recreate spriteList
export function refreshSpriteList(container: GameVariable){
    removeAllChildNodes(spriteList);
    removeAllChildNodes(eventList);
    container.getpSpriteNames().forEach((item, index)=>{
        let li = document.createElement("li");
        li.innerText = item;
        li.setAttribute('id',index.toString()+"-s");
        li.setAttribute('class','sprite-item')
        spriteList.appendChild(li);
        //close button
        let closebtn = document.createElement("span");
        closebtn.innerText = '\u2715';
        closebtn.setAttribute('class','closebtn');
        closebtn.addEventListener("click", function(){
            container.removePSprite()
            spriteList.removeChild(li);
            removeAllChildNodes(eventList);
            refreshSpriteList(container);
            //clearAllForm();
            let pOption = document.createElement("option");
            pOption.innerText = "Create Playable Sprite";
            pOption.setAttribute('id',"create-p-sprite");
            pOption.setAttribute("value","pSprite");
            createSpriteAction.appendChild(pOption);
        })
        li.appendChild(closebtn);
        li.addEventListener("click", function() {
            //clearAllForm();
            displayUEvent(container);
            //editPSprite(container);
            // user Event
        })
    })
    container.getSpriteNames().forEach((item, index)=>{
        let li = document.createElement("li");
        li.innerText = item;
        li.setAttribute('id',index.toString()+"-s");
        li.setAttribute('class','sprite-item')
        spriteList.appendChild(li);
        //close button
        let closebtn = document.createElement("span");
        closebtn.innerText = '\u2715';
        closebtn.setAttribute('class','closebtn');
        closebtn.addEventListener("click", function(){
            removeItem(index, container);
        })
        li.appendChild(closebtn);
        li.addEventListener("click", function() {
            //clearAllForm();
            displayEvent(index, container);
            //editNPSprite(index, container);
        })
      })
}

// remove item from sprite list
export function removeItem(itemId: number, container: GameVariable){
    container.removeSprite(itemId);
    spriteList.removeChild(document.getElementById(itemId.toString()+"-s"));
    removeAllChildNodes(eventList);
    refreshSpriteList(container);
    //clearAllForm();
}

// display item in event list
export function displayEvent(index: number, container: GameVariable){
    removeAllChildNodes(eventList);
    if (index < container.getEventNames().length) {
        container.getEventNames()[index].forEach((aitem, aindex) => {
            let ali = document.createElement("li");
            ali.innerText = aitem;
            ali.setAttribute('id',index.toString()+"-"+aindex.toString()+"-a");   
            ali.setAttribute('class','sprite-item')
            eventList.appendChild(ali);
            let closebtn = document.createElement("span");
            closebtn.innerText = '\u2715';
            closebtn.setAttribute('class','closebtn-A');
            closebtn.addEventListener("click", function(){
                removeAction(index, aindex, container);
            })
            ali.appendChild(closebtn);
            ali.addEventListener("click", function(){
                //generate the form to edit behavior
                //editBehaviorForm(index,aindex,container);
            })
        })
    }
}

//remove item in event list
export function removeAction(itemId: number, eventId: number, container: GameVariable){
    container.removeEvent(itemId,eventId);

    eventList.removeChild(document.getElementById(itemId.toString()+"-"+eventId.toString()+"-a"));
}

//insert<br>
export function insertbr(body : HTMLElement){
    body.appendChild(document.createElement("br"));
}


// display item in event list
export function displayUEvent(container: GameVariable){
    removeAllChildNodes(eventList);

    if (container.getuEventNames() != undefined) {
        container.getuEventNames().forEach((aitem, aindex) => {
            let ali = document.createElement("li");
            ali.innerText = aitem; 
            ali.setAttribute('class','sprite-item')
            eventList.appendChild(ali);
            let closebtn = document.createElement("span");
            closebtn.innerText = '\u2715';
            closebtn.setAttribute('class','closebtn-A');
            closebtn.addEventListener("click", function(){
                container.removeUEvent(aindex);
                eventList.removeChild(ali);
            })
            ali.appendChild(closebtn);
            ali.addEventListener("click", function(){
                //generate the form to edit user event
                //editUserEvent(aindex,container);
            })
        })
    }
}