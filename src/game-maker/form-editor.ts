import { displayEvent, removeAllChildNodes, refreshSpriteList, insertbr, displayUEvent } from "../game-maker/form-list";
import { Block, Circle, Shape } from "../game-runner/drawables/drawable";
import {  dynamicForm, dimensionForm, cCircle, cSquare, typeNSprite, typeMove, typeSet, eventForm, typeMoveLeft, typeMoveRight, typeMoveUp, typeMoveDown, eventSettingForm, collideType, typeCollideReflect, typeCollideRandom, typePSprite, createPSpriteAction, createSpriteAction, typeMoveUpLeft, typeMoveUpRight, typeMoveBottomLeft, typeMoveBottomRight, soundType, soundOnePath, soundTwoPath } from "./util/form-const";
import { GameVariable } from "./game-variable";
import { Behavior, DIRECTION, Move, SetPosition } from "../game-runner/behaviors/behavior";
import { KEYCODE, UserKeydownEvent } from "../game-runner/user-events/user-event";




//Im going to need help cleaning up this nightmare. Atype refers to non playable sprite
/*
Line 142 is where the next button is
Line 213 and 263 is where the createSprite button and addeventlistener is located. they both call addToSprite which is on Line 314


*/
export function createForm(formType: string, container: GameVariable){
    switch(formType){
        case typeNSprite:
            createSpriteForm(dynamicForm, dimensionForm, typeNSprite, container);
            break;
        case typePSprite:
            createSpriteForm(dynamicForm, dimensionForm, typePSprite, container);
            break;
    }
}

export function createSpriteForm(parentForm: HTMLElement, subForm: HTMLElement, formType: string, container: GameVariable){
    removeAllChildNodes(parentForm);
    let namelbl : HTMLLabelElement = document.createElement('label');
    namelbl.innerHTML = "Sprite Name: ";
    parentForm.appendChild(namelbl);

    let nametxt = document.createElement("input");
    nametxt.setAttribute('id',"sprite-name");
    nametxt.type = "text";
    parentForm.appendChild(nametxt);
    insertbr(parentForm);

    let colorlbl : HTMLLabelElement = document.createElement('label');
    colorlbl.innerHTML = "Color: ";
    parentForm.appendChild(colorlbl);

    let colorDropDown = document.createElement("select");
    colorDropDown.setAttribute("id","sprite-color");

    let colorBlue = document.createElement("option");
    colorBlue.innerHTML = "Blue";
    colorBlue.setAttribute("value","#0000FF");
    
    let colorRed = document.createElement("option");
    colorRed.innerHTML = "Red";
    colorRed.setAttribute("value","#FF0000");

    let colorGreen = document.createElement("option");
    colorGreen.innerHTML = "Green";
    colorGreen.setAttribute("value","#00FF00");

    let colorCyan = document.createElement("option");
    colorCyan.innerHTML = "Cyan";
    colorCyan.setAttribute("value","#00FFFF");

    let colorPink = document.createElement("option");
    colorPink.innerHTML = "Pink";
    colorPink.setAttribute("value","#FF00FF");

    let colorYellow = document.createElement("option");
    colorYellow.innerHTML = "Yellow";
    colorYellow.setAttribute("value","#FFFF00");

    colorDropDown.appendChild(colorBlue);
    colorDropDown.appendChild(colorRed);
    colorDropDown.appendChild(colorGreen);
    colorDropDown.appendChild(colorCyan);
    colorDropDown.appendChild(colorPink);
    colorDropDown.appendChild(colorYellow);

    parentForm.appendChild(colorDropDown);
    insertbr(parentForm);

    let collidelbl = document.createElement("label");
    collidelbl.innerText = "Collide Option: "
    parentForm.appendChild(collidelbl);

    let collideOption = document.createElement("select");
    collideOption.setAttribute("id", collideType);

    let reflectCollide = document.createElement("option");
    reflectCollide.innerText = "Reflects";
    reflectCollide.setAttribute("value", typeCollideReflect)
    let randomCollide = document.createElement("option");
    randomCollide.innerText = "Random Move";
    randomCollide.setAttribute("value", typeCollideRandom)
    collideOption.appendChild(reflectCollide);
    collideOption.appendChild(randomCollide);
    parentForm.appendChild(collideOption);
    insertbr(parentForm);


    let soundlbl = document.createElement("label");
    soundlbl.innerText = "Sound Option: "
    parentForm.appendChild(soundlbl);
    let soundOption = document.createElement("select");
    soundOption.setAttribute("id", soundType);
    
    let soundone = document.createElement("option");
    soundone.innerText = "Sound 1";
    soundone.setAttribute("value", soundOnePath)
    let soundtwo = document.createElement("option");
    soundtwo.innerText = "Sound 2";
    soundtwo.setAttribute("value", soundTwoPath)
    soundOption.appendChild(soundone);
    soundOption.appendChild(soundtwo);
    parentForm.appendChild(soundOption);
    insertbr(parentForm);
    
    if(formType == typePSprite){
        collideOption.disabled = true;
        soundOption.disabled = true;
    }



    let shapeDropDown = document.createElement("select");
    shapeDropDown.setAttribute("id","sprite-shape");

    let squareShape = document.createElement("option");
    squareShape.innerText = "Square / Rectangle";
    squareShape.setAttribute("value","create-square");

    let circleShape = document.createElement("option");
    circleShape.innerText = "Circle";
    circleShape.setAttribute("value","create-circle");
    shapeDropDown.appendChild(squareShape);
    shapeDropDown.appendChild(circleShape);

    parentForm.appendChild(shapeDropDown);
    insertbr(parentForm);

    nametxt.addEventListener('input', function(){
        if(nametxt.value != ""){
            nextbtn.disabled = false;
        }
    })

    let nextbtn = document.createElement("button");
    nextbtn.innerText = "Next";
    nextbtn.setAttribute('id',"next-btn");
    nextbtn.disabled = true;
    nextbtn.addEventListener("click", function(){
        nametxt.disabled = true;
        colorDropDown.disabled = true;
        collideOption.disabled = true;
        if(shapeDropDown.value == 'create-circle'){
            createCircleSubForm(subForm, formType, nametxt.value, colorDropDown.value,collideOption.value,soundOption.value, container);
        }else{
            createSquareSubForm(subForm, formType, nametxt.value, colorDropDown.value,collideOption.value,soundOption.value, container);
        }
        shapeDropDown.disabled = true;
        prevbtn.disabled = false;
    })
    parentForm.appendChild(nextbtn);
    let prevbtn = document.createElement("button");
    prevbtn.innerText = "Back";
    prevbtn.setAttribute('id',"prev-btn");
    
    prevbtn.disabled = true;
    prevbtn.addEventListener("click", function(){
        nametxt.disabled = false;
        colorDropDown.disabled = false;
        shapeDropDown.disabled = false;
        removeAllChildNodes(subForm);
        
        prevbtn.disabled = true;
    })
    parentForm.appendChild(prevbtn);
}



