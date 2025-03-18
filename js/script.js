// Variables des modales
let modal = document.getElementById("modal");
let buttonDisplayModal = document.getElementById("displayModal");
let buttonCloseModal = document.getElementById("closeModal");
let backModal = document.getElementById("backModal");
let modalPassword = document.getElementById("passwordModal");
let passwordHelp = document.getElementById("passwordHelp");
let closePasswordModal = document.getElementById("closeModal1");
let pseudoVerif = document.getElementById('pseudo');

// Afficher la modale des critéres du mot de passe quand on clique sur le point d'interrogation
passwordHelp.addEventListener("click", function () {
    modalPassword.style.display = "block";
});

// Fermer la modale des critéres du mot de passe quand on clique sur la croix (×)
closePasswordModal.addEventListener("click", function () {
    modalPassword.style.display = "none";
});

// Fermer la modale si l'utilisateur clique à l'extérieur de la fenêtre modale
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Afficher le modal principal
buttonDisplayModal.addEventListener("click", function () {
    modal.style.display = "flex";
    document.querySelector("#modal>div").focus();
});

// Fermer le modal principal
buttonCloseModal.addEventListener("click", function () {
    modal.style.display = "none";
});

// Focus sur la div à l'intérieur du modal lorsque l'élément de modal est cliqué
buttonDisplayModal.addEventListener("focus", function () {
    document.querySelector("#modal>div").focus();
});

// Fonction de soumission du formulaire
function formSubmit(e) {

    let allValid = true;

    // Suppression des erreurs existantes
    document.getElementById('form').querySelectorAll('.error').forEach(function (divError) {
        divError.classList.remove("error");
        let errorDiv = divError.querySelector('div.error-message');
        if (errorDiv) {
            divError.removeChild(errorDiv);
        }
    });

    // Vérification des champs requis
    document.getElementById('form').querySelectorAll('input[required],textarea[required],select[required]').forEach(function (input) {
        if (input.value.trim() === '') {
            afficherErreur(input, "Attention, le champ est obligatoire");
            allValid = false;
        }
    });

    // Vérification de la checkbox
    document.getElementById('form').querySelectorAll('input[type="checkbox"]').forEach(function (input) {
        if (!input.checked) {
            afficherErreur(input, "Merci de cocher la case pour accepter les conditions");
            allValid = false;
        }
    });

    // document.getElementById('pseudo').addEventListener('keyup', function () {
    //     let formData = new FormData();
    //     formData.append('pseudo', this.value);
    //     fetch('checkPseudo.php', {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(response => response.text())
    //         .then(data => {
    //             if (data == "non") {
    //                 if (!pseudoVerif.classList.contains("error")) {
    //                     pseudoVerif.classList.add("error");
    //                     let div = document.createElement("div");
    //                     let text = document.createTextNode("Pseudo déjà pris");
    //                     div.appendChild(text);
    //                     pseudoVerif.closest("div").appendChild(div);
    //                     allValid = false;
    //                 }
    //             }
    //         });
    // Vérification du pseudo
    let pseudo = document.getElementById('pseudo');
    if (pseudo.value.trim()) {
        afficherErreur(pseudo, "Le pseudo n'est pas valide");
        allValid = false;
    }

    // Vérification du numéro de téléphone
    let phone = document.getElementById('phone');
    if (phone) {
        if (!validatePhoneNumber(phone.value.trim())) {
            afficherErreur(phone, "Le numéro de téléphone n'est pas valide");
            allValid = false;
        } else {
            // Supprimer l'erreur si le numéro est valide
            let parentDiv = phone.closest('div');
            if (parentDiv.classList.contains('error')) {
                parentDiv.classList.remove('error');
                let errorDiv = parentDiv.querySelector('div.error-message');
                if (errorDiv) {
                    parentDiv.removeChild(errorDiv);
                }
            }
        }
    }
    // Vérification de l'email
    let inputMail = document.getElementById('email');
    if (inputMail.value.trim() !== '') {
        const regexMail = /^[A-Za-z0-9.\-_+]+@[A-Za-z0-9.\-]+\.[A-Za-z0-9]{2,}$/i;
        if (!regexMail.test(inputMail.value)) {
            afficherErreur(inputMail, "L'adresse mail n'est pas valide (ex: dupont@ex.com)");
            allValid = false;
        }
    }

    // Validation du mot de passe
    let inputPassword = document.getElementById('mot_de_passe');
    if (inputPassword.value.trim() !== '') {
        const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;
        if (!regexPassword.test(inputPassword.value)) {
            afficherErreur(inputPassword, "Le mot de passe ne respecte pas les critères.");
            allValid = false;
        }
    }
    // window.togglePassword = function () {
    //     let passwordInput = document.getElementById("mot_de_passe");
    //     passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    // };

    // Vérification de la correspondance des mots de passe
    let confirmPassword = document.getElementById('confirme_mot_de_passe');
    if (confirmPassword.value.trim() !== inputPassword.value.trim()) {
        afficherErreur(confirmPassword, "Les mots de passe ne correspondent pas.");
        allValid = false;
    }

    // Empêcher la soumission si des erreurs existent
    if (!allValid) {
        e.preventDefault();
    }
}
function afficherErreur(element, message) {
    let parentDiv = element.closest('div');
    if (!parentDiv.classList.contains('error')) {
        parentDiv.classList.add('error');
        let errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.innerText = message;
        parentDiv.appendChild(errorDiv);
    }
}

// Vérification en direct des critères du mot de passe
document.getElementById('mot_de_passe').addEventListener('input', function () {
    let password = this.value;

    // Fonction pour mettre à jour les critères avec une icône rouge ❌ ou verte ✅
    function updateCriteria(id, condition) {
        let element = document.getElementById(id);
        if (condition) {
            element.style.color = "green";
            element.innerText = "✅ " + element.innerText.slice(2); // Remplace ❌ par ✅
        } else {
            element.style.color = "red";
            element.innerText = "❌ " + element.innerText.slice(2); // Remet ❌ si la condition est fausse
        }
    }

    updateCriteria('length', password.length >= 8);
    updateCriteria('uppercase', /[A-Z]/.test(password));
    updateCriteria('lowercase', /[a-z]/.test(password));
    updateCriteria('number', /[0-9]/.test(password));
    updateCriteria('special', /[#?!@$%^&*-]/.test(password));
});

// Ajout des écouteurs d'événements
document.getElementById('form').addEventListener('submit', formSubmit);
document.getElementById('btn').addEventListener('click', formSubmit);

// Burger menu ouvrir et fermer le menu
document.getElementById('iconBurger').addEventListener('click', function () {
    document.querySelector('.burgerMenu').classList.add('active');
});

document.querySelector('.fermerBurger').addEventListener('click', function () {
    document.querySelector('.burgerMenu').classList.remove('active');
});

// Fonction de validation du numéro de téléphone
function validatePhoneNumber(phoneNumber) {
    const regex = /^\+33\d{9}$/;
    return regex.test(phoneNumber);
}
