export const btnGroupClick = (e) => {
    // sterilizationBtnActive(e)

}

function sterilizationBtnActive(e) {
    // console.log(e.target)
    let btnClick = e.target;
    let baseURI = btnClick.baseURI;
    console.log(baseURI)
    let color = "dodgerblue";

    if (btnClick.id === "btnEditProfileMainWindowId" || btnClick.id === "btnLogOutMainWindowId" || btnClick.id === "btnDeleteProfileMainWindowId") {
        console.log(    document.getElementById("btnGroupMainWindowId"))
        document.getElementById("btnGroupMainWindowId").style.color = color;
    } else {
        btnClick.style.color = color;
    }
    btnClick.style.fontWeight = 600;

}

function startSterilizationBtnActive(url) {
    // console.log(e.target)

}