export function createCircleSubForm(parentForm : HTMLElement, formType: string, name: string, color: string, cType: string, sound: string, container: GameVariable){
    removeAllChildNodes(parentForm);
    let radiuslbl = document.createElement("label");
    radiuslbl.innerText = "Enter Radius: ";
    parentForm.appendChild(radiuslbl);
    let radiustxt = document.createElement("input");
    radiustxt.type = "number";
    radiustxt.value = "1";
    parentForm.appendChild(radiustxt);    
    insertbr(parentForm);
    let coordlblx = document.createElement("label");
    coordlblx.innerText = "Enter Pos-X: ";
    let coordlbly = document.createElement("label");
    coordlbly.innerText = "Enter Pos-Y: ";
    let posX = document.createElement("input");
    let posY = document.createElement("input");
    posX.type = "number";
    posY.type = "number";
    posX.value = "0";
    posY.value = "0";
    parentForm.appendChild(coordlblx);
    parentForm.appendChild(posX);
    insertbr(parentForm);
    parentForm.appendChild(coordlbly);
    parentForm.appendChild(posY);
    insertbr(parentForm);


    let addbtn = document.createElement("button");
    addbtn.innerText = "Create Sprite";
    addbtn.addEventListener('click', function(){
        
        addToSprite(formType,cCircle,name,color,[Number(radiustxt.value)],Number(posX.value), Number(posY.value), cType, sound, container);
        refreshSpriteList(container);
    })
    parentForm.appendChild(addbtn);

}
  
export function createSquareSubForm(parentForm : HTMLElement, formType: string, name: string, color: string, cType: string, sound: string, container: GameVariable){
    removeAllChildNodes(parentForm);
    let lengthlbl = (document.createElement("label") as HTMLElement);
    lengthlbl.innerText = "Enter length: ";
    parentForm.appendChild(lengthlbl);
    let lengthtxt = (document.createElement("input"));
    lengthtxt.type = "number";
    lengthtxt.value = "1";
    lengthtxt.name = "length";
    parentForm.appendChild(lengthtxt);
    insertbr(parentForm);
  
    let heightlbl = (document.createElement("label") as HTMLElement);
    heightlbl.innerText = "Enter height: ";
    parentForm.appendChild(heightlbl);
    let heighttxt = (document.createElement("input"));
    heighttxt.type = "number";
    heighttxt.value = "1";
    heighttxt.name = "height";
    parentForm.appendChild(heighttxt);
    insertbr(parentForm);

    let coordlblx = document.createElement("label");
    coordlblx.innerText = "Enter Pos-X: ";
    let coordlbly = document.createElement("label");
    coordlbly.innerText = "Enter Pos-Y: ";
    let posX = document.createElement("input");
    let posY = document.createElement("input");
    posX.type = "number";
    posY.type = "number";
    posX.value = "0";
    posY.value = "0";
    parentForm.appendChild(coordlblx);
    parentForm.appendChild(posX);
    insertbr(parentForm);
    parentForm.appendChild(coordlbly);
    parentForm.appendChild(posY);
    insertbr(parentForm);


    let addbtn = document.createElement("button");
    addbtn.innerText = "Create Sprite";
    addbtn.addEventListener('click', function(){
        addToSprite(formType,cSquare,name,color,[Number(lengthtxt.value), Number(heighttxt.value)],Number(posX.value), Number(posY.value),cType, sound, container);
        refreshSpriteList(container);
    })
    parentForm.appendChild(addbtn);


}


export function editNPSprite(index: number, container: GameVariable){
    let spriteName: string = container.getSpriteNames()[index];
    let cType: string = spriteName.substring(spriteName.length - 2);
    spriteName = spriteName.substring(0,spriteName.length-5);
    let sprite: Shape = container.getNPSprites()[index];
    let spposX: number = sprite.getPosX();
    let spposY: number = sprite.getPosY();
    let color: string = sprite.getColor();
    let soundPath: string = container.getSoundList()[index];
    let spriteType: string = sprite.getType();

    createEditSpriteForm(dynamicForm, dimensionForm, 'nSprite', container);

    let nameInput = document.getElementById("sprite-name") as HTMLInputElement;
    nameInput.value = spriteName;
    nameInput.disabled = false;
    let colorInput = document.getElementById("sprite-color") as HTMLInputElement;
    colorInput.value = color;
    colorInput.disabled = false;
    let shapeInput = document.getElementById("sprite-shape") as HTMLInputElement;
    shapeInput.value = spriteType;
    shapeInput.disabled = false;
    let collideInput = document.getElementById(collideType) as HTMLInputElement;
    collideInput.value = cType;
    collideInput.disabled = false;
    let soundInput = document.getElementById(soundType) as HTMLInputElement;
    soundInput.value = soundPath;
    soundInput.disabled = false;

    createEditDimentionForm(spriteType, sprite, index, spposX, spposY, nameInput, colorInput, collideInput, soundInput, container)

    shapeInput.addEventListener('change', function(){
        createChangeDimentionForm(shapeInput.value, index, spposX, spposY, nameInput, colorInput, collideInput, soundInput, container);
    })


    


}

