/**
 * Изменяет цвет кнопак на панели.
 * Делает визулаьно ее активной, когда открвается (нажимеается) какая либо кнопка.
 */
export const btnYourQuestMainWindowId = "btnYourQuestMainWindowId";
export const btnAnswerQuestMainWindowId = "btnAnswerQuestMainWindowId";
export const btnUserNameMainWindowId = "btnUserNameMainWindowId"

export function startSterilizationBtnActive(urlStr) {
    function initArrayBtnOnBarActonPanel() {
        let arrBtnId = [btnYourQuestMainWindowId, btnAnswerQuestMainWindowId, btnUserNameMainWindowId];
        return arrBtnId.map(btnId => {
            return document.getElementById(btnId);
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
    let curActionBtn = getBtnCurrentAction(arrBtnActions, urlStr)
    curActionBtn.style.color = color;
    arrBtnActions = arrBtnActions.filter(btnA => btnA !== curActionBtn) // удалю из массива кнопку текущей активности
    arrBtnActions.forEach(btnA => btnA.style.color = "black") // у хотябы у одного меняю цвет с синяго на белый
}



export function defineTotalCountPage(totalCount, limit) {
    return Math.ceil(totalCount / limit)
}
export const arrayRange = (start, stop, step) =>
    Array.from(
        {length: (stop - start) / step + 1},
        (value, index) => start + index * step
    );
export function getNumberPagesArray(total) {
    //https://www.freecodecamp.org/news/javascript-range-create-an-array-of-numbers-with-the-from-method/
    return arrayRange(1, total, 1)
}