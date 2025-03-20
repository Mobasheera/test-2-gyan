// Mock gift data
const mockGifts = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 14999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        description: "High-quality noise-cancelling headphones with premium sound",
        rating: 4.8,
        buyLink: "#",
        categories: ["tech", "audio", "premium"],
        tags: ["music", "gaming", "work"],
        ageGroup: ["teen", "adult"],
        gender: ["unisex"],
        occasions: ["birthday", "anniversary", "graduation"],
        interests: ["music", "tech", "gaming"],
        personality: ["tech-savvy", "music-lover"],
        features: ["noise-cancelling", "wireless", "bluetooth"],
        brand: "SoundMaster",
        stock: 15,
        discount: 10,
        reviews: 128
    },
    {
        id: 2,
        name: "Smart Watch Series 7",
        price: 24999,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80",
        description: "Advanced fitness tracking and smart features",
        rating: 4.9,
        buyLink: "#",
        categories: ["tech", "fitness", "premium"],
        tags: ["smartwatch", "fitness", "health"],
        ageGroup: ["adult"],
        gender: ["unisex"],
        occasions: ["birthday", "anniversary"],
        interests: ["fitness", "tech", "health"],
        personality: ["tech-savvy", "fitness-conscious"],
        features: ["wireless", "waterproof", "smart"],
        brand: "TechFit",
        stock: 8,
        discount: 15,
        reviews: 256
    },
    {
        id: 3,
        name: "Professional Art Set",
        price: 3499,
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80",
        description: "Complete art supplies set for creative minds",
        rating: 4.7,
        buyLink: "#",
        categories: ["art", "crafts", "creative"],
        tags: ["art", "drawing", "painting"],
        ageGroup: ["teen", "adult"],
        gender: ["unisex"],
        occasions: ["birthday", "graduation"],
        interests: ["art", "crafts", "creative"],
        personality: ["creative", "artistic"],
        features: ["portable", "complete-set"],
        brand: "ArtMaster",
        stock: 25,
        discount: 5,
        reviews: 89
    }
];