export function addToSprite(type: string, spType: string,sName: string , color: string, size: Array<number>, posX: number, posY: number, cType: string, sound: string, container: GameVariable){

    if(type == typeNSprite){
        if(spType == cCircle){
            let newCircle = new Circle(posX, posY, size[0], color);
            container.addNPSprite(sName, newCircle, cType, sound);
            container.addEventList();
        }else if(spType == cSquare){
            let newBlock = new Block(posX, posY, size[0], size[1], color);
            container.addNPSprite(sName, newBlock, cType, sound);
            container.addEventList();
        }
    }else if(type == typePSprite){
        if(spType == cCircle){
            let newCircle = new Circle(posX, posY, size[0], color);
            container.createPSprite(sName, newCircle);
        }else if(spType == cSquare){
            let newBlock = new Block(posX, posY, size[0], size[1], color);
            container.createPSprite(sName, newBlock);
        }
    }

}

export function clearAllForm(){
    removeAllChildNodes(dynamicForm);
    removeAllChildNodes(dimensionForm);
    removeAllChildNodes(eventForm);
    removeAllChildNodes(eventSettingForm);
}


export function createEditSpriteForm(parentForm: HTMLElement, subForm: HTMLElement, formType: string, container: GameVariable){
    removeAllChildNodes(parentForm);
    let namelbl : HTMLLabelElement = document.createElement('label');
    namelbl.innerHTML = "Sprite Name: ";
    parentForm.appendChild(namelbl);

    let nametxt = document.createElement("input");
    nametxt.setAttribute('id',"sprite-name");
    nametxt.type = "text";
    parentForm.appendChild(nametxt);
    insertbr(parentForm);

    let colorlbl : HTMLLabelElement = document.createElement('label');
    colorlbl.innerHTML = "Color: ";
    parentForm.appendChild(colorlbl);

    let colorDropDown = document.createElement("select");
    colorDropDown.setAttribute("id","sprite-color");

    let colorBlue = document.createElement("option");
    colorBlue.innerHTML = "Blue";
    colorBlue.setAttribute("value","#0000FF");
    
    let colorRed = document.createElement("option");
    colorRed.innerHTML = "Red";
    colorRed.setAttribute("value","#FF0000");

    let colorGreen = document.createElement("option");
    colorGreen.innerHTML = "Green";
    colorGreen.setAttribute("value","#00FF00");

    let colorCyan = document.createElement("option");
    colorCyan.innerHTML = "Cyan";
    colorCyan.setAttribute("value","#00FFFF");

    let colorPink = document.createElement("option");
    colorPink.innerHTML = "Pink";
    colorPink.setAttribute("value","#FF00FF");

    let colorYellow = document.createElement("option");
    colorYellow.innerHTML = "Yellow";
    colorYellow.setAttribute("value","#FFFF00");

    colorDropDown.appendChild(colorBlue);
    colorDropDown.appendChild(colorRed);
    colorDropDown.appendChild(colorGreen);
    colorDropDown.appendChild(colorCyan);
    colorDropDown.appendChild(colorPink);
    colorDropDown.appendChild(colorYellow);

    parentForm.appendChild(colorDropDown);
    insertbr(parentForm);

    let collidelbl = document.createElement("label");
    collidelbl.innerText = "Collide Option: "
    parentForm.appendChild(collidelbl);

    let collideOption = document.createElement("select");
    collideOption.setAttribute("id", collideType);

    let reflectCollide = document.createElement("option");
    reflectCollide.innerText = "Reflects";
    reflectCollide.setAttribute("value", typeCollideReflect)
    let randomCollide = document.createElement("option");
    randomCollide.innerText = "Random Move";
    randomCollide.setAttribute("value", typeCollideRandom)
    collideOption.appendChild(reflectCollide);
    collideOption.appendChild(randomCollide);
    parentForm.appendChild(collideOption);
    
    insertbr(parentForm);

    let soundlbl = document.createElement("label");
    soundlbl.innerText = "Sound Option: "
    parentForm.appendChild(soundlbl);
    let soundOption = document.createElement("select");
    soundOption.setAttribute("id", soundType);
    
    let soundone = document.createElement("option");
    soundone.innerText = "Sound 1";
    soundone.setAttribute("value", soundOnePath)
    let soundtwo = document.createElement("option");
    soundtwo.innerText = "Sound 2";
    soundtwo.setAttribute("value", soundTwoPath)
    soundOption.appendChild(soundone);
    soundOption.appendChild(soundtwo);
    parentForm.appendChild(soundOption);
    insertbr(parentForm);

    if(formType == typePSprite){
        collideOption.disabled = true;
        soundOption.disabled = true;
    }

    let shapeDropDown = document.createElement("select");
    shapeDropDown.setAttribute("id","sprite-shape");

    let squareShape = document.createElement("option");
    squareShape.innerText = "Square / Rectangle";
    squareShape.setAttribute("value","create-square");

    let circleShape = document.createElement("option");
    circleShape.innerText = "Circle";
    circleShape.setAttribute("value","create-circle");
    shapeDropDown.appendChild(squareShape);
    shapeDropDown.appendChild(circleShape);

    parentForm.appendChild(shapeDropDown);
    insertbr(parentForm);
}


