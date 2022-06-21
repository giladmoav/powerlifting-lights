/**
 * Sets a cookie
 * 
 * @param {String} cname CookieName
 * @param {any} cvalue Cookie value
 * @param {int} exdays The numbre of days until the cookie should expire
 */
export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";SameSite=lax;path=/";
}


/**
* Gets a cookie.
* 
* @param {String} cname Cookie name
* @returns The cookie value
*/
export const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Deletes a cookie.
 * 
 * @param {String} cname cookie name
 */
export const deleteCookie = (cname) => {
    document.cookie = cname + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