// Simple gift recommendation function
function getGiftRecommendations(preferences) {
    return mockGifts
        .map(gift => ({
            ...gift,
            score: calculateGiftScore(gift, preferences)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);
}

// Calculate score for a gift
function calculateGiftScore(gift, preferences) {
    let score = 0;

    // Price match (30% weight)
    if (preferences.budget) {
        const [min, max] = preferences.budget.split('-').map(Number);
        if (gift.price >= min && gift.price <= max) {
            score += 30;
        }
    }

    // Category match (20% weight)
    if (preferences.categories?.length) {
        const categoryMatches = gift.categories.filter(cat => 
            preferences.categories.includes(cat)
        ).length;
        score += (categoryMatches / gift.categories.length) * 20;
    }

    // Interest match (20% weight)
    if (preferences.interests?.length) {
        const interestMatches = gift.interests.filter(interest => 
            preferences.interests.includes(interest)
        ).length;
        score += (interestMatches / gift.interests.length) * 20;
    }

    // Occasion match (15% weight)
    if (preferences.occasion && gift.occasions.includes(preferences.occasion)) {
        score += 15;
    }

    // Rating bonus (15% weight)
    score += (gift.rating / 5) * 15;

    return score;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const giftForm = document.getElementById('giftForm');
    const resultsSection = document.getElementById('resultsSection');

    if (giftForm) {
        giftForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(giftForm);
            const preferences = {
                budget: formData.get('budget'),
                categories: formData.getAll('categories'),
                interests: formData.getAll('interests'),
                occasion: formData.get('occasion'),
                personality: formData.getAll('personality'),
                ageGroup: formData.get('ageGroup'),
                gender: formData.get('gender'),
                features: formData.getAll('features')
            };

            // Show loading state
            showLoadingState();

            // Get and display recommendations
            setTimeout(() => {
                const recommendations = getGiftRecommendations(preferences);
                displayResults(recommendations);
            }, 2000);
        });
    }

    // Chat elements
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const chatMessages = document.getElementById('chatMessages');
    const chatTextarea = document.getElementById('chatTextarea');
    const sendButton = document.getElementById('sendButton');
    const minimizeChatBtn = document.getElementById('minimizeChatBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    const chatNotification = document.getElementById('chatNotification');

    // Chat state
    let isMinimized = false;
    let isTyping = false;
    let typingTimeout;

    // Toggle chat window
    chatButton.addEventListener('click', () => {
        if (chatWindow.classList.contains('hidden')) {
            chatWindow.classList.remove('hidden');
            chatNotification.classList.remove('show');
            chatTextarea.focus();
        } else {
            chatWindow.classList.add('hidden');
        }
    });

    // Minimize chat
    minimizeChatBtn.addEventListener('click', () => {
        isMinimized = !isMinimized;
        chatWindow.classList.toggle('minimized');
        minimizeChatBtn.querySelector('i').classList.toggle('fa-minus');
        minimizeChatBtn.querySelector('i').classList.toggle('fa-plus');
    });

    // Close chat
    closeChatBtn.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        isMinimized = false;
        chatWindow.classList.remove('minimized');
        minimizeChatBtn.querySelector('i').classList.remove('fa-plus');
        minimizeChatBtn.querySelector('i').classList.add('fa-minus');
    });

    // Handle textarea input
    chatTextarea.addEventListener('input', () => {
        // Enable/disable send button based on input
        sendButton.disabled = !chatTextarea.value.trim();
        
        // Auto-resize textarea
        chatTextarea.style.height = 'auto';
        chatTextarea.style.height = Math.min(chatTextarea.scrollHeight, 120) + 'px';
    });

    // Handle enter key
    chatTextarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Send message
    sendButton.addEventListener('click', sendMessage);

    // Voice input
    document.getElementById('voiceInputBtn').addEventListener('click', startVoiceInput);

    // Image upload
    document.getElementById('imageUploadBtn').addEventListener('click', triggerImageUpload);

    // Emoji picker
    document.getElementById('emojiBtn').addEventListener('click', toggleEmojiPicker);

    // Handle suggestion buttons
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            chatTextarea.value = btn.textContent;
            sendMessage();
        });
    });
});

// Show loading state
function showLoadingState() {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.innerHTML = `
        <div class="loading-container">
            <div class="loading-content">
                <div class="robot-animation">
                    <i class="fas fa-robot"></i>
                    <div class="scan-line"></div>
                </div>
                <div class="loading-text">
                    <h3>Finding perfect gifts for you...</h3>
                </div>
            </div>
        </div>
    `;
}

