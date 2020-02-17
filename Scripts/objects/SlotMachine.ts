module objects {
    export class SlotMachine extends GameObject {
        // PRIVATE INSTANCE MEMBERS
        private _betLine: objects.Reel[];

        private _credits: number;
        private _bet: number;
        private _winnings: number;
        private _jackpot: number;

        private _grapes: number;
        private _bananas: number;
        private _oranges: number;
        private _cherries: number;
        private _bars: number;
        private _bells: number;
        private _sevens: number;
        private _blanks: number;

        // PUBLIC PROPERTIES
        get credits(): number 
        {
            return this._credits;
        }

        set credits(newCredits: number) 
        {
            this._credits = newCredits;
        }

        get bet(): number 
        {
            return this._bet;
        }

        set bet(newBet: number) 
        {
            this._bet = newBet;
        }

        get winnings(): number 
        {
            return this._winnings;
        }

        set winnings(newWinnings: number) 
        {
            this._winnings = newWinnings;
        }

        get jackpot() : number
        {
            return this._jackpot;
        }

        set jackpot(newJackpot: number)
        {
            this._jackpot = newJackpot;
        }

        get betLine(): Reel[] 
        {
            return this._betLine;
        }

        set betLine(newBetLine: Reel[]) 
        {
            this._betLine = newBetLine;
        }

        // CONSTRUCTOR
        constructor() {
            super(config.Game.ASSETS.getResult("slotMachine"), 0, 0, false);
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {

        }

        /* Utility function to reset all fruit tallies */
        private _resetFruitTally() {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        }

        // PUBLIC METHODS
        public Start(): void {
            let reelOne = new Reel(88, 213);
            let reelTwo = new Reel(257, 213);
            let reelThree = new Reel(428, 213);
            this._betLine = [reelOne, reelTwo, reelThree];

            this.Reset();
        }

        public Update(): void {
            this._betLine.forEach(reel => reel.Update());
        }

        public Reset(): void {
            this.credits = 1000;
            this.bet = 10;
            this.winnings = 0;
            this.jackpot = 5000;
            this._resetFruitTally();
            this._betLine.forEach(reel => reel.Reset());
        }

        /* Check to see if the player won the jackpot */
        public CheckJackPot(): boolean
        {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            let result = (jackPotTry == jackPotWin);
            if (result) {
                this._winnings += this._jackpot;
            }
            return result;
        }        

        /* When this function is called it determines the this._betLine results.
        e.g. Bar - Orange - Banana */
        public Reels(): void {
            var outCome = [0, 0, 0];

            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case util.Math.CheckRange(outCome[spin], 1, 27):  // 41.5% probability
                        this._betLine[spin].symbol = Symbol.BLANK;
                        this._blanks++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 28, 37): // 15.4% probability
                        this._betLine[spin].symbol = Symbol.GRAPES;
                        this._grapes++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 38, 46): // 13.8% probability
                        this._betLine[spin].symbol = Symbol.BANANA;
                        this._bananas++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 47, 54): // 12.3% probability
                        this._betLine[spin].symbol = Symbol.ORANGE;
                        this._oranges++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 55, 59): //  7.7% probability
                        this._betLine[spin].symbol = Symbol.CHERRY;
                        this._cherries++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 60, 62): //  4.6% probability
                        this._betLine[spin].symbol = Symbol.BAR;
                        this._bars++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 63, 64): //  3.1% probability
                        this._betLine[spin].symbol = Symbol.BELL;
                        this._bells++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 65, 65): //  1.5% probability
                        this._betLine[spin].symbol = Symbol.SEVEN;
                        this._sevens++;
                        break;
                }
            }
        }

        /* This function calculates the player's winnings, if any */
        public DetermineWinnings(): boolean {
            let result: boolean = false;
            if (this._blanks == 0) {
                
                let roundWinnings:number = 0;

                if (this._grapes == 3) {
                    roundWinnings = this._bet * 10;
                }
                else if (this._bananas == 3) {
                    roundWinnings = this._bet * 20;
                }
                else if (this._oranges == 3) {
                    roundWinnings = this._bet * 30;
                }
                else if (this._cherries == 3) {
                    roundWinnings = this._bet * 40;
                }
                else if (this._bars == 3) {
                    roundWinnings = this._bet * 50;
                }
                else if (this._bells == 3) {
                    roundWinnings = this._bet * 75;
                }
                else if (this._sevens == 3) {
                    roundWinnings = this._bet * 100;
                }
                else if (this._grapes == 2) {
                    roundWinnings = this._bet * 2;
                }
                else if (this._bananas == 2) {
                    roundWinnings = this._bet * 2;
                }
                else if (this._oranges == 2) {
                    roundWinnings = this._bet * 3;
                }
                else if (this._cherries == 2) {
                    roundWinnings = this._bet * 4;
                }
                else if (this._bars == 2) {
                    roundWinnings = this._bet * 5;
                }
                else if (this._bells == 2) {
                    roundWinnings = this._bet * 10;
                }
                else if (this._sevens == 2) {
                    roundWinnings = this._bet * 20;
                }
                else if (this._sevens == 1) {
                    roundWinnings = this._bet * 5;
                }
                else {
                    roundWinnings = this._bet * 1;
                }
                result = true;
                this.credits += roundWinnings;
                this.winnings += roundWinnings;
            }
            this._credits -= this._bet;
            this._resetFruitTally();
            return result;
        }

    }
}