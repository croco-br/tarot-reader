const tarotReadingMap = {
    'single': 1,                // Leitura Única: 1 card
    'three-card': 3,            // Leitura de Três Cartas: 3 cards
    'celtic-cross': 10,         // Cruz Celta: 10 cards
    'past-present-future': 3,    // Passado, Presente e Futuro: 3 cards
    'relationship': 5,          // Relacionamento: 5 cards
    'career': 5,                // Carreira: 5 cards
    'daily-card': 1,            // Carta do Dia: 1 card
    'horoscope': 1,             // Horóscopo: 1 card
    'decision': 2,              // Decisão: 2 cards
    'life-path': 7,             // Caminho de Vida: 7 cards
    'spiritual-guidance': 3     // Orientação Espiritual: 3 cards
};


async function draw_cards(event) {
    event.preventDefault();

    // Get the selected reading type from the dropdown
    const readingType = document.getElementById('readingType').value;
    
    // Determine the number of cards based on the selected reading type
    const quantity = tarotReadingMap[readingType] || 1; // Default to 1 card if type not found
    

    // Fetch cards from the server
    const response = await fetch('/get_cards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nums_cards: quantity }),
    });

    const result = await response.json();

    // Assuming result is an array of card objects
    if (result && result.length > 0) {
        const cardContainer = document.getElementById('tarotCard');
        cardContainer.innerHTML = ''; // Clear previous cards

        // Create a container for the cards
        const cardsWrapper = document.createElement('div');
        cardsWrapper.classList.add('cards-wrapper');

        // Display only the number of cards specified
        const cardsToShow = result.slice(0, quantity);

        // Iterate over the array of card objects
        cardsToShow.forEach(card => {
            const cardImage = document.createElement('img');
            const cardLink = document.createElement('a');

            cardImage.src = card.image_link;
            cardImage.alt = card.name;
            cardLink.href = card.link;
            cardImage.classList.add('card-image'); 
            cardLink.appendChild(cardImage);  // Wrap the image in the link
            cardsWrapper.appendChild(cardImage);
        });

        cardContainer.appendChild(cardsWrapper);
    }
}
