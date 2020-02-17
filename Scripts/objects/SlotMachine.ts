module objects {
    export class SlotMachine extends GameObject {
        // PRIVATE INSTANCE MEMBERS
        private _betLine: objects.Reel[];

        private _credits: number;
        private _bet: number;
        private _winnings: number;

        private _grapes: number = 0;
        private _bananas: number = 0;
        private _oranges: number = 0;
        private _cherries: number = 0;
        private _bars: number = 0;
        private _bells: number = 0;
        private _sevens: number = 0;
        private _blanks: number = 0;

        // PUBLIC PROPERTIES
        get credits(): number {
            return this._credits;
        }

        set credits(newCredits: number) {
            this._credits = newCredits;
        }

        get bet(): number {
            return this._bet;
        }

        set bet(newBet: number) {
            this._bet = newBet;
        }

        get winnings(): number {
            return this._winnings;
        }

        set winnings(newWinnings: number) {
            this._winnings = newWinnings;
        }

        get betLine(): Reel[] {
            return this._betLine;
        }

        set betLine(newBetLine: Reel[]) {
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

        // PUBLIC METHODS
        public Start(): void {
            let reelOne = new Reel(88, 213);
            let reelTwo = new Reel(257, 213);
            let reelThree = new Reel(428, 213);
            this._betLine = [reelOne, reelTwo, reelThree];

            this.Reset();
        }

        public Update(): void {

        }

        public Reset(): void {
            this.credits = 1000;
            this.bet = 10;
            this.winnings = 0;
        }

        /* When this function is called it determines the this._betLine results.
        e.g. Bar - Orange - Banana */
        public Reels(): void {
            var outCome = [0, 0, 0];

            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case util.Math.CheckRange(outCome[spin], 1, 27):  // 41.5% probability
                        this._betLine[spin].image = config.Game.ASSETS.getResult("blank") as HTMLImageElement;
                        this._blanks++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 28, 37): // 15.4% probability
                        this._betLine[spin].image = config.Game.ASSETS.getResult("grapes") as HTMLImageElement;
                        this._grapes++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 38, 46): // 13.8% probability
                        this._betLine[spin].image = config.Game.ASSETS.getResult("banana") as HTMLImageElement;
                        this._bananas++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 47, 54): // 12.3% probability
                        this._betLine[spin].image = config.Game.ASSETS.getResult("orange") as HTMLImageElement;
                        this._oranges++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 55, 59): //  7.7% probability
                        this._betLine[spin].image = config.Game.ASSETS.getResult("cherry") as HTMLImageElement;
                        this._cherries++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 60, 62): //  4.6% probability
                        this._betLine[spin].image = config.Game.ASSETS.getResult("bar") as HTMLImageElement;
                        this._bars++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 63, 64): //  3.1% probability
                        this._betLine[spin].image = config.Game.ASSETS.getResult("bell") as HTMLImageElement;
                        this._bells++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 65, 65): //  1.5% probability
                        this._betLine[spin].image = config.Game.ASSETS.getResult("seven") as HTMLImageElement;
                        this._sevens++;
                        break;
                }
            }
        }

        /* This function calculates the player's winnings, if any */
        public DetermineWinnings(): boolean {
            if (this._blanks == 0) {
                if (this._grapes == 3) {
                    this.winnings = this._bet * 10;
                }
                else if (this._bananas == 3) {
                    this.winnings = this._bet * 20;
                }
                else if (this._oranges == 3) {
                    this.winnings = this._bet * 30;
                }
                else if (this._cherries == 3) {
                    this.winnings = this._bet * 40;
                }
                else if (this._bars == 3) {
                    this.winnings = this._bet * 50;
                }
                else if (this._bells == 3) {
                    this.winnings = this._bet * 75;
                }
                else if (this._sevens == 3) {
                    this.winnings = this._bet * 100;
                }
                else if (this._grapes == 2) {
                    this.winnings = this._bet * 2;
                }
                else if (this._bananas == 2) {
                    this.winnings = this._bet * 2;
                }
                else if (this._oranges == 2) {
                    this.winnings = this._bet * 3;
                }
                else if (this._cherries == 2) {
                    this.winnings = this._bet * 4;
                }
                else if (this._bars == 2) {
                    this.winnings = this._bet * 5;
                }
                else if (this._bells == 2) {
                    this.winnings = this._bet * 10;
                }
                else if (this._sevens == 2) {
                    this.winnings = this._bet * 20;
                }
                else if (this._sevens == 1) {
                    this.winnings = this._bet * 5;
                }
                else {
                    this.winnings = this._bet * 1;
                }
                return true;
            }
            return false;
        }

    }
}