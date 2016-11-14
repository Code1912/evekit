/**
 * Created by Code1912 on 2016/10/1.
 */
import  {Subject } from "rxjs"

export  interface  SourceLoader{
    load(url:string):Promise<boolean>
}