export function createEditDimentionForm(
    spriteType: string, sprite: Shape, index: number, spposX: number, spposY: number, 
    nameInput: HTMLInputElement, colorInput: HTMLInputElement, collideInput: HTMLInputElement, soundInput: HTMLInputElement, container: GameVariable
    ){
    
    if(spriteType == cCircle){
        removeAllChildNodes(dimensionForm);
        let radiuslbl = document.createElement("label");
        radiuslbl.innerText = "Enter Radius: ";
        dimensionForm.appendChild(radiuslbl);
        let radiustxt = document.createElement("input");
        radiustxt.type = "number";
        radiustxt.value = sprite.getSize()[0].toString();
        dimensionForm.appendChild(radiustxt);    
        insertbr(dimensionForm);
        let coordlblx = document.createElement("label");
        coordlblx.innerText = "Enter Pos-X: ";
        let coordlbly = document.createElement("label");
        coordlbly.innerText = "Enter Pos-Y: ";
        let posX = document.createElement("input");
        let posY = document.createElement("input");
        posX.type = "number";
        posY.type = "number";
        posX.value = spposX.toString();
        posY.value = spposY.toString();
        dimensionForm.appendChild(coordlblx);
        dimensionForm.appendChild(posX);
        insertbr(dimensionForm);
        dimensionForm.appendChild(coordlbly);
        dimensionForm.appendChild(posY);
        insertbr(dimensionForm);


        let addbtn = document.createElement("button");
        addbtn.innerText = "Save";
        addbtn.addEventListener('click', function(){
            // Save to Sprite
            container.saveNPSprite(index, nameInput.value, new Circle(Number(posX.value), Number(posY.value), Number(radiustxt.value), colorInput.value), collideInput.value, soundInput.value);
            refreshSpriteList(container);
        })
        dimensionForm.appendChild(addbtn);

        let addEbtn = document.createElement("button");
        addEbtn.innerText = "Add Behavior"
        addEbtn.addEventListener('click', function(){
            // Create Event Form (Function Call)
            createEventForm(eventForm,eventSettingForm,index,container);
        })

        dimensionForm.appendChild(addEbtn);

    }else if(spriteType == cSquare){
        removeAllChildNodes(dimensionForm);
        let lengthlbl = (document.createElement("label") as HTMLElement);
        lengthlbl.innerText = "Enter length: ";
        dimensionForm.appendChild(lengthlbl);
        let lengthtxt = (document.createElement("input"));
        lengthtxt.type = "number";
        lengthtxt.value = sprite.getSize()[1].toString();
        lengthtxt.name = "length";
        dimensionForm.appendChild(lengthtxt);
        insertbr(dimensionForm);
      
        let heightlbl = (document.createElement("label") as HTMLElement);
        heightlbl.innerText = "Enter height: ";
        dimensionForm.appendChild(heightlbl);
        let heighttxt = (document.createElement("input"));
        heighttxt.type = "number";
        heighttxt.value = sprite.getSize()[0].toString();
        heighttxt.name = "height";
        dimensionForm.appendChild(heighttxt);
        insertbr(dimensionForm);
    
        let coordlblx = document.createElement("label");
        coordlblx.innerText = "Enter Pos-X: ";
        let coordlbly = document.createElement("label");
        coordlbly.innerText = "Enter Pos-Y: ";
        let posX = document.createElement("input");
        let posY = document.createElement("input");
        posX.type = "number";
        posY.type = "number";
        posX.value = spposX.toString();
        posY.value = spposY.toString();
        dimensionForm.appendChild(coordlblx);
        dimensionForm.appendChild(posX);
        insertbr(dimensionForm);
        dimensionForm.appendChild(coordlbly);
        dimensionForm.appendChild(posY);
        insertbr(dimensionForm);
    
    
        let addbtn = document.createElement("button");
        addbtn.innerText = "Save";
        addbtn.addEventListener('click', function(){
            // Save Sprite to Container
            container.saveNPSprite(index, nameInput.value, new Block(Number(posX.value), Number(posY.value), Number(lengthtxt.value),Number(heighttxt.value), colorInput.value), collideInput.value, soundInput.value);
            refreshSpriteList(container);
        })
        dimensionForm.appendChild(addbtn);

        
        let addEbtn = document.createElement("button");
        addEbtn.innerText = "Add Behavior"
        addEbtn.addEventListener('click', function(){
            // Create Event Form (Function Call)
            createEventForm(eventForm,eventSettingForm,index,container);
        })

        dimensionForm.appendChild(addEbtn);

    }
}




export function createChangeDimentionForm(
    spriteType: string, index: number, spposX: number, spposY: number, 
    nameInput: HTMLInputElement, colorInput: HTMLInputElement, collideInput: HTMLInputElement, soundInput: HTMLInputElement, container: GameVariable
    ){
    
    if(spriteType == cCircle){
        removeAllChildNodes(dimensionForm);
        let radiuslbl = document.createElement("label");
        radiuslbl.innerText = "Enter Radius: ";
        dimensionForm.appendChild(radiuslbl);
        let radiustxt = document.createElement("input");
        radiustxt.type = "number";
        radiustxt.value = "1";
        dimensionForm.appendChild(radiustxt);    
        insertbr(dimensionForm);
        let coordlblx = document.createElement("label");
        coordlblx.innerText = "Enter Pos-X: ";
        let coordlbly = document.createElement("label");
        coordlbly.innerText = "Enter Pos-Y: ";
        let posX = document.createElement("input");
        let posY = document.createElement("input");
        posX.type = "number";
        posY.type = "number";
        posX.value = spposX.toString();
        posY.value = spposY.toString();
        dimensionForm.appendChild(coordlblx);
        dimensionForm.appendChild(posX);
        insertbr(dimensionForm);
        dimensionForm.appendChild(coordlbly);
        dimensionForm.appendChild(posY);
        insertbr(dimensionForm);


        let addbtn = document.createElement("button");
        addbtn.innerText = "Save";
        addbtn.addEventListener('click', function(){
            // Save to Sprite
            container.saveNPSprite(index, nameInput.value, new Circle(Number(posX.value), Number(posY.value), Number(radiustxt.value), colorInput.value), collideInput.value, soundInput.value);
            refreshSpriteList(container);
        })
        dimensionForm.appendChild(addbtn);

        let addEbtn = document.createElement("button");
        addEbtn.innerText = "Add Behavior"
        addEbtn.addEventListener('click', function(){
            // Create Event Form (Function Call)
            createEventForm(eventForm,eventSettingForm,index,container);
        })

        dimensionForm.appendChild(addEbtn);

    }else if(spriteType == cSquare){
        removeAllChildNodes(dimensionForm);
        let lengthlbl = (document.createElement("label") as HTMLElement);
        lengthlbl.innerText = "Enter length: ";
        dimensionForm.appendChild(lengthlbl);
        let lengthtxt = (document.createElement("input"));
        lengthtxt.type = "number";
        lengthtxt.value = "1";
        lengthtxt.name = "length";
        dimensionForm.appendChild(lengthtxt);
        insertbr(dimensionForm);
      
        let heightlbl = (document.createElement("label") as HTMLElement);
        heightlbl.innerText = "Enter height: ";
        dimensionForm.appendChild(heightlbl);
        let heighttxt = (document.createElement("input"));
        heighttxt.type = "number";
        heighttxt.value = "1";
        heighttxt.name = "height";
        dimensionForm.appendChild(heighttxt);
        insertbr(dimensionForm);
    
        let coordlblx = document.createElement("label");
        coordlblx.innerText = "Enter Pos-X: ";
        let coordlbly = document.createElement("label");
        coordlbly.innerText = "Enter Pos-Y: ";
        let posX = document.createElement("input");
        let posY = document.createElement("input");
        posX.type = "number";
        posY.type = "number";
        posX.value = spposX.toString();
        posY.value = spposY.toString();
        dimensionForm.appendChild(coordlblx);
        dimensionForm.appendChild(posX);
        insertbr(dimensionForm);
        dimensionForm.appendChild(coordlbly);
        dimensionForm.appendChild(posY);
        insertbr(dimensionForm);
    
    
        let addbtn = document.createElement("button");
        addbtn.innerText = "Save";
        addbtn.addEventListener('click', function(){
            // Save Sprite to Container
            container.saveNPSprite(index, nameInput.value, new Block(Number(posX.value), Number(posY.value), Number(lengthtxt.value),Number(heighttxt.value), colorInput.value), collideInput.value, soundInput.value);
            refreshSpriteList(container);
        })
        dimensionForm.appendChild(addbtn);

        
        let addEbtn = document.createElement("button");
        addEbtn.innerText = "Add Behavior"
        addEbtn.addEventListener('click', function(){
            // Create Event Form (Function Call)
            createEventForm(eventForm,eventSettingForm,index,container);
        })

        dimensionForm.appendChild(addEbtn);

    }
}


