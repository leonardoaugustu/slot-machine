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
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Play.prototype, "result", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._result;
            },
            set: function (newResult) {
                this._result = newResult;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Play.prototype, "message", {
            get: function () {
                return this._message;
            },
            set: function (newMessage) {
                this._message = newMessage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Play.prototype, "stats", {
            get: function () {
                return this._stats;
            },
            set: function (newStats) {
                this._stats = newStats;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Play.prototype._getPlayerStats = function () {
            return "\n                >> Player Statistics <<\n\n                Player Money: " + this._slotMachine.winnings + "\n\n                Turn: " + this._turn + "\n\n                Wins: " + this._winNumber + "\n\n                Losses: " + this._lossNumber + "\n\n                Win Ratio: " + (this._turn == 0 ? 0 : (this._winNumber / this._turn * 100).toFixed(2)) + "%\n            ";
        };
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
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
        };
        Play.prototype.Update = function () {
            this._slotMachine.Update();
            this._creditsLabel.text = ("00000000" + this._slotMachine.credits).slice(-8);
            this._betLabel.text = ("000" + this._slotMachine.bet).slice(-3);
            this._winnerPaidLabel.text = ("00000" + this._slotMachine.winnings).slice(-5);
        };
        Play.prototype.Main = function () {
            var _this = this;
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
            this._betOneButton.on("click", function () {
                if (_this._slotMachine.bet < Play.MAX_BET) {
                    _this._slotMachine.bet++;
                }
            });
            this._betMaxButton.on("click", function () {
                _this._slotMachine.bet = _this._slotMachine.credits >= Play.MAX_BET
                    ? Play.MAX_BET
                    : _this._slotMachine.credits;
            });
            /* When the player clicks the spin button the game kicks off */
            this._spinButton.on("click", function () {
                if (_this._slotMachine.credits == 0) {
                    _this.result = "Game Over :(";
                    _this.message = "You ran out of Money! \n\nDo you want to play again?";
                    _this.stats = _this._getPlayerStats();
                    config.Game.SCENE = scenes.State.END;
                }
                else if (_this._slotMachine.bet > _this._slotMachine.credits) {
                    _this.result = "Game Over :(";
                    _this.message = "You don't have enough Money to place that bet. \n\nDo you want to play again?";
                    _this.stats = _this._getPlayerStats();
                    config.Game.SCENE = scenes.State.END;
                }
                else {
                    _this._slotMachine.Reels();
                    _this._slotMachine.DetermineWinnings() ? _this._winNumber++ : _this._lossNumber++;
                    _this._turn++;
                    if (_this._slotMachine.CheckJackPot()) {
                        _this.result = "You win !!!";
                        _this.message = "The Jackpot is yours !!!\n\nDo you want to play again?";
                        _this.stats = _this._getPlayerStats();
                        config.Game.SCENE = scenes.State.END;
                    }
                }
            });
            this._resetButton.on("click", function () {
                _this._slotMachine.Reset();
            });
            this._quitButton.on("click", function () {
                _this.result = "Game Over :(";
                _this.message = "Better luck next time! \n\nDo you want to play again?";
                _this.stats = _this._getPlayerStats();
                config.Game.SCENE = scenes.State.END;
            });
        };
        // CLASS MEMBERS
        Play.MAX_BET = 100;
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map