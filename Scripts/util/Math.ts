module util
{
    export class Math
    {
        public static Clamp(value:number, min:number, max:number)
        {
            if (value < min)
            {
                value = min;
            }
            else if (value > max)
            {
                value = max;
            }
        
        return value;
        }

        public static Clamp01(value:number):number
        {
            if (value < 0.0)
            {
                return 0.0;
            }
        
            if (value > 1.0)
            {
                return 1.0;
            }
            
        return value;
        }

        public static Lerp(a:number, b:number, t:number):number
        {
            return a + (b - a) * Math.Clamp01(t);
        }

        public static LerpUnclamped(a:number, b:number, t:number):number
        {
            return a + (b - a) * t;
        }

        /* Utility function to check if a value falls within a range of bounds */
        public static CheckRange(value:number, lowerBounds:number, upperBounds:number) {
            if (value >= lowerBounds && value <= upperBounds)
            {
                return value;
            }
            else {
                return !value;
            }
        }        
    }
}