export function createEventForm(parentForm: HTMLElement, subForm: HTMLElement, index: number, container: GameVariable){
    removeAllChildNodes(parentForm);

    let spriteName = container.getSpriteNames()[index];
    let spriteNamelbl = document.createElement("h4");
    spriteNamelbl.innerText = "Editing Behavior For - " + spriteName;
    parentForm.appendChild(spriteNamelbl);
    insertbr(parentForm);

    let eventlbl = document.createElement("label");
    eventlbl.innerText = "Event Type: ";
    parentForm.appendChild(eventlbl);
    let eventDropDown = document.createElement("select");
    eventDropDown.setAttribute('id',"event-type");
    let eventMove = document.createElement("option");
    eventMove.innerText = "Move";
    eventMove.setAttribute("value",typeMove);
    
    let eventSet = document.createElement("option");
    eventSet.innerText = "Set Position";
    eventSet.setAttribute("value",typeSet);

    eventDropDown.appendChild(eventMove);
    eventDropDown.appendChild(eventSet);

    parentForm.appendChild(eventDropDown);
    insertbr(parentForm);
    insertbr(parentForm);

    createEventSettingForm(index,eventDropDown.value, subForm, container);

    eventDropDown.addEventListener("change", function(){
        createEventSettingForm(index,eventDropDown.value, subForm, container);
    })

}

export function createEventSettingForm(index:number, formType: string, parentForm: HTMLElement, container:GameVariable){
    removeAllChildNodes(parentForm);
    if(formType == typeMove){
        let movelbl = document.createElement("label");
        movelbl.innerText = "Move Type: ";
        parentForm.appendChild(movelbl);
        let moveDropDown = document.createElement("select");
        moveDropDown.setAttribute('id',"move-type");
        let moveLeft = document.createElement("option");
        moveLeft.innerText = "Move Left";
        moveLeft.setAttribute("value",typeMoveLeft);
        let moveRight = document.createElement("option");
        moveRight.innerText = "Move Right";
        moveRight.setAttribute("value",typeMoveRight);
        let moveUp = document.createElement("option");
        moveUp.innerText = "Move Up";
        moveUp.setAttribute("value",typeMoveUp);
        let moveDown = document.createElement("option");
        moveDown.innerText = "Move Down";
        moveDown.setAttribute("value",typeMoveDown);
        let moveUpLeft = document.createElement("option");
        moveUpLeft.innerText = "Move Up Left";
        moveUpLeft.setAttribute("value",typeMoveUpLeft);
        let moveUpRight = document.createElement("option");
        moveUpRight.innerText = "Move Up Right";
        moveUpRight.setAttribute("value",typeMoveUpRight);
        let moveBottomLeft = document.createElement("option");
        moveBottomLeft.innerText = "Move Bottom Left";
        moveBottomLeft.setAttribute("value",typeMoveBottomLeft);
        let moveBottomRight = document.createElement("option");
        moveBottomRight.innerText = "Move Bottom Right";
        moveBottomRight.setAttribute("value",typeMoveBottomRight);
        
        moveDropDown.appendChild(moveLeft);
        moveDropDown.appendChild(moveRight);
        moveDropDown.appendChild(moveUp);
        moveDropDown.appendChild(moveDown);
        moveDropDown.appendChild(moveUpLeft);
        moveDropDown.appendChild(moveUpRight);
        moveDropDown.appendChild(moveBottomLeft);
        moveDropDown.appendChild(moveBottomRight);

        parentForm.appendChild(moveDropDown);
        insertbr(parentForm);

        let moveUnitlbl = document.createElement("label");
        moveUnitlbl.innerText = "Move Unit: ";
        let moveSpeedlbl = document.createElement("label");
        moveSpeedlbl.innerText = "Move Speed: ";
        let moveUnit = document.createElement("input");
        let moveSpeed = document.createElement("input");
        moveUnit.type = "number";
        moveSpeed.type = "number";
        moveUnit.value = "1";
        moveSpeed.value = "1";
        parentForm.appendChild(moveUnitlbl);
        parentForm.appendChild(moveUnit);
        insertbr(parentForm);
        parentForm.appendChild(moveSpeedlbl);
        parentForm.appendChild(moveSpeed);
        insertbr(parentForm);

        let addbtn = document.createElement("button");
        addbtn.innerText = "Add Behavior";
        addbtn.addEventListener("click", function(){
            //add move event
            addMoveEvent(index,container,Number(moveUnit.value),Number(moveSpeed.value),moveDropDown.value);
        })
        parentForm.appendChild(addbtn);

    }else if(formType == typeSet){
        let coordlblx = document.createElement("label");
        coordlblx.innerText = "Set Pos-X: ";
        let coordlbly = document.createElement("label");
        coordlbly.innerText = "Set Pos-Y: ";
        let posX = document.createElement("input");
        let posY = document.createElement("input");
        posX.type = "number";
        posY.type = "number";
        posX.value = "0";
        posY.value = "0";
        parentForm.appendChild(coordlblx);
        parentForm.appendChild(posX);
        insertbr(parentForm);
        parentForm.appendChild(coordlbly);
        parentForm.appendChild(posY);
        insertbr(parentForm);

        let addbtn = document.createElement("button");
        addbtn.innerText = "Add Behavior";
        addbtn.addEventListener("click", function(){
            //add set pos event
            addSetEvent(index,container,Number(posX.value),Number(posY.value));
        })
        parentForm.appendChild(addbtn);


    }
}

