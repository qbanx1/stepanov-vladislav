'use strict';
// Variables Modal
let modalWindow = document.querySelector('.modal'),
    modalDaggerBtn = document.querySelector('.modal__dagger');

    // Variables modal form
let modalForm = document.querySelector('.modal__form');

    // Variables Array Contacts
let contactsArr = [];

    // Variables add Button
let addButton = document.querySelector('.footer__add-btn')
    
    // Variables parentClass, empty block and searching input
let blockContact = document.querySelector('.contacts__list'),
    searchInput = document.querySelector('.search');

    //Variables value from form
let nameForm = document.querySelector('#name'),
    phoneForm = document.querySelector('#phone'),
    favoriteCheckBox = document.querySelector('#checkbox');
    
    //Unique identifier for creating contact
let idContact = 0;

    // Clicks: "Open and Close modal"
    addButton.addEventListener('click', openModalWindow);
    modalDaggerBtn.addEventListener('click', closeModalWindow);

    
    // Submit form contact user
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        createContactList();
    });
    
    // Searching contact user
    searchInput.addEventListener('input', searchForContacts);
    
//                   Function: "Opening and Closing modal"

function closeModalWindow() {
    modalWindow.style.display ="none"
    document.body.style.background = "none";
    document.body.style.overflow = '';
}

function openModalWindow() {
    modalWindow.style.display = "block"
    document.body.style.background = "rgba(0,0,0,.2)";
    document.body.style.overflow = 'hidden';
}

//                           Checking the checkbox when creating
    let checkBox = 0;
    favoriteCheckBox.addEventListener('change', () => {
        favoriteCheckBox.checked ? checkBox = 1 : checkBox = 0;
    });

//                               Function: Searching

    function searchForContacts(){
        let checkingSearch = searchCheckInput(searchInput.value, 'search');
        let value = this.value.trim();
        let counter = contactsArr.length;
        if(checkingSearch && contactsArr.length > 1 && value !== ''){
            for (let i = 0; i < contactsArr.length; i++){
                let liBlock = "li[id='" + contactsArr[i][3] + "']";

                if (contactsArr[i][0].search(value) == -1){
                    document.querySelector(liBlock).style.display = "none";
                    counter--;
                }else {
                    document.querySelector(liBlock).style.display = "flex";
                }
            }

            if(counter == 0) {
                alert("Not found")
            }
        }else {
            for (let i = 0; i < contactsArr.length; i++){
                let liBlock = "li[id='" + contactsArr[i][3] + "']";
                document.querySelector(liBlock).style.display = "flex";
            }
        }
    }

