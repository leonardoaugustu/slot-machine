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
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this._jackpot = 5000;
            _this._turn = 0;
            _this._winRatio = 0;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            this._slotMachine = new objects.SlotMachine();
            this._creditsLabel = new objects.Label(('00000000' + this._slotMachine.credits).slice(-8), "25px", "Audiowide", "#0000FF", 95, 425, false);
            this._betLabel = new objects.Label(('000' + this._slotMachine.bet).slice(-3), "25px", "Audiowide", "#0000FF", 297, 425, false);
            this._winnerPaidLabel = new objects.Label(('00000' + this._slotMachine.winnerPaid).slice(-5), "25px", "Audiowide", "#0000FF", 380, 425, false);
            this._resetButton = new objects.Button(config.Game.ASSETS.getResult("resetButton"), 61, 561, false);
            this._quitButton = new objects.Button(config.Game.ASSETS.getResult("quitButton"), 154, 561, false);
            this._betOneButton = new objects.Button(config.Game.ASSETS.getResult("betOneButton"), 248, 560, false);
            this._betMaxButton = new objects.Button(config.Game.ASSETS.getResult("betMaxButton"), 341, 560, false);
            this._spinButton = new objects.Button(config.Game.ASSETS.getResult("spinButton"), 520, 555, false);
            this.Main();
        };
        Play.prototype.Update = function () {
            this._slotMachine.Update();
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
            });
            this._betMaxButton.on("click", function () {
            });
            /* When the player clicks the spin button the game kicks off */
            this._spinButton.on("click", function () {
                _this._slotMachine.Reels();
            });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map