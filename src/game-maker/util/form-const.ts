export const spriteList: HTMLElement = document.getElementById("sprite-list");
export const eventList: HTMLElement = document.getElementById("event-list");
export const initSetting: HTMLElement = document.getElementById("init-settings");
export const dynamicForm: HTMLElement = document.getElementById("dynamic-form");
export const dimensionForm: HTMLElement = document.getElementById("dimensions");
export const eventForm: HTMLElement = document.getElementById("create-event");
export const eventSettingForm: HTMLElement = document.getElementById("event-settings");
export const actType: HTMLInputElement = document.getElementById("aType") as HTMLInputElement;
export const bgType: HTMLInputElement = document.getElementById("bType") as HTMLInputElement;
export const actionbtn: HTMLElement = document.getElementById("init-settings");
export const updatebtn: HTMLElement = document.getElementById("update-entity");
export const saveBtn: HTMLInputElement = document.getElementById("save-game-file") as HTMLInputElement;
export const loadBtn: HTMLInputElement = document.getElementById("load-game-file") as HTMLInputElement;
export const readBtn: HTMLInputElement = document.getElementById("read-game-file") as HTMLInputElement;
export const createSpriteAction: HTMLElement = document.getElementById("aType");
export const createPSpriteAction: HTMLElement = document.getElementById("create-p-sprite") as HTMLOptionElement;

export const cCircle = "create-circle";
export const cSquare = "create-square";

export const typeNSprite = "nSprite";
export const typePSprite = "pSprite";

export const typeMove = "move-event";
export const typeMoveLeft = "move-left";
export const typeMoveRight = "move-right";
export const typeMoveUp = "move-up";
export const typeMoveDown = "move-down";

export const typeMoveUpLeft = "move-upleft";
export const typeMoveUpRight = "move-upright";
export const typeMoveBottomLeft = "move-bottomleft";
export const typeMoveBottomRight = "move-bottomright";

export const collideType = "collide-option";
export const typeCollideReflect = "-C"
export const typeCollideRandom = "-R"

export const typeSet = "set-event";

export const soundType = "sound-option"
export const soundOnePath = "./src/sound-effects/sound1.wav"
export const soundTwoPath = "./srv/sound-effects/sound2.wav"