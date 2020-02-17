module scenes {
    export class Play extends objects.Scene {
        
        // CLASS MEMBERS
        static MAX_BET: number = 100;

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

        private _turn: number;
        private _winNumber: number;
        private _lossNumber: number;
       
        private _result: string;
        private _message: string;
        private _stats: string;

        // PUBLIC PROPERTIES
        get result(): string {
            return this._result;
        }

        set result(newResult: string) {
            this._result = newResult;
        }

        get message(): string {
            return this._message;
        }

        set message(newMessage: string) {
            this._message = newMessage;
        }

        get stats(): string {
            return this._stats;
        }

        set stats(newStats: string) {
            this._stats = newStats;
        }

        // CONSTRUCTOR
        constructor() {
            super();

            this.Start();
        }

        // PRIVATE METHODS
        private _getPlayerStats():string
        {
            return `
                >> Player Statistics <<\n
                Player Money: ${this._slotMachine.winnings}\n
                Turn: ${this._turn}\n
                Wins: ${this._winNumber}\n
                Losses: ${this._lossNumber}\n
                Win Ratio: ${this._turn == 0 ?0 :(this._winNumber/this._turn*100).toFixed(2)}%
            `;
        }
        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            this._slotMachine = new objects.SlotMachine();

            this._creditsLabel = new objects.Label(this._slotMachine.credits.toString(), "25px", "Audiowide", "#0000FF", 95, 425, false);
            this._betLabel = new objects.Label(this._slotMachine.bet.toString(), "25px", "Audiowide", "#0000FF", 297, 425, false);
            this._winnerPaidLabel = new objects.Label(this._slotMachine.winnings.toString(), "25px", "Audiowide", "#0000FF", 380, 425, false);

            this._resetButton = new objects.Button(config.Game.ASSETS.getResult("resetButton"), 61, 561, false);
            this._quitButton = new objects.Button(config.Game.ASSETS.getResult("quitButton"), 154, 561, false);
            this._betOneButton = new objects.Button(config.Game.ASSETS.getResult("betOneButton"), 248, 560, false);
            this._betMaxButton = new objects.Button(config.Game.ASSETS.getResult("betMaxButton"), 341, 560, false);
            this._spinButton = new objects.Button(config.Game.ASSETS.getResult("spinButton"), 520, 555, false);

            this._turn = 0;
            this._winNumber = 0;
            this._lossNumber = 0;

            this.Main();
        }

        public Update(): void 
        {
            this._slotMachine.Update();
            this._creditsLabel.text = ("00000000" + this._slotMachine.credits).slice(-8);
            this._betLabel.text = ("000" + this._slotMachine.bet).slice(-3);
            this._winnerPaidLabel.text = ("00000" + this._slotMachine.winnings).slice(-5);
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
                if (this._slotMachine.bet < Play.MAX_BET) {
                    this._slotMachine.bet++;
                }
            });

            this._betMaxButton.on("click", () => {
                this._slotMachine.bet = this._slotMachine.credits >= Play.MAX_BET
                    ? Play.MAX_BET
                    : this._slotMachine.credits;
            });

            /* When the player clicks the spin button the game kicks off */
            this._spinButton.on("click", () => {

                if (this._slotMachine.credits == 0) {
                    this.result = "Game Over :(";
                    this.message = "You ran out of Money! \n\nDo you want to play again?";
                    this.stats = this._getPlayerStats();
                    config.Game.SCENE = scenes.State.END;
                }
                else if (this._slotMachine.bet > this._slotMachine.credits) {
                    this.result = "Game Over :(";
                    this.message = "You don't have enough Money to place that bet. \n\nDo you want to play again?";
                    this.stats = this._getPlayerStats();
                    config.Game.SCENE = scenes.State.END;
                }
                else {
                    this._slotMachine.Reels();
                    this._slotMachine.DetermineWinnings() ? this._winNumber++ : this._lossNumber++;
                    this._turn++;

                    if (this._slotMachine.CheckJackPot()) {
                        this.result = "You win !!!";
                        this.message = "The Jackpot is yours !!!\n\nDo you want to play again?";
                        this.stats = this._getPlayerStats();
                        config.Game.SCENE = scenes.State.END;
                    }
                }

            });

            this._resetButton.on("click", () => {
                this._slotMachine.Reset();
            });

            this._quitButton.on("click", () => {
                this.result = "Game Over :(";
                this.message = "Better luck next time! \n\nDo you want to play again?";
                this.stats = this._getPlayerStats();
                config.Game.SCENE = scenes.State.END;
        });

        }


    }
}