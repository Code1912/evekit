/**
 * Author: Code1912  乁( ◔ ౪◔)「
 * Date  : 2016/10/3 (́>◞౪◟<‵)ﾉｼ
 */
export class  AlertInfo{
    id:number;
    title:string;
    type:AlertType;
    msg:string;
}
export  enum  AlertType{
    error=0,
    info=1,
    warning=2,
    success=3 
}