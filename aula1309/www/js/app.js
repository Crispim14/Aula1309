document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    let loading = false; 

    async function fetchPhotos() {
        const randomIds = Array.from({ length: 3 }, () => Math.floor(Math.random() * 49) + 1);
        const url = `https://jsonplaceholder.typicode.com/photos?id=${randomIds.join('&id=')}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            const photos = await response.json();
            console.log('Fotos carregadas:', photos); 
            return photos;
        } catch (error) {
            console.error('Erro ao buscar fotos:', error);
            return [];
        }
    }

    function checkImage(url, callback) {
        const img = new Image();
        img.src = url;
        img.onload = () => callback(true);
        img.onerror = () => callback(false);
    }

    function createCard(photo) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const img = document.createElement('img');
        checkImage(photo.thumbnailUrl, (isAvailable) => {
            if (isAvailable) {
                img.src = photo.thumbnailUrl;
            } else {
                img.src = 'https://via.placeholder.com/150/FF0000/FFFFFF?text=No+Image';
            }
        });
        img.alt = photo.title;
        
        const title = document.createElement('div');
        title.className = 'title';
        title.innerText = photo.title;
        
        card.appendChild(img);
        card.appendChild(title);
        
        cardContainer.appendChild(card);
    }

    // Função para carregar cards
    async function loadCards() {
        if (loading) return; // Evitar carregamento múltiplo simultâneo
        loading = true;
        try {
            const photos = await fetchPhotos();
            photos.forEach(photo => createCard(photo));
        } catch (error) {
            console.error("Erro ao carregar fotos:", error);
        } finally {
            loading = false;
        }
    }

    // Carregar os primeiros 3 cards
    loadCards();

    // Ouvinte de rolagem para carregar mais cards
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            loadCards();
        }
    });
});
