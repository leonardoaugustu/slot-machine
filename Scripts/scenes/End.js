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
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function End(playScene) {
            var _this = _super.call(this) || this;
            _this._playScene = playScene;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        End.prototype.Start = function () {
            // background
            this._background = new createjs.Bitmap(config.Game.ASSETS.getResult("backgroundEnd"));
            //instantiate a new Text object
            this._resultLabel = new objects.Label(this._playScene.result, "80px", "Consolas", "#FFF000", 320, 100, true, 640);
            this._messageLabel = new objects.Label(this._playScene.message, "40px", "Consolas", "#FFF000", 320, 250, true, 640);
            this._statsLabel = new objects.Label(this._playScene.stats, "20px", "Consolas", "#FFF000", 320, 380, true, 640);
            // buttons
            this._backButton = new objects.Button(config.Game.ASSETS.getResult("backButton"), 320, 600, true);
            this.Main();
        };
        End.prototype.Update = function () {
        };
        End.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._resultLabel);
            this.addChild(this._messageLabel);
            this.addChild(this._statsLabel);
            this.addChild(this._backButton);
            this._backButton.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map