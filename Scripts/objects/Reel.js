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
    var Symbol;
    (function (Symbol) {
        Symbol[Symbol["EMPTY"] = 0] = "EMPTY";
        Symbol[Symbol["BANANA"] = 1] = "BANANA";
        Symbol[Symbol["BAR"] = 2] = "BAR";
        Symbol[Symbol["BELL"] = 3] = "BELL";
        Symbol[Symbol["BLANK"] = 4] = "BLANK";
        Symbol[Symbol["CHERRY"] = 5] = "CHERRY";
        Symbol[Symbol["GRAPES"] = 6] = "GRAPES";
        Symbol[Symbol["ORANGE"] = 7] = "ORANGE";
        Symbol[Symbol["SEVEN"] = 8] = "SEVEN";
    })(Symbol = objects.Symbol || (objects.Symbol = {}));
    var Reel = /** @class */ (function (_super) {
        __extends(Reel, _super);
        // CONSTRUCTOR
        function Reel(x, y, centered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (centered === void 0) { centered = false; }
            var _this = _super.call(this, config.Game.ASSETS.getResult("empty"), x, y, centered) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Reel.prototype, "symbol", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._symbol;
            },
            set: function (newSymbol) {
                this._symbol = newSymbol;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Reel.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        Reel.prototype.Start = function () {
            this._symbol = Symbol.EMPTY;
        };
        Reel.prototype.Update = function () {
            this.image = config.Game.ASSETS.getResult(objects.Symbol[this.symbol].toLowerCase());
        };
        Reel.prototype.Reset = function () {
            this._symbol = Symbol.EMPTY;
        };
        return Reel;
    }(objects.GameObject));
    objects.Reel = Reel;
})(objects || (objects = {}));
//# sourceMappingURL=Reel.js.map