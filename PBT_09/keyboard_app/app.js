// --- Dữ liệu giả lập ---
const images = [
    { src: 'https://placehold.co/800x600?text=Góc+Lập+Trình+1', alt: 'Góc lập trình 1' },
    { src: 'https://placehold.co/800x600?text=Góc+Lập+Trình+2', alt: 'Góc lập trình 2' },
    { src: 'https://placehold.co/800x600?text=Bsun+Taichi+Switches', alt: 'Bsun Taichi Switches' },
    { src: 'https://placehold.co/800x600?text=Bàn+Phím+Cơ+Custom', alt: 'Bàn phím cơ Custom' },
    { src: 'https://placehold.co/800x600?text=Màn+Hình+Kép', alt: 'Màn hình kép' },
    { src: 'https://placehold.co/800x600?text=Laptop+Gaming', alt: 'Laptop Gaming' },
    { src: 'https://placehold.co/800x600?text=Chuột+Không+Dây', alt: 'Chuột không dây' },
    { src: 'https://placehold.co/800x600?text=Tai+Nghe', alt: 'Tai nghe' },
    { src: 'https://placehold.co/800x600?text=Mô+Hình+Trang+Trí', alt: 'Mô hình trang trí' }
];

const commands = [
    { id: 'theme-dark', label: 'Tắt đèn (Dark Theme)' },
    { id: 'theme-light', label: 'Bật đèn (Light Theme)' },
    { id: 'opt-ram', label: 'Giải phóng RAM' },
    { id: 'git-commit', label: 'Git: Tự động Commit' },
    { id: 'format-code', label: 'Format HTML/CSS/JS' }
];

// --- Trạng thái ---
let currentImageIndex = 0;
let isSlideshowPlaying = false;
let slideshowInterval = null;
let isGalleryOpen = false;
let isCmdOpen = false;
let previousActiveElement = null; // Lưu element bị mất focus để trả lại khi đóng modal

// --- DOM Elements ---
const galleryGrid = document.getElementById('gallery-grid');
const galleryModal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const slideshowStatus = document.getElementById('slideshow-status');
const cmdPalette = document.getElementById('cmd-palette');
const cmdInput = document.getElementById('cmd-input');
const cmdList = document.getElementById('cmd-list');

// --- 1. Khởi tạo UI ---
function init() {
    // Render Gallery
    images.forEach((img, index) => {
        const btn = document.createElement('button');
        btn.className = 'thumb-btn';
        btn.setAttribute('aria-label', `Xem ảnh ${index + 1}: ${img.alt}`);
        btn.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
        btn.addEventListener('click', () => openGallery(index));
        galleryGrid.appendChild(btn);
    });

    // Nút mở Command Palette
    document.getElementById('open-cmd-btn').addEventListener('click', openCmdPalette);
    
    // Nút điều hướng Gallery
    document.getElementById('close-gallery-btn').addEventListener('click', closeGallery);
    document.getElementById('prev-btn').addEventListener('click', prevImage);
    document.getElementById('next-btn').addEventListener('click', nextImage);
}

// --- 2. Logic Gallery ---
function openGallery(index) {
    previousActiveElement = document.activeElement; // Lưu lại vị trí focus hiện tại
    currentImageIndex = index;
    updateGalleryImage();
    galleryModal.classList.remove('hidden');
    isGalleryOpen = true;
    document.getElementById('next-btn').focus(); // Đưa focus vào nút Next
}

function closeGallery() {
    galleryModal.classList.add('hidden');
    isGalleryOpen = false;
    stopSlideshow();
    if (previousActiveElement) previousActiveElement.focus(); // Trả lại focus
}

function updateGalleryImage() {
    modalImg.src = images[currentImageIndex].src;
    modalImg.alt = images[currentImageIndex].alt;
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateGalleryImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateGalleryImage();
}

function toggleSlideshow() {
    isSlideshowPlaying = !isSlideshowPlaying;
    if (isSlideshowPlaying) {
        slideshowStatus.textContent = "▶ Đang tự động phát...";
        slideshowInterval = setInterval(nextImage, 2000);
    } else {
        stopSlideshow();
    }
}

function stopSlideshow() {
    isSlideshowPlaying = false;
    slideshowStatus.textContent = "";
    clearInterval(slideshowInterval);
}

// --- 3. Logic Command Palette ---
function openCmdPalette() {
    if(isGalleryOpen) return;
    previousActiveElement = document.activeElement;
    cmdPalette.classList.remove('hidden');
    isCmdOpen = true;
    cmdInput.value = '';
    renderCommands('');
    cmdInput.focus(); // Auto focus vào ô search
}

function closeCmdPalette() {
    cmdPalette.classList.add('hidden');
    isCmdOpen = false;
    if (previousActiveElement) previousActiveElement.focus();
}

function renderCommands(keyword) {
    cmdList.innerHTML = '';
    const filtered = commands.filter(c => c.label.toLowerCase().includes(keyword.toLowerCase()));
    
    filtered.forEach(cmd => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.className = 'cmd-item';
        btn.textContent = cmd.label;
        btn.setAttribute('role', 'option');
        
        btn.addEventListener('click', () => {
            alert(`Thực thi lệnh: ${cmd.label}`);
            closeCmdPalette();
        });
        
        li.appendChild(btn);
        cmdList.appendChild(li);
    });
}

cmdInput.addEventListener('input', (e) => renderCommands(e.target.value));

// --- 4. GLOBAL KEYBOARD NAVIGATION ---
document.addEventListener('keydown', (e) => {
    // 1. Phím tắt mở Command Palette (Ctrl+K)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); // Chặn hành vi search của trình duyệt
        isCmdOpen ? closeCmdPalette() : openCmdPalette();
        return;
    }

    // 2. Phím tắt cho Command Palette
    if (isCmdOpen) {
        if (e.key === 'Escape') closeCmdPalette();
        return;
    }

    // 3. Phím tắt cho Gallery
    if (isGalleryOpen) {
        if (e.key === 'Escape') closeGallery();
        else if (e.key === 'ArrowLeft') prevImage();
        else if (e.key === 'ArrowRight') nextImage();
        else if (e.key === ' ') {
            e.preventDefault(); // Chặn Space cuộn trang
            toggleSlideshow();
        }
        else if (e.key >= '1' && e.key <= '9') {
            const num = parseInt(e.key) - 1;
            if (num < images.length) {
                currentImageIndex = num;
                updateGalleryImage();
            }
        }
    }
});

// Chạy app
init();