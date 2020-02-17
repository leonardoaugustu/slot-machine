module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _slotMachine?: objects.SlotMachine;
        
        private _creditsLabel: objects.Label;
        private _betLabel: objects.Label;
        private _winnerPaidLabel: objects.Label;

        private _resetButton: objects.Button;
        private _quitButton: objects.Button;
        private _betOneButton: objects.Button;
        private _betMaxButton: objects.Button;
        private _spinButton: objects.Button;
        
        private _jackpot: number = 5000;
        private _turn: number = 0;
        private _spinResult: number;
        private _winRatio: number = 0;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            this._slotMachine = new objects.SlotMachine();

            this._creditsLabel = new objects.Label(('00000000'+this._slotMachine.credits).slice(-8), "25px", "Audiowide", "#0000FF", 95, 425, false);
            this._betLabel = new objects.Label(('000'+this._slotMachine.bet).slice(-3), "25px", "Audiowide", "#0000FF", 297, 425, false);
            this._winnerPaidLabel = new objects.Label(('00000'+this._slotMachine.winnerPaid).slice(-5), "25px", "Audiowide", "#0000FF", 380, 425, false);

            this._resetButton = new objects.Button(config.Game.ASSETS.getResult("resetButton"), 61, 561, false);
            this._quitButton = new objects.Button(config.Game.ASSETS.getResult("quitButton"), 154, 561, false);
            this._betOneButton = new objects.Button(config.Game.ASSETS.getResult("betOneButton"), 248, 560, false);
            this._betMaxButton = new objects.Button(config.Game.ASSETS.getResult("betMaxButton"), 341, 560, false);
            this._spinButton = new objects.Button(config.Game.ASSETS.getResult("spinButton"), 520, 555, false);

            this.Main();
        }        
        
        public Update(): void 
        {
           this._slotMachine.Update();
        }
        
        public Main(): void 
        {
            this.addChild(this._slotMachine);
            this.addChild(this._slotMachine.betLine[0]);
            this.addChild(this._slotMachine.betLine[1]);
            this.addChild(this._slotMachine.betLine[2]);
            
            this.addChild(this._creditsLabel);
            this.addChild(this._betLabel);
            this.addChild(this._winnerPaidLabel);

            this.addChild(this._resetButton);
            this.addChild(this._quitButton);
            this.addChild(this._betOneButton);
            this.addChild(this._betMaxButton);
            this.addChild(this._spinButton);

            this._betOneButton.on("click", () => {

            });

            this._betMaxButton.on("click", () => {

            });

            /* When the player clicks the spin button the game kicks off */
            this._spinButton.on("click", () => {
                this._slotMachine.Reels();
            });

        }

        
    }
}