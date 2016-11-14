/**
 * Created by Code1912 on 2016/10/16.
 */
export  class  Cookie{

    public static getCookie(name: string): string  {
        if (Cookie.check(name)) {
            name = encodeURIComponent(name);
            let regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
            let result = regexp.exec(document.cookie);
            return decodeURIComponent(result[1]);
        } else {
            return '';
        }
    }
    public static clearCookie(name: string)  {
        if (Cookie.check(name)) {
            this.setCookie(name,null,-1);
        }
    }
    /**
     * Save the Cookie
     *
     * @param  {string} name Cookie's identification
     * @param  {string} value Cookie's value
     * @param  {number} expires Cookie's expiration date in days from now. If it's undefined the cookie is a session Cookie
     * @param  {string} path Path relative to the domain where the cookie should be avaiable. Default /
     * @param  {string} domain Domain where the cookie should be avaiable. Default current domain
     * @param  {boolean} secure If true, the cookie will only be available through a secured connection
     */
    public static setCookie(name: string, value: string, expires?: number, path?: string, domain?: string, secure?: boolean) {
        let cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

        if (expires) {
            let dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
            cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
        }
        if (path) {
            cookieStr += 'path=' + path + ';';
        }
        if (domain) {
            cookieStr += 'domain=' + domain + ';';
        }
        if (secure) {
            cookieStr += 'secure;';
        }
        // console.log(cookieStr);
        document.cookie = cookieStr;
    }

    private static check(name: string):boolean {
        let ret=document.cookie.indexOf(`${encodeURIComponent(name)}=`);
        return ret>-1;
    }
}