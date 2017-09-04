
interface JQueryStatic {

}
interface JQuery{

}
interface MessengerStatic extends  Function{
    ():MessengerStatic
    hideAll();
    post(...args):Messenger;
    options:any;
}
interface  Messenger{
    update(...args);
    hide();

}
interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64 {
    readonly  Messenger:MessengerStatic;
}

declare var Messenger: MessengerStatic;