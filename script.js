// - Дана textarea.
//     В неё вводится текст.
//     Сделайте так, чтобы после захода на эту страницу через некоторое время, введенный текст остался в textarea.
// let form = document.forms.form;
// let textarea = form.textarea
// let textFromLocal = localStorage.getItem('textarea')
// if (textFromLocal) {
//     textarea.value = textFromLocal
// }
// textarea.oninput = () => {
//     localStorage.setItem('textarea', textarea.value)
// };
// - Дана форма с инпутами, текстареа, чекбоксами, радио кнопочками, селектами и тп.
//     Пользователь вводит какие-то данные и закрывает страницу (не факт, что он заполнил всю форму).
// Сделайте так, чтобы при следующем заходе на страницу введенные им ранее данные стояли на своих местах.
//     Сделайте ваш скрипт как можно более универсальным.
// let form = document.forms.formFeatures
// let formObj = JSON.parse(localStorage.getItem('formFeatures'))
// for (const key in formObj) {
//     if (form[key].getAttribute('type') === 'radio' || form[key].getAttribute('type') === 'checkbox') {
//         form[key].checked = formObj[key]
//     } else {
//         form[key].value = formObj[key]
//     }
// }
// let object = {}
// form.oninput = () => {
//     for (const formElement of form.children) {
//         if (formElement.getAttribute('type') === 'radio' || formElement.getAttribute('type') === 'checkbox') {
//             object[formElement.getAttribute('name')] = formElement.checked;
//         } else {
//             object[formElement.getAttribute('name')] = formElement.value;
//         }
//     }
//     localStorage.setItem("formFeatures", JSON.stringify(object))
// }


// -Дан текстареа. В него можно ввести данные, нажать кнопку "сохранить" и они "фикисруются" (в хранилище), затем поредактировать их, затем еще поредактировать и возможно еще.....
// Требование : хранить историю своих изменений (даже после перезагрузки страницы).
// Сверху над текстареа должны появится стрелочки, с помощью которых можно перемещаться по истории (не забудьте!чекпоинт истории - нажатеи кнопки сохранить).
// let form = document.forms['third-form']
// let textarea = form['textarea-3']
// let buttonSave = document.getElementById('save')
// let buttonNext = document.createElement('button')
// buttonNext.innerText = 'next'
// let buttonPrev = document.createElement('button')
// buttonPrev.innerText = 'prev'
// document.body.append(buttonNext, buttonPrev)
//
// let array = []
// let arrayFromLocal
// let current
// buttonSave.addEventListener('click', () => {
//     array.push(textarea.value)
//     localStorage.setItem('arrayHistory', JSON.stringify(array))
//     console.log(array)
// })
// buttonNext.onclick = () => {
//     arrayFromLocal = JSON.parse(localStorage.getItem('arrayHistory'))
//     current = current === undefined ? arrayFromLocal.length - 1 : current
//     textarea.value = current === arrayFromLocal.length - 1 ? textarea.value : arrayFromLocal[++current]
// }
// buttonPrev.onclick = () => {
//     arrayFromLocal = JSON.parse(localStorage.getItem('arrayHistory'))
//     current = current === undefined ? arrayFromLocal.length - 1 : current
//     textarea.value = current === 0 ? textarea.value : arrayFromLocal[--current]
// }



// - Реализуйте записную книгу, хранящую данные в локальном хранилище.
//     Данные которые надо сохранять : ФИО, номер, почта, фирма, отдел, день рождения
// Данные вводить через соответсвующую форму.
// --Каждому контакту добавить кнопку для удаления контакта.
// --Каждому контакту добавить кнопку редактироваиня. При нажати на нее появляется форма, в которой есть все необходимые инпуты для редактирования, которые уже заполнены данными объекта
class User {
    constructor(name, number, email, company, department, birthday) {
        this.name = name
        this.number = number
        this.email = email
        this.company = company
        this.department = department
        this.birthday = birthday
    }
}
let formWritingBook = document.forms['writing-book']
let editForm = formWritingBook.cloneNode(3)
let addUser = document.getElementById('add-user')
let showUsers = document.getElementById('show-users')
let users = []
addUser.onclick = () => {
    let filled = true
    for (let i = 0; i < formWritingBook.length - 1; i++) {
        if (formWritingBook[i].value === '') {
            formWritingBook.innerHTML += 'Please fill all the fields of the form'
            filled = false
            break
        }
    }
    if (filled) {
        let user = new User(formWritingBook.name.value, formWritingBook.number.value,
            formWritingBook.email.value, formWritingBook.company.value, formWritingBook.department.value,
            formWritingBook.birthday.value)
        users.push(user)
        localStorage.setItem('users', JSON.stringify(users))
    }
}
showUsers.onclick = () => {
    users = JSON.parse(localStorage.getItem('users'))
    for (let i = 0; i < users.length; i++) {
        let userElement = document.createElement('div')
        userElement.classList.add('user')
        for (const userKey in users[i]) {
            let valueElement = document.createElement('div')
            valueElement.innerText = users[i][userKey]
            userElement.appendChild(valueElement)
        }

        let deleteButton = document.createElement('button')
        deleteButton.innerText = "Delete user"
        deleteButton.onclick = () => {
            userElement.remove()
            users.splice(i, 1)
            console.log(i)
            console.log(users)
            localStorage.setItem('users', JSON.stringify(users))
        }
        userElement.appendChild(deleteButton)

        let editButton = document.createElement('button')
        editButton.innerText = "Edit user"
        editButton.onclick = () => {
            let clonedForm = formWritingBook.cloneNode(3)
            let keys = Object.keys(users[i])
            for (let j = 0; j < clonedForm.length; j++) {
                clonedForm[j].value = users[i][keys[j]]
            }

            let confirm = document.createElement('button')
            confirm.innerText = 'confirm'
            confirm.onclick = () => {
                for (let k = 0; k < clonedForm.length; k++) {
                    users[i][keys[k]] = clonedForm[k].value
                }
                console.log(users)
                localStorage.setItem('users', JSON.stringify(users))
            }
            clonedForm.appendChild(confirm)
            userElement.appendChild(clonedForm)
        }
        userElement.appendChild(editButton)

        document.getElementsByClassName('users')[0].appendChild(userElement)
    }

}



