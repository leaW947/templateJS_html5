let gameplayService=new GameplayService();
let sceneLoader=new SceneLoader();
let assetManager=new AssetManager();


let bGameReady=false;


function keyDown(t){
    t.preventDefault();
    sceneLoader.keypressed(t.code);
}

function mouseDown(e){
    sceneLoader.mousepressed(e.button,e.offsetX,e.offsetY);
}

function load(){
    document.addEventListener("keydown",keyDown,false);
    document.addEventListener("mousedown",mouseDown,false);
    
    //add images and sounds

    assetManager.start(startGame);

}

function startGame(){

    gameplayService.setCanvas(canvas);
    gameplayService.setAssetManager(assetManager);

    sceneLoader.load(gameplayService);
    sceneLoader.init("gameplay");
    
    bGameReady=true;
}

function update(dt){

    if(!bGameReady){
        return;
    }

    sceneLoader.update(dt);
}

function draw(pCtx){
    
    if(!bGameReady){
        return;
    }

    sceneLoader.draw(pCtx);

}