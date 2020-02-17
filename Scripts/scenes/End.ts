module scenes
{
    export class End extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _playScene: scenes.Play;
        private _background: createjs.Bitmap;
        private _resultLabel: objects.Label;
        private _messageLabel: objects.Label;
        private _statsLabel: objects.Label;
        private _backButton: objects.Button;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor(playScene: scenes.Play)
        {
            super();

            this._playScene = playScene;

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        // Initializing and Instantiating
        public Start(): void 
        {
            // background
            this._background = new createjs.Bitmap(config.Game.ASSETS.getResult("backgroundEnd"));
             //instantiate a new Text object
             this._resultLabel = new objects.Label(this._playScene.result, "80px", "Consolas", "#FFF000", 320, 100, true, 640);
             this._messageLabel = new objects.Label(this._playScene.message, "40px", "Consolas", "#FFF000", 320, 250, true, 640);
             this._statsLabel = new objects.Label(this._playScene.stats, "20px", "Consolas", "#FFF000", 320, 380, true, 640);
             // buttons
             this._backButton = new objects.Button(config.Game.ASSETS.getResult("backButton"), 320, 600, true);
            
             this.Main();
        }        
        
        public Update(): void 
        {
        }
        
        public Main(): void 
        {
            this.addChild(this._background);
            this.addChild(this._resultLabel);
            this.addChild(this._messageLabel);
            this.addChild(this._statsLabel);
            this.addChild(this._backButton);

            this._backButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY;
            });

        }

        
    }
}