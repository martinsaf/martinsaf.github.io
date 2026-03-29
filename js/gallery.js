// ===== DADOS DAS IMAGENS POR CATEGORIA =====

const categoryImages = {
    "active-directory": [
        "AD-All-Employees-Properties.jpg",
        "ad-create-test-user.jpg",
        "dc-verify-computer-join.jpg",
        "gpo-verification-results-IT.jpg",
        "gpo-verification-results-Sales.jpg",
        "user-domain-verification.jpg",
        "user-test-connection-AD.jpg",
        "wazuh-agent-install-dc01.jpg",
        "wazuh-agents-dashboard.jpg",
        "wazuh-alert-user-created.jpg",
        "wazuh-custom-rules-directory.jpg",
        "wazuh-dc01-dashboard-details.jpg",
        "wazuh-ossec-conf-security-log.jpg"
    ],
    "linux": [
        "linux-domain-user-login.jpg"
    ]
};

// ===== VARIÁVEIS GLOBAIS =====
let currentImages = [];      // imagens da categoria atual
let currentIndex = 0;        // índice da imagem atual

// ===== FUNÇÕES DO LIGHTBOX COM SETAS =====
function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;
    updateLightboxImage();
    document.getElementById('lightbox').style.display = 'flex';
}

function updateLightboxImage() {
    const lightboxImg = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    lightboxImg.src = currentImages[currentIndex];
    if (counter) {
        counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    }
}

function nextImage() {
    if (currentIndex < currentImages.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;  // volta ao início
    }
    updateLightboxImage();
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = currentImages.length - 1;  // vai para o fim
    }
    updateLightboxImage();
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// ===== GERAR GALERIAS =====
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.doc-category').forEach(cat => {
        const category = cat.dataset.category;
        const imageNames = categoryImages[category];
        const gallery = cat.querySelector('.category-gallery');
        
        if (imageNames && imageNames.length > 0) {
            const imageUrls = imageNames.map(img => 
                `https://github.com/martinsaf/home-soc/raw/main/docs/${category}/imgs/${img}`
            );
            
            const VISIBLE_COUNT = 4;  // ← número de miniaturas visíveis
            const hasMore = imageUrls.length > VISIBLE_COUNT;
            
            // Cria miniaturas (só as primeiras VISIBLE_COUNT)
            imageUrls.slice(0, VISIBLE_COUNT).forEach((url, idx) => {
                const thumb = document.createElement('img');
                thumb.src = url;
                thumb.classList.add('gallery-thumb');
                thumb.onclick = () => openLightbox(imageUrls, idx);
                gallery.appendChild(thumb);
            });
            
            // Se houver mais imagens, adiciona botão "ver mais"
            if (hasMore) {
                const moreBtn = document.createElement('button');
                moreBtn.textContent = `+${imageUrls.length - VISIBLE_COUNT} more`;
                moreBtn.classList.add('gallery-more-btn');
                moreBtn.onclick = () => {
                    // Opção: abre lightbox na primeira imagem
                    openLightbox(imageUrls, 0);
                };
                gallery.appendChild(moreBtn);
            }
        } else {
            gallery.remove();
        }
    });
});

// ===== EVENTOS DO TECLADO =====
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});