// Display results
function displayResults(recommendations) {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.innerHTML = `
        <div class="results-header">
            <div class="results-title">
                <h2>Recommended Gifts</h2>
                <p>Found ${recommendations.length} perfect matches</p>
            </div>
        </div>
        <div class="gifts-grid" id="giftsGrid"></div>
    `;

    const giftsGrid = document.getElementById('giftsGrid');
    giftsGrid.innerHTML = recommendations.map((gift, index) => `
        <div class="gift-card" style="animation-delay: ${index * 0.2}s">
            <div class="gift-image">
                <img src="${gift.image}" alt="${gift.name}" loading="lazy">
                <div class="gift-badge">
                    <i class="fas fa-thumbs-up"></i> 
                    Match: ${Math.round(gift.score)}%
                </div>
                ${gift.discount ? `
                    <div class="discount-badge">
                        <i class="fas fa-tag"></i> ${gift.discount}% OFF
                    </div>
                ` : ''}
            </div>
            <div class="gift-card-content">
                <h3>${gift.name}</h3>
                <div class="rating">
                    ${'★'.repeat(Math.floor(gift.rating))}${'☆'.repeat(5-Math.floor(gift.rating))}
                    <span>${gift.rating} (${gift.reviews} reviews)</span>
                </div>
                <p class="gift-description">${gift.description}</p>
                <div class="gift-tags">
                    ${gift.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p class="price">
                    ${gift.discount ? `
                        <span class="original-price">₹${gift.price.toLocaleString('en-IN')}</span>
                        ₹${(gift.price * (1 - gift.discount/100)).toLocaleString('en-IN')}
                    ` : `₹${gift.price.toLocaleString('en-IN')}`}
                </p>
                <div class="gift-card-actions">
                    <button class="btn-primary" onclick="window.location.href='${gift.buyLink}'">
                        <i class="fas fa-shopping-cart"></i> Buy Now
                    </button>
                    <button class="btn-secondary wish-button" data-gift-id="${gift.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add wishlist functionality
    document.querySelectorAll('.wish-button').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('wished');
            this.querySelector('i').classList.toggle('fas');
            this.querySelector('i').classList.toggle('far');
        });
    });
}

// Send message function
function sendMessage() {
    const chatTextarea = document.getElementById('chatTextarea');
    const message = chatTextarea.value.trim();
    if (!message) return;

    // Add user message
    addMessage('user', message);
    chatTextarea.value = '';
    chatTextarea.style.height = 'auto';
    document.getElementById('sendButton').disabled = true;

    // Show typing indicator
    showTypingIndicator();

    // Simulate bot response
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addMessage('bot', botResponse);
        hideTypingIndicator();
    }, 1000 + Math.random() * 1000);
}

// Add message to chat
function addMessage(type, content) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    if (type === 'bot') {
        const avatar = document.createElement('div');
        avatar.className = 'bot-avatar-small';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        messageContent.appendChild(avatar);
    }
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = content;
    messageContent.appendChild(bubble);
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.classList.remove('hidden');
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.classList.add('hidden');
}

// Generate bot response
function generateBotResponse(message) {
    const responses = [
        "I understand you're looking for gift ideas. Could you tell me more about the person you're shopping for?",
        "That's interesting! What's your budget range for the gift?",
        "I can help you find the perfect gift. What occasion is this for?",
        "Let me suggest some great gift options based on your requirements.",
        "I have some excellent gift ideas that might work. Would you like to see them?",
        "I can help you narrow down the options. What are their main interests?",
        "I understand. Let me find some suitable gifts within your criteria.",
        "I have a few gift suggestions that might be perfect. Would you like to hear them?",
        "I can help you find something special. What's their age group?",
        "Let me help you find the ideal gift. What's their personality like?"
    ];

    // Simple keyword-based responses
    if (message.toLowerCase().includes('budget')) {
        return "What's your budget range for the gift? I can help you find options within your price range.";
    }
    if (message.toLowerCase().includes('occasion')) {
        return "What's the occasion? This will help me suggest more appropriate gifts.";
    }
    if (message.toLowerCase().includes('interest')) {
        return "What are their main interests? This will help me find more personalized gifts.";
    }
    if (message.toLowerCase().includes('age')) {
        return "What age group are you shopping for? This will help me suggest age-appropriate gifts.";
    }

    // Return random response if no keywords match
    return responses[Math.floor(Math.random() * responses.length)];
}

// Voice input functionality
function startVoiceInput() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            document.getElementById('chatTextarea').value = text;
        };
        
        recognition.start();
    } else {
        alert('Voice input is not supported in your browser.');
    }
}

// Image upload functionality
function triggerImageUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                addImageMessage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

// Add image message
function addImageMessage(src) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const image = document.createElement('img');
    image.src = src;
    image.className = 'message-image';
    image.style.maxWidth = '200px';
    image.style.borderRadius = '8px';
    
    messageContent.appendChild(image);
    messageDiv.appendChild(messageContent);
    document.getElementById('chatMessages').appendChild(messageDiv);
    
    // Scroll to bottom
    document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
}

// Emoji picker functionality
function toggleEmojiPicker() {
    // Implement emoji picker logic here
    alert('Emoji picker coming soon!');
}

// ... existing code for chat functionality and UI enhancements ... 