/**
 * Здесь нужно в зависимости от кномпи ПЕРЕНАПРАВИТЬ на другой компанент
 */
export const btnGroupClick = (e) => {

}

/**
 * Изменяет цвет кнопак на панели.
 * Делает визулаьно ее активной, когда открвается (нажимеается) какая либо кнопка.
 */
export const btnYourQuestMainWindowId = "btnYourQuestMainWindowId";
export const btnAnswerQuestMainWindowId = "btnAnswerQuestMainWindowId";
export const btnUserNameMainWindowId = "btnUserNameMainWindowId"

export function startSterilizationBtnActive(urlStr) {
    function initArrayBtnOnBarActonPanel() {
        debugger
        let arrBtnId = [btnYourQuestMainWindowId, btnAnswerQuestMainWindowId, btnUserNameMainWindowId];
        debugger
        return arrBtnId.map(btnId => {
            const btn = document.getElementById(btnId);
            debugger
            console.log(btn)
            debugger
            return btn;
        })
    }

    function getBtnCurrentAction(arrBtnActions, url) {
        let btnAction;
        if (url === "/questions/your") {
            btnAction = arrBtnActions.find(btnA => btnA.id === btnYourQuestMainWindowId)
        } else if (url === "/questions/answer") {
            btnAction = arrBtnActions.find(btnA => btnA.id === btnAnswerQuestMainWindowId)
        } else if (url === "/profile/edit" || url === "/profile/delete") {
            btnAction = arrBtnActions.find(btnA => btnA.id === btnUserNameMainWindowId)
        }
        return btnAction;
    }

    console.log(urlStr)
    let color = "dodgerblue";
    let arrBtnActions = initArrayBtnOnBarActonPanel();
    debugger
    let curActionBtn = getBtnCurrentAction(arrBtnActions, urlStr)
    debugger
    curActionBtn.style.color = color;
    arrBtnActions = arrBtnActions.filter(btnA => btnA !== curActionBtn) // удалю из массива кнопку текущей активности
    arrBtnActions.forEach(btnA => btnA.style.color = "black") // у хотябы у одного меняю цвет с синяго на белый
}