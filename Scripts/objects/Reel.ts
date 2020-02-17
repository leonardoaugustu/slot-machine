module objects
{
    export enum Symbol
    {
        EMPTY,
        BANANA,
        BAR,
        BELL,
        BLANK,
        CHERRY,
        GRAPES,
        ORANGE,
        SEVEN
    }

    export class Reel extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _symbol: Symbol;

        // PUBLIC PROPERTIES
        get symbol(): Symbol
        {
            return this._symbol;
        }

        set symbol(newSymbol: Symbol)
        {
            this._symbol = newSymbol;
        }

        // CONSTRUCTOR
        constructor(x:number = 0, y:number = 0, centered:boolean = false)
        {
            super(config.Game.ASSETS.getResult("empty"), x, y, centered);
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
        }        
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this._symbol = Symbol.EMPTY;
        }

        public Update(): void 
        {
            this.image = config.Game.ASSETS.getResult(objects.Symbol[this.symbol].toLowerCase()) as HTMLImageElement;
        }

        public Reset(): void 
        {
            this._symbol = Symbol.EMPTY;
        }
        
    }
}