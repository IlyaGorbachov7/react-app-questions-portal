export function login(e) {
    e.preventDefault()
    // логинимся и переходим на станцыу вопросов
}

export function registrat(e) {
    e.preventDefault();
    // регистируемя, после переходим на странцу лоигации
}

export function getConfirmationCode(e) {
    e.preventDefault();
    // здесь мы отпрялем запрос на получучения confirmation code
    // отпрвляю email

    // отсаемя на этой же станице и изменяем isSendEmail == true чтобы отобразить changePasswrod
}

export function changePassword(e) {
    e.preventDefault();

    //зесь отправляем запрос на иминенеия пороля.
    // отпавляюем confirmation code, new password, email

    // после отпрвяемся на станичу логинации сново
}