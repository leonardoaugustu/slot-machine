//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let currentSceneState:scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;

    let assetManifest = 
    [
        {id:"placeholder", src:"./Assets/images/placeholder.png"},
        {id:"startButton", src:"./Assets/images/startButton.png"},
        {id:"backButton", src:"./Assets/images/backButton.png"},
        
        {id:"slotMachine", src:"./Assets/images/slot-machine.png"},
        {id:"emptyReel", src:"./Assets/images/empty-reel.png"},
        {id:"resetButton", src:"./Assets/images/reset-button.png"},
        {id:"quitButton", src:"./Assets/images/quit-button.png"},
        {id:"betOneButton", src:"./Assets/images/betone-button.png"},
        {id:"betMaxButton", src:"./Assets/images/betmax-button.png"},
        {id:"spinButton", src:"./Assets/images/spin-button.png"},
        
        {id:"banana", src:"./Assets/images/banana.png"},
        {id:"bar", src:"./Assets/images/bar.png"},
        {id:"bell", src:"./Assets/images/bell.png"},
        {id:"blank", src:"./Assets/images/blank.png"},
        {id:"cherry", src:"./Assets/images/cherry.png"},      
        {id:"grapes", src:"./Assets/images/grapes.png"},      
        {id:"orange", src:"./Assets/images/orange.png"},      
        {id:"seven", src:"./Assets/images/seven.png"},      
    ];

    function Preload():void
    {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.PLAY;
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update():void
    {
        if(currentSceneState != config.Game.SCENE)
        {
            Main();
        }

        currentScene.Update();

        stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Scene Switched...`, "color: green; font-size: 16px;");

        // clean up
        if(currentSceneState != scenes.State.NO_SCENE)
        {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }

        // switch to the new scene

        switch(config.Game.SCENE)
        {
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play(); 
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End(); 
                break;
        }

        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);

    }

    window.addEventListener('load', Preload);


})();