export function addMoveEvent(index: number, container: GameVariable, moveUnit: number, moveSpeed: number, moveDirection: string){
    let dir: DIRECTION;
    switch (moveDirection){
        case typeMoveLeft:
            dir = DIRECTION.LEFT;
            break;
        case typeMoveRight:
            dir = DIRECTION.RIGHT;
            break;
        case typeMoveUp:
            dir = DIRECTION.UP;
            break;
        case typeMoveDown:
            dir = DIRECTION.DOWN;
            break;
        case typeMoveUpLeft:
            dir = DIRECTION.TOPLEFT;
            break;
        case typeMoveUpRight:
            dir = DIRECTION.TOPRIGHT;
            break;
        case typeMoveBottomLeft:
            dir = DIRECTION.BOTTOMLEFT;
            break;
        case typeMoveBottomRight:
            dir = DIRECTION.BOTTOMRIGHT;
            break;
    }
    let newMove = new Move(moveUnit, dir, moveSpeed);
    container.addBehavior(index,moveDirection,newMove);
    displayEvent(index, container);
    
}

export function addSetEvent(index: number, container: GameVariable, posX: number, posY: number){
    let newSet = new SetPosition({x: posX, y: posY});
    container.addBehavior(index,"set-position-(" + posX.toString()+","+posY.toString()+")",newSet);
    displayEvent(index, container);
    
}


export function createUserEventForm(parentForm: HTMLElement, container: GameVariable){
    removeAllChildNodes(parentForm);
    let spriteNamelbl = document.createElement("h4");
    spriteNamelbl.innerText = "Editing user events";
    parentForm.appendChild(spriteNamelbl);
    insertbr(parentForm);

    let controllbl = document.createElement("label");
    controllbl.innerText = "Select Control direction: ";
    parentForm.appendChild(controllbl);
    let dropDown = document.createElement("select");
    dropDown.setAttribute('id',"user-event-type");
    let moveLeft = document.createElement("option");
    moveLeft.innerText = "Move Left";
    moveLeft.setAttribute("value",typeMoveLeft);
    let moveRight = document.createElement("option");
    moveRight.innerText = "Move Right";
    moveRight.setAttribute("value",typeMoveRight);
    let moveUp = document.createElement("option");
    moveUp.innerText = "Move Up";
    moveUp.setAttribute("value",typeMoveUp);
    let moveDown = document.createElement("option");
    moveDown.innerText = "Move Down";
    moveDown.setAttribute("value",typeMoveDown);

    dropDown.appendChild(moveLeft);
    dropDown.appendChild(moveRight);
    dropDown.appendChild(moveUp);
    dropDown.appendChild(moveDown);
    parentForm.appendChild(dropDown);
    insertbr(parentForm);
    let moveSpeedlbl = document.createElement("label");
    moveSpeedlbl.innerText = "Move Speed: ";
    let moveSpeedtxt = document.createElement("input");
    moveSpeedtxt.type = "number";
    moveSpeedtxt.value = "1";
    parentForm.appendChild(moveSpeedlbl);
    parentForm.appendChild(moveSpeedtxt);
    insertbr(parentForm);
    let addbtn = document.createElement("button");
    addbtn.innerText = "Add User event";
    addbtn.addEventListener("click", function(){
        let dir: DIRECTION;
        let strategy: UserKeydownEvent;
        let name: string;
        switch (dropDown.value){
            case typeMoveLeft:
                dir = DIRECTION.LEFT;
                name = "left-key";
                strategy = new UserKeydownEvent(new Move(9999,dir,Number(moveSpeedtxt.value)),KEYCODE.ARROWLEFT);
                break;
            case typeMoveRight:
                dir = DIRECTION.RIGHT;
                name = "right-key";
                strategy = new UserKeydownEvent(new Move(9999,dir,Number(moveSpeedtxt.value)),KEYCODE.ARROWRIGHT);
                break;
            case typeMoveUp:
                dir = DIRECTION.UP;
                name = "up-key";
                strategy = new UserKeydownEvent(new Move(9999,dir,Number(moveSpeedtxt.value)),KEYCODE.ARROWUP);
                break;
            case typeMoveDown:
                dir = DIRECTION.DOWN;
                name = "down-key";
                strategy = new UserKeydownEvent(new Move(9999,dir,Number(moveSpeedtxt.value)),KEYCODE.ARROWDOWN);
                break;
        }
        container.addUserEvent(name,strategy);
        displayUEvent(container);
    })
    parentForm.appendChild(addbtn);
}

export function editPSprite(container: GameVariable){
    let spriteName: string = container.getpSpriteNames()[0];
    spriteName = spriteName.substring(0,spriteName.length-2);
    let sprite: Shape = container.getPSprite();
    let spposX: number = sprite.getPosX();
    let spposY: number = sprite.getPosY();
    let color: string = sprite.getColor();
    let spriteType: string = sprite.getType();

    createEditSpriteForm(dynamicForm, dimensionForm, 'nSprite', container);

    let nameInput = document.getElementById("sprite-name") as HTMLInputElement;
    nameInput.value = spriteName;
    nameInput.disabled = false;
    let colorInput = document.getElementById("sprite-color") as HTMLInputElement;
    colorInput.value = color;
    colorInput.disabled = false;
    let shapeInput = document.getElementById("sprite-shape") as HTMLInputElement;
    shapeInput.value = spriteType;
    shapeInput.disabled = false;

    createEditPDimentionForm(spriteType, sprite, spposX, spposY, nameInput, colorInput, container);

    shapeInput.addEventListener('change', function(){
        createEditPDimentionForm(shapeInput.value, sprite, spposX, spposY, nameInput, colorInput, container);
    })

    


}

