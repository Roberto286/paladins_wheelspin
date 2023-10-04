export const numberOfSlices = 8;
export const wheelRadius = 360;
export const sliceSize =  45;

export const createDynamicObject = (numProperties: number) =>{
    let o = Object.fromEntries(Array.from({ length: numProperties }, (_, i) => [i+ 1,  numProperties - i]));
    console.log(o);
    return o;
    

}

type DynamicObject = { [key: number]: any };
export const prizeDisplay = (actualDeg:number,sliceSize:number,obj:DynamicObject) => { 
    
    const positionInTheWheel = Math.ceil(actualDeg / sliceSize) 
    console.log(actualDeg);
    
    console.log(positionInTheWheel);
    
    return obj[positionInTheWheel];

}