document.addEventListener("DOMContentLoaded", function () {
/*
Source: ChatGPT
Prompt: I have a website, where on the right side of the page there are text boxes labeled mõiste and vastus, depending on the number of filled boxes on the right side of the page, i need to add a big flashcard on the left. the flashcard should display mõiste 1 and when you click it it should display vastus 1. Also add buttons under it, which would switch to the next flashcard with vastus 2 and mõiste 2 and so on.

*/
    
    // Kogub kokku kõik mõisted ja vastused
    const mõisteInputs = document.querySelectorAll('.mõiste');
    const vastusInputs = document.querySelectorAll('.vastus');
    let currentIndex = 0;
    let showingMõiste = true;

    const flashcards = [];

    // Tekitab uued flashcardid
    function updateFlashcards() {
        flashcards.length = 0;
        for (let i = 0; i < mõisteInputs.length; i++) {
            if (mõisteInputs[i].value.trim() !== "" && vastusInputs[i].value.trim() !== "") {
                flashcards.push({
                    mõiste: mõisteInputs[i].value,
                    vastus: vastusInputs[i].value
                });
            }
        }
    }

    // Näitab flashcardi
    function displayFlashcard() {
        const flashcardElement = document.getElementById("flashcard");
        if (flashcards.length > 0) {
            const currentCard = showingMõiste ? flashcards[currentIndex].mõiste : flashcards[currentIndex].vastus;
            flashcardElement.innerHTML = "";

            // Kui Mõiste või vastus on pilt, siis kuvab selle pildina
            const isImage = currentCard.match(/\.(jpeg|jpg|gif|png)$/i);
            if (isImage) {
                const imgElement = document.createElement("img");
                imgElement.src = currentCard;
                imgElement.alt = "Flashcard image";
                imgElement.style.maxWidth = "100%";
                imgElement.style.maxHeight = "100%";
                imgElement.style.objectFit = "contain";
                flashcardElement.appendChild(imgElement);
            } else {
                flashcardElement.innerText = currentCard;
            }
        } else {
            flashcardElement.innerText = "Lisa mõistekaarte!"; // Kui ei ole veel mõisteid lisatud
        }
    }

    // Kui vajutad flashcardi peale vahetab mõiste/vastus
    document.getElementById("flashcard").addEventListener("click", function () {
        if (flashcards.length > 0) {
            showingMõiste = !showingMõiste;
            displayFlashcard();
        }
    });

    // Kui vajutad nuppu näitab järgmist flashcardi
    document.getElementById("järgmine").addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % flashcards.length;
        showingMõiste = true;
        displayFlashcard();
    });

    // Salvestab mõisted
    function saveToLocalStorage() {
        const data = {
            mõiste: Array.from(mõisteInputs).map(input => input.value),
            vastus: Array.from(vastusInputs).map(input => input.value)
        };
        localStorage.setItem('flashcardData', JSON.stringify(data));
    }

    // Laeb Lokaalsest mälust mõisted
    function loadFromLocalStorage() {
        const savedData = localStorage.getItem('flashcardData');
        if (savedData) {
            const data = JSON.parse(savedData);
            mõisteInputs.forEach((input, index) => {
                if (data.mõiste[index]) input.value = data.mõiste[index];
            });
            vastusInputs.forEach((input, index) => {
                if (data.vastus[index]) input.value = data.vastus[index];
            });
        }
    }

    // Kustutab kõik mõisted ekraanilt ning lokaalsest mälust
    function clearAllData() {
        mõisteInputs.forEach(input => input.value = "");
        vastusInputs.forEach(input => input.value = "");
        localStorage.removeItem('flashcardData');
    }

    // Veebilehe laadimisel laeb kõik mälus olevad flashcardid
    loadFromLocalStorage();
    updateFlashcards();
    displayFlashcard();

    // Kui kirjutad mõistet või vastust läheb automaatselt flashcardi
    for (let input of mõisteInputs) {
        input.addEventListener('input', function() {
            updateFlashcards();
            saveToLocalStorage();
            displayFlashcard();
        });
    }
    for (let input of vastusInputs) {
        input.addEventListener('input', function() {
            updateFlashcards();
            saveToLocalStorage();
            displayFlashcard();
        });
    }

    // Kastide tühjendamise nupp
    document.getElementById("tühjenda").addEventListener("click", function() {
        clearAllData();
        updateFlashcards();
        displayFlashcard();
    });
});