import React from "@types/react";

export function prepareHtmlMsgErrorNoMatchesPassword() {
    return <span>Confirm password don't matches your password.</span>;
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
export function prepareHtmlRequestMsgError(errorDataRequest) {
    return Object.entries(errorDataRequest)
        .map(([key, value]) => {
            return (<div key={key} className="d-flex mb-2 list-group list-group-horizontal">
                <div className="list-group-item">{key}</div>
                <div className="flex-grow-1 list-group-item">{value}</div>
            </div>)
        });
}