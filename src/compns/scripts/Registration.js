import React from "react";

export function prepareHtmlMsgErrorNoMatchesPassword() {
    return <span>Confirm password don't matches your password.</span>;
}

export function prepareHtmlMsgErrorTokenTimeExpired(){
    return <span>The life of the token has expired. Please log in again.</span>;
}
/**
 * email: "Value this field  should be email\nExample of valid email id\n    mysite@ourearth.com</i>\n    my.ownsite@ourearth.org</i>\n    mysite@you.me.net</i>"
 * <p>
 * firstName: "Fields don't should be blank"
 * <p>
 * lastName: "Fields don't should be blank"
 * <p>
 * password: "Fields don't should be blank"
 * <p>
 * phone: "Fields don't should be blank"
 */
export function prepareHtmlRequestMsg(errorDataRequest) {
    return (<div className=""> {Object.entries(errorDataRequest)
        .map(([key, value]) => {
            return (<div key={key} className="d-flex mb-2 list-group list-group-horizontal">
                <div className="col m-0 col-md-3 list-group-item">{key}</div>
                <div className="col m-0  list-group-item">{value}</div>
            </div>)
        })}
    </div>)
}
