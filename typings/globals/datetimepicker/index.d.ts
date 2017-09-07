
interface DateTimePicker{
    setLocale(lang:string):void;
}
interface JQueryStatic{
    datetimepicker:DateTimePicker

}

interface JQuery{
    datetimepicker(opitons?:any);
}