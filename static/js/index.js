async function reading(event) {
    event.preventDefault();
    show_loader()
    const readingType = document.getElementById('readingType').value;

    const response = await fetch('/reading', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reading_type: readingType }),
    });

    const result = await response.json();

    // Verificar se "questions_and_cards" existe no resultado
    if (result && result.questions_and_cards && result.questions_and_cards.length > 0) {
        const cardDisplay = document.getElementById('cardDisplay');
        cardDisplay.innerHTML = ''; // Limpar o conteúdo anterior

        // Iterar sobre o array de perguntas e cartas
        result.questions_and_cards.forEach(pair => {
            const [question, card] = pair;

            // Criar uma coluna para cada carta
            const columnDiv = document.createElement('div');
            columnDiv.classList.add('column', 'is-one-quarter');

            // Criar o conteúdo da carta
            const questionElement = document.createElement('h3');
            questionElement.textContent = question;
            questionElement.classList.add('has-text-centered')

            const cardImage = document.createElement('img');
            const cardLink = document.createElement('a');
            cardImage.src = card.image_link;
            cardImage.alt = card.name;
            cardLink.href = card.link;
            cardImage.classList.add('card-image');
            cardLink.appendChild(cardImage); 

            const cardName = document.createElement('p');
            cardName.textContent = `${card.name}`;
            cardName.classList.add('has-text-centered')

            const cardDescription = document.createElement('p');
            cardDescription.textContent = `${card.description}`;
            cardDescription.classList.add('has-text-centered')

            // Criar um container de carta e adicionar os elementos
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card', 'card-hover'); // Adicionado para styling

            cardContainer.appendChild(questionElement);
            cardContainer.appendChild(cardLink);
            cardContainer.appendChild(cardName);
            cardContainer.appendChild(cardDescription);

            // Adicionar o container da carta à coluna
            columnDiv.appendChild(cardContainer);

            // Adicionar a coluna ao card display
            cardDisplay.appendChild(columnDiv);
        });
    }

    hide_loader()
}


function hide_loader() {
    const loader = document.getElementById('drawCardButton');
    loader.classList.remove('is-loading');
}

function show_loader() {
    const loader = document.getElementById('drawCardButton');
    loader.classList.add('is-loading');
}