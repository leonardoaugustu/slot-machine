module objects
{
    export class Reel extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor(x:number = 0, y:number = 0, centered:boolean = false)
        {
            super(config.Game.ASSETS.getResult("emptyReel"), x, y, centered);
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
        }        
        
        // PUBLIC METHODS
        public Start(): void 
        {

        }

        public Update(): void 
        {

        }

        public Reset(): void 
        {

        }

        
    }
}