//                               Function:       Checking the input mask

    function checkingInputMask(input, name) {
        let masks;

        (name == "phone") ? masks = /^\+7 \(\d\d\d\) \d\d\d-\d\d-\d\d$/ : 
        (name == "name" || name == "search") ? masks = /^[a-zA-Zа-яА-Я']{1,10}?$/ : false   
        
        let valid = masks.test(input);
        return valid;
    }

//                                Function:          Check

    function searchCheckInput(value, type) {
        if(type == "search" && value != "" && checkingInputMask(value, type)){           
            return true;
        }else {
            alert("ERRORS OR EMPTY STRING!");
            return false;
        }
    }

//                                  Function:       Sorting function

    function sortContacts() {

        let auxiliaryArray = new Array(); 

        for (let i = 0; i < contactsArr.length; i++){
            auxiliaryArray[i] = contactsArr[i][0];
        }

        auxiliaryArray.sort((a, b) => a.localeCompare(b));

        for (let i = 0; i < contactsArr.length; i++){
            for (let j = 0; j < auxiliaryArray.length; j++){
                if (contactsArr[i][0] == auxiliaryArray[j]) {
                    let k = contactsArr[j];
                    contactsArr[j] = contactsArr[i];
                    contactsArr[i] = k;
                }
            }
        }

        for (let i = 0; i < contactsArr.length; i++){
            for (let j = 0; j < contactsArr.length-1; j++){
                if (contactsArr[j][2] < contactsArr[j + 1][2]) {
                    let g = contactsArr[j];
                    contactsArr[j] = contactsArr[j + 1];
                    contactsArr[j + 1] = g;
                }
            }
        }
    }

//                                   Function: contact with the rendering map

    function outputContact() {
        blockContact.innerHTML = "";
    
        for (let i = 0; i < contactsArr.length; i++){
            let favoriteContact, idFavorite;
            if(contactsArr[i][2] > 0) {
                favoriteContact = "fav-2"
                idFavorite = contactsArr[i][3] 
            } else {
                favoriteContact = "fav"
                idFavorite = contactsArr[i][3]
            }
            blockContact.innerHTML += `
            <li id = ${contactsArr[i][3]} class="contacts__details flex">
                <img class="contacts__user" src="./img/user.svg" alt="user">
                <div class="contacts__dscr">
                    <h1 class="contacts__name">${contactsArr[i][0]}</h1>
                    <span class="contacts__phone">${contactsArr[i][1]}</span>
                </div>
                <div class="contacts__btns flex">
                    <button id = "${contactsArr[i][3]}" class="contacts__remove btn" onclick="deleteContact(this.id)"><img class="dagger-img" src="./img/dagger.svg" alt="cross"></button>
                    <button id = "${idFavorite}" class="contacts__fav btn" onclick="addFavContact(this.id)"><img class="fav-img" src="./img/${favoriteContact}.svg" alt="heart"></button>
                </div>
            </li>
            
            `;
        }
    }

//                                   Function: MaskInputPhone

    function MaskInputPhone() {
       function mask (event) {
            const keyCode = event.keyCode;
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5)  this.value = ""
        }
    
        phoneForm.addEventListener("input", mask, false);
        phoneForm.addEventListener("focus", mask, false);
        phoneForm.addEventListener("blur", mask, false);
        phoneForm.addEventListener("keydown", mask, false)
    }
    MaskInputPhone ();

    // Function: removeContactList
    function deleteContact(id_elem) {
        for (let i = 0; i < contactsArr.length; i++) {

            if(contactsArr[i][3] == id_elem) {
                contactsArr.splice(i, 1);
                outputContact();
            }
            if(contactsArr.length == 0) {
                blockContact.innerHTML = `            
                <li class="contacts__empty">
                    <span>You have no contact. Add it!</span>
                </li>`;
            }
        }

    }

    // Function: added favoriteContact
    function addFavContact(id_elem) {
        for (let i = 0; i < contactsArr.length; i++) {
            if(contactsArr[i][3] == id_elem) {
                if(contactsArr[i][2] == 0){
                    contactsArr[i][2] = 1;
                }else if(contactsArr[i][2] == 1){
                    contactsArr[i][2] = 0;
                }else {
                    alert("ERROR");
                }
            }
        }
        sortContacts();
        outputContact();
    }

// Function: AddContact
    function createContactList(){

        let nameСontactValue = nameForm.value,
            phoneСontactValue = phoneForm.value,
            checkСontactPhone, checkСontactName;

        if(nameСontactValue == '' && phoneСontactValue == '' || nameСontactValue.length < 3 || nameСontactValue.length > 10){
            alert("Error!")
            
        } else {
            checkСontactName = checkingInputMask(nameСontactValue, 'name');
            checkСontactPhone = checkingInputMask(phoneСontactValue, 'phone');
        }

        if(checkСontactName && checkСontactPhone){
            contactsArr.push([nameСontactValue, phoneСontactValue, checkBox, idContact++]);
            successResponse("Ура! Вы добавили контакт!")

            sortContacts();
            outputContact();
            document.querySelector('form').reset();
        } else {
            successResponse("Ошибка!")
        }
        
    }

// Function: "Answer user"

    function successResponse(mes) {
        
        const successModal = document.createElement('div');
        successModal.classList.add('modal__answer');
        successModal.innerHTML = `
            <div class="modal__success">
                <div class="modal__title">${mes}</div>
            </div>
        `;
        modalWindow.style.display ="none"
        document.querySelector('body').append(successModal);
        setTimeout(() => {
            successModal.remove();
            document.body.style.backgroundColor = "white"
        }, 1000)
    }
