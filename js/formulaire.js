
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
    document.getElementById('form').querySelectorAll('input[required],textarea[required],select[required]',).forEach(function (input) {
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
        
    })

    // Validation de l'email
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

// Fonction pour afficher un message d'erreur sous un champ
function afficherErreur(input, message) {
    let parentDiv = input.closest('div');
    parentDiv.classList.add('error');
    let div = document.createElement('div');
    div.textContent = message;
    div.classList.add('error-message');
    parentDiv.appendChild(div);
}
// Si message à afficher au-dessus remplacer appendChild par prepend


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

// Burger menu ouvrir et ferme le menu 

document.getElementById('iconBurger').addEventListener('click', function() {
    document.querySelector('.burgerMenu').classList.add('active')
})

document.querySelector('.fermerBurger').addEventListener('click', function() {
    document.querySelector('.burgerMenu').classList.remove('active')
})





