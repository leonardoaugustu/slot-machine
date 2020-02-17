"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var SlotMachine = /** @class */ (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR
        function SlotMachine() {
            var _this = _super.call(this, config.Game.ASSETS.getResult("slotMachine"), 0, 0, false) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(SlotMachine.prototype, "credits", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._credits;
            },
            set: function (newCredits) {
                this._credits = newCredits;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SlotMachine.prototype, "bet", {
            get: function () {
                return this._bet;
            },
            set: function (newBet) {
                this._bet = newBet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SlotMachine.prototype, "winnings", {
            get: function () {
                return this._winnings;
            },
            set: function (newWinnings) {
                this._winnings = newWinnings;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SlotMachine.prototype, "jackpot", {
            get: function () {
                return this._jackpot;
            },
            set: function (newJackpot) {
                this._jackpot = newJackpot;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SlotMachine.prototype, "betLine", {
            get: function () {
                return this._betLine;
            },
            set: function (newBetLine) {
                this._betLine = newBetLine;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        SlotMachine.prototype._checkBounds = function () {
        };
        /* Utility function to reset all fruit tallies */
        SlotMachine.prototype._resetFruitTally = function () {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        };
        // PUBLIC METHODS
        SlotMachine.prototype.Start = function () {
            var reelOne = new objects.Reel(88, 213);
            var reelTwo = new objects.Reel(257, 213);
            var reelThree = new objects.Reel(428, 213);
            this._betLine = [reelOne, reelTwo, reelThree];
            this.Reset();
        };
        SlotMachine.prototype.Update = function () {
            this._betLine.forEach(function (reel) { return reel.Update(); });
        };
        SlotMachine.prototype.Reset = function () {
            this.credits = 1000;
            this.bet = 10;
            this.winnings = 0;
            this.jackpot = 5000;
            this._resetFruitTally();
            this._betLine.forEach(function (reel) { return reel.Reset(); });
        };
        /* Check to see if the player won the jackpot */
        SlotMachine.prototype.CheckJackPot = function () {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            var result = (jackPotTry == jackPotWin);
            if (result) {
                this._winnings += this._jackpot;
            }
            return result;
        };
        /* When this function is called it determines the this._betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype.Reels = function () {
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case util.Math.CheckRange(outCome[spin], 1, 27): // 41.5% probability
                        this._betLine[spin].symbol = objects.Symbol.BLANK;
                        this._blanks++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 28, 37): // 15.4% probability
                        this._betLine[spin].symbol = objects.Symbol.GRAPES;
                        this._grapes++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 38, 46): // 13.8% probability
                        this._betLine[spin].symbol = objects.Symbol.BANANA;
                        this._bananas++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 47, 54): // 12.3% probability
                        this._betLine[spin].symbol = objects.Symbol.ORANGE;
                        this._oranges++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 55, 59): //  7.7% probability
                        this._betLine[spin].symbol = objects.Symbol.CHERRY;
                        this._cherries++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 60, 62): //  4.6% probability
                        this._betLine[spin].symbol = objects.Symbol.BAR;
                        this._bars++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 63, 64): //  3.1% probability
                        this._betLine[spin].symbol = objects.Symbol.BELL;
                        this._bells++;
                        break;
                    case util.Math.CheckRange(outCome[spin], 65, 65): //  1.5% probability
                        this._betLine[spin].symbol = objects.Symbol.SEVEN;
                        this._sevens++;
                        break;
                }
            }
        };
        /* This function calculates the player's winnings, if any */
        SlotMachine.prototype.DetermineWinnings = function () {
            var result = false;
            if (this._blanks == 0) {
                var roundWinnings = 0;
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
        };
        return SlotMachine;
    }(objects.GameObject));
    objects.SlotMachine = SlotMachine;
})(objects || (objects = {}));
//# sourceMappingURL=SlotMachine.js.map