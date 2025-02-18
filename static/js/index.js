async function reading(event) {
    event.preventDefault();
    show_loader();

    const readingType = document.getElementById('readingType').value;

    const response = await fetch('/reading', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reading_type: readingType }),
    });

    const result = await response.json();

    if (result && result.questions_and_cards && result.questions_and_cards.length > 0) {
        const cardDisplay = document.getElementById('cardDisplay');
        cardDisplay.innerHTML = ''; 

        // Array para armazenar promessas de carregamento das imagens
        const imagePromises = [];

        result.questions_and_cards.forEach(pair => {
            const [question, card] = pair;

            const columnDiv = document.createElement('div');
            columnDiv.classList.add('column', 'is-one-quarter');

            const questionElement = document.createElement('h3');
            questionElement.textContent = question;
            questionElement.classList.add('has-text-centered', 'is-italic');
           
            const cardImage = document.createElement('img');
            const cardLink = document.createElement('a');
            cardImage.src = card.image_link;
            cardImage.alt = card.name;
            cardLink.href = card.link;
            cardImage.classList.add('card-image');
            cardLink.appendChild(cardImage);

            // Criar promessa para o carregamento da imagem
            const imageLoadPromise = new Promise((resolve) => {
                cardImage.onload = resolve;  // Resolve quando a imagem for carregada
                cardImage.onerror = resolve; // Resolve também se houver erro para evitar travamentos
            });

            imagePromises.push(imageLoadPromise); // Adicionar à lista de promessas

            const cardName = document.createElement('p');
            cardName.textContent = card.name;
            cardName.classList.add('has-text-centered', 'has-text-weight-bold');

            const cardDescription = document.createElement('p');
            cardDescription.textContent = card.description;
            cardDescription.classList.add('has-text-weight-light', 'has-text-centered');

            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card', 'card-hover');

            cardContainer.appendChild(questionElement);
            cardContainer.appendChild(cardLink);
            cardContainer.appendChild(cardName);
            cardContainer.appendChild(cardDescription);

            columnDiv.appendChild(cardContainer);
            cardDisplay.appendChild(columnDiv);
        });

        // Esperar todas as imagens carregarem antes de esconder o loader
        await Promise.all(imagePromises);
    }

    hide_loader();
}

function hide_loader() {
    const loader = document.getElementById('drawCardButton');
    loader.classList.remove('is-loading');
}

function show_loader() {
    const loader = document.getElementById('drawCardButton');
    loader.classList.add('is-loading');
}
