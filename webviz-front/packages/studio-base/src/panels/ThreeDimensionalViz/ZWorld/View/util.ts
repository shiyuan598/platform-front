

const fpsStamps:Map<string,{stamp:number,count:number}> = new Map();
export const computFPS = (key:string)=>{
  const now = Date.now();
  const obj = fpsStamps.get(key)
  if(!obj){
    fpsStamps.set(key,{stamp:now,count:1})
  }else{
    let {stamp,count} = obj;
    count++;
    if((now-stamp)>1000){
      console.log(`${key} fps: ${count}`);
      stamp +=1000;
      count = 1;
    }
    fpsStamps.set(key,{stamp,count});
  }
}
