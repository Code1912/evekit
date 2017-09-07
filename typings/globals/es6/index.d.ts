declare  interface  Date{
    addHours(h:number);
    addMinutes(m:number);
    format(str):string
}

declare interface String{
    trim();
}

declare interface   Array<T> {
    clear();
    removeByIndex(index:number);
    remove(fn:(t:T)=>boolean);
}