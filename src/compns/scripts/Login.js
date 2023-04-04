/**
 * Login component
 */
export function login(e) {
    e.preventDefault()
    // логинимся и переходим на станцыу вопросов
}

/**
 * Registration component
 */
export function registrat(e) {
    e.preventDefault();
    // регистируемя, после переходим на странцу лоигации
}

/**
 * ForgetPassword component
 */
export function getConfirmationCode(e) {
    e.preventDefault();
    // здесь мы отпрялем запрос на получучения confirmation code
    // отпрвляю email

    // отсаемя на этой же станице и изменяем isSendEmail == true чтобы отобразить changePasswrod
}

/**
 * ForgetPassword component
 */
export function changePassword(e) {
    e.preventDefault();

    //зесь отправляем запрос на иминенеия пороля.
    // отпавляюем confirmation code, new password, email

    // после отпрвяемся на станичу логинации сново
}

/**
 * DeleteProfile component
 */
export function deleteProfile(e) {

}

/**
 * EditProfile component
 */
export function editProfile(e){

}