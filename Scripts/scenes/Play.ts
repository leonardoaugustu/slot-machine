module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _plane?: objects.Plane;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            
            this._plane = new objects.Plane();
            
             this.Main();
        }        
        
        public Update(): void 
        {
           this._plane.Update();
        }
        
        public Main(): void 
        {
            this.addChild(this._plane);

        }

        
    }
}