export function createEditPDimentionForm(
    spriteType: string, sprite: Shape, spposX: number, spposY: number, 
    nameInput: HTMLInputElement, colorInput: HTMLInputElement, container: GameVariable
    ){
    
    if(spriteType == cCircle){
        removeAllChildNodes(dimensionForm);
        let radiuslbl = document.createElement("label");
        radiuslbl.innerText = "Enter Radius: ";
        dimensionForm.appendChild(radiuslbl);
        let radiustxt = document.createElement("input");
        radiustxt.type = "number";
        radiustxt.value = sprite.getSize()[0].toString();
        dimensionForm.appendChild(radiustxt);    
        insertbr(dimensionForm);
        let coordlblx = document.createElement("label");
        coordlblx.innerText = "Enter Pos-X: ";
        let coordlbly = document.createElement("label");
        coordlbly.innerText = "Enter Pos-Y: ";
        let posX = document.createElement("input");
        let posY = document.createElement("input");
        posX.type = "number";
        posY.type = "number";
        posX.value = spposX.toString();
        posY.value = spposY.toString();
        dimensionForm.appendChild(coordlblx);
        dimensionForm.appendChild(posX);
        insertbr(dimensionForm);
        dimensionForm.appendChild(coordlbly);
        dimensionForm.appendChild(posY);
        insertbr(dimensionForm);


        let addbtn = document.createElement("button");
        addbtn.innerText = "Save";
        addbtn.addEventListener('click', function(){
            // Save to Sprite
            container.savePSprite(nameInput.value, new Circle(Number(posX.value), Number(posY.value), Number(radiustxt.value), colorInput.value));
            refreshSpriteList(container);
        })
        dimensionForm.appendChild(addbtn);

        let addEbtn = document.createElement("button");
        addEbtn.innerText = "Add User Event"
        addEbtn.addEventListener('click', function(){
            // Create Event Form (Function Call)
            createUserEventForm(eventForm,container);
        })

        dimensionForm.appendChild(addEbtn);

    }else if(spriteType == cSquare){
        removeAllChildNodes(dimensionForm);
        let lengthlbl = (document.createElement("label") as HTMLElement);
        lengthlbl.innerText = "Enter length: ";
        dimensionForm.appendChild(lengthlbl);
        let lengthtxt = (document.createElement("input"));
        lengthtxt.type = "number";
        lengthtxt.value = sprite.getSize()[1].toString();
        lengthtxt.name = "length";
        dimensionForm.appendChild(lengthtxt);
        insertbr(dimensionForm);
      
        let heightlbl = (document.createElement("label") as HTMLElement);
        heightlbl.innerText = "Enter height: ";
        dimensionForm.appendChild(heightlbl);
        let heighttxt = (document.createElement("input"));
        heighttxt.type = "number";
        heighttxt.value = sprite.getSize()[0].toString();
        heighttxt.name = "height";
        dimensionForm.appendChild(heighttxt);
        insertbr(dimensionForm);
    
        let coordlblx = document.createElement("label");
        coordlblx.innerText = "Enter Pos-X: ";
        let coordlbly = document.createElement("label");
        coordlbly.innerText = "Enter Pos-Y: ";
        let posX = document.createElement("input");
        let posY = document.createElement("input");
        posX.type = "number";
        posY.type = "number";
        posX.value = spposX.toString();
        posY.value = spposY.toString();
        dimensionForm.appendChild(coordlblx);
        dimensionForm.appendChild(posX);
        insertbr(dimensionForm);
        dimensionForm.appendChild(coordlbly);
        dimensionForm.appendChild(posY);
        insertbr(dimensionForm);
    
    
        let addbtn = document.createElement("button");
        addbtn.innerText = "Save";
        addbtn.addEventListener('click', function(){
            // Save Sprite to Container
            container.savePSprite(nameInput.value, new Block(Number(posX.value), Number(posY.value), Number(lengthtxt.value),Number(heighttxt.value), colorInput.value));
            refreshSpriteList(container);
        })
        dimensionForm.appendChild(addbtn);

        
        let addEbtn = document.createElement("button");
        addEbtn.innerText = "Add User Event"
        addEbtn.addEventListener('click', function(){
            // Create Event Form (Function Call)
            createUserEventForm(eventForm,container);
        })

        dimensionForm.appendChild(addEbtn);

    }
}


