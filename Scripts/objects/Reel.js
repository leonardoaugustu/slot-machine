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
    var Reel = /** @class */ (function (_super) {
        __extends(Reel, _super);
        // PRIVATE INSTANCE MEMBERS
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Reel(x, y, centered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (centered === void 0) { centered = false; }
            return _super.call(this, config.Game.ASSETS.getResult("emptyReel"), x, y, centered) || this;
        }
        // PRIVATE METHODS
        Reel.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        Reel.prototype.Start = function () {
        };
        Reel.prototype.Update = function () {
        };
        Reel.prototype.Reset = function () {
        };
        return Reel;
    }(objects.GameObject));
    objects.Reel = Reel;
})(objects || (objects = {}));
//# sourceMappingURL=Reel.js.map