// generate user event editor
// index - sprite index, bIndex, behavior index
//use editBehavior
export function editBehaviorForm(index: number, bIndex: number, container: GameVariable){
    let createEvent = document.getElementById("create-event");
    let eventSettings = document.getElementById("event-settings");
    let unitstxt : HTMLInputElement;
    let speedtxt : HTMLInputElement;
    let xtxt : HTMLInputElement;
    let ytxt : HTMLInputElement;
    removeAllChildNodes(eventSettings);
    removeAllChildNodes(createEvent);
    let behaviorName = container.getEventNames()[index][bIndex];
    let behavior = container.getBehavior()[index][bIndex];
    let nspriteName = container.getSpriteNames()[index];
    let eventNamelbl = document.createElement("h4");
    eventNamelbl.innerHTML = "Editing " + behaviorName + " behavior of " + nspriteName;
    createEvent.appendChild(eventNamelbl);

    if(behaviorName.includes("move")){
        let moveB = behavior as Move;

        let unitslbl = document.createElement("label");
        unitslbl.innerHTML = "New units: ";
        unitstxt = document.createElement("input");
        unitstxt.type = "number";
        unitstxt.value = moveB.displacement.toString();
        createEvent.appendChild(unitslbl);
        createEvent.appendChild(unitstxt);
        insertbr(createEvent);

        let speedlbl = document.createElement("label");
        speedlbl.innerHTML = "New speed: ";
        speedtxt = document.createElement("input");
        speedtxt.type = "number";
        speedtxt.value = moveB.speed.toString();
        createEvent.appendChild(speedlbl);
        createEvent.appendChild(speedtxt);
        insertbr(createEvent);
    }
    else{
        let moveB = behavior as SetPosition;
        let tempA = behaviorName.indexOf('(') + 1;
        let tempB = behaviorName.indexOf(',');
        let x =  behaviorName.substring(tempA,tempB);
        let tempC = behaviorName.indexOf(')');
        let y =  behaviorName.substring(tempB + 1,tempC);
        let xlbl = document.createElement("label");
        xlbl.innerHTML = "New X: ";
        xtxt = document.createElement("input");
        xtxt.type = "number";
        xtxt.value = x;
        createEvent.appendChild(xlbl);
        createEvent.appendChild(xtxt);
        insertbr(createEvent);

        let ylbl = document.createElement("label");
        ylbl.innerHTML = "New Y: ";
        ytxt = document.createElement("input");
        ytxt.type = "number";
        ytxt.value = y;
        createEvent.appendChild(ylbl);
        createEvent.appendChild(ytxt);
        insertbr(createEvent);


    }

    let updatebtn = document.createElement("button");
    updatebtn.innerHTML = "Update";
    createEvent.appendChild(updatebtn);
    updatebtn.addEventListener("click",function(){
        if(behaviorName.includes("move")){
           //function editMoveEvent(index: number, bIndex: number,container: GameVariable, moveUnit: number, moveSpeed: number, moveDirection: string,name: string)
        // use the function above
            if(behaviorName === typeMoveLeft){
                editMoveEvent(index, bIndex,container, Number(unitstxt.value), Number(speedtxt.value),typeMoveLeft,behaviorName);
            }
            else if(behaviorName === typeMoveRight){
                editMoveEvent(index, bIndex,container, Number(unitstxt.value), Number(speedtxt.value),typeMoveRight,behaviorName);
            }
            else if(behaviorName === typeMoveUp){
                editMoveEvent(index, bIndex,container, Number(unitstxt.value), Number(speedtxt.value),typeMoveUp,behaviorName);
            }
            else if(behaviorName === typeMoveDown){
                editMoveEvent(index, bIndex,container, Number(unitstxt.value), Number(speedtxt.value),typeMoveDown,behaviorName);
            }

        }
        else{
            // update the name of the behaviour as well
            let newName = "set-position-(" + xtxt.value.toString()+","+ytxt.value.toString()+")";
            editSetEvent(index, bIndex,newName,  container, Number(xtxt.value), Number(ytxt.value));
        }
    })


}
// uindex - user event index
export function editUserEvent(uIndex: number, container: GameVariable){
    let formBody = document.getElementById("create-event");
    removeAllChildNodes(formBody);
    let eventName = container.getuEventNames()[uIndex];
    let eventNamelbl = document.createElement("h4");
    eventNamelbl.innerHTML = "Editing " + eventName + " user event.";
    formBody.appendChild(eventNamelbl);
    let unitslbl = document.createElement("label");
    unitslbl.innerText = "New speed: ";
    let unitstxt = document.createElement("input");
    unitstxt.type = "number";
    unitstxt.value = container.getUEvents()[uIndex].behavior.speed.toString();
    formBody.appendChild(unitslbl);
    formBody.appendChild(unitstxt);

    let updatebtn = document.createElement("button");
    formBody.appendChild(updatebtn);
    updatebtn.innerText = "Update";
    updatebtn.addEventListener("click",function(){
        let dir: DIRECTION;
        let strategy: UserKeydownEvent;
        switch(eventName){
            case 'left-key':
                dir = DIRECTION.DOWN;
                strategy = new UserKeydownEvent(new Move(9999,dir,Number(unitstxt.value)),KEYCODE.ARROWLEFT);
                break;
            case 'right-key':
                dir = DIRECTION.RIGHT;
                strategy = new UserKeydownEvent(new Move(9999,dir,Number(unitstxt.value)),KEYCODE.ARROWRIGHT);
                break;
            case 'up-key':
                dir = DIRECTION.UP;
                strategy = new UserKeydownEvent(new Move(9999,dir,Number(unitstxt.value)),KEYCODE.ARROWUP);
                break;
            case 'down-key':
                dir = DIRECTION.DOWN;
                strategy = new UserKeydownEvent(new Move(9999,dir,Number(unitstxt.value)),KEYCODE.ARROWDOWN);
                break;

        }
        container.editUserEvent(uIndex,strategy);
    })
}


export function editMoveEvent(index: number, bIndex: number,container: GameVariable, moveUnit: number, moveSpeed: number, moveDirection: string,name: string){
    let dir: DIRECTION;
    switch (moveDirection){
        case typeMoveLeft:
            dir = DIRECTION.LEFT;
            break;
        case typeMoveRight:
            dir = DIRECTION.RIGHT;
            break;
        case typeMoveUp:
            dir = DIRECTION.UP;
            break;
        case typeMoveDown:
            dir = DIRECTION.DOWN;
            break;
        case typeMoveUpLeft:
            dir = DIRECTION.TOPLEFT;
            break;
        case typeMoveUpRight:
            dir = DIRECTION.TOPRIGHT;
            break;
        case typeMoveBottomLeft:
            dir = DIRECTION.BOTTOMLEFT;
            break;
        case typeMoveBottomRight:
            dir = DIRECTION.BOTTOMRIGHT;
            break;
    }
    let newMove = new Move(moveUnit, dir, moveSpeed);
    container.editBehavior(index, bIndex, name, newMove)
    //container.addBehavior(index,moveDirection,newMove);
    displayEvent(index, container);
    
}

export function editSetEvent(index: number, bIndex : number,name : string,  container: GameVariable, posX: number, posY: number){
    let newSet = new SetPosition({x: posX, y: posY});
    //container.addBehavior(index,"set-position-(" + posX.toString()+","+posY.toString()+")",newSet);
    container.editBehavior(index, bIndex, name, newSet)
    displayEvent(index, container);
    
}
