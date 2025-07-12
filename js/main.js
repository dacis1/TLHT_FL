// Handle navigation item clicks
const navItems = document.querySelectorAll('.main-nav li');
navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Handle clicks for "Mục lục", "Giới thiệu", "Kỹ năng", and "Kinh nghiệm làm việc"
        if (index <= 3) {
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            // Navigate to corresponding page
            let pageId = '';
            if (index === 0) pageId = 'page1';
            else if (index === 1) pageId = 'page2';
            else if (index === 2) pageId = 'page3';
            else if (index === 3) pageId = 'page4';
            window.location.hash = pageId;
        }
    });
});

let typingTimer = null; // global timer variable to clear previous typing animation

// Typing animation function
function typeText(element, text, duration) {
    if (typingTimer) {
        clearInterval(typingTimer);
        typingTimer = null;
    }
    element.textContent = '';
    const length = text.length;
    const interval = duration / length;
    let index = 0;
    typingTimer = setInterval(() => {
        element.textContent += text.charAt(index);
        index++;
        if (index === length) {
            clearInterval(typingTimer);
            typingTimer = null;
        }
    }, interval);
}

// Handle page navigation
const pages = document.querySelectorAll('.page');

function navigateToPage(pageId) {
    console.log('navigateToPage called with:', pageId);
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Show main header on all pages including page0
    const mainHeader = document.querySelector('.main-header');
    mainHeader.style.display = 'flex';
    mainHeader.classList.add('fade-in');

    // Trigger skill animations if page3 is activated
    if (pageId === 'page3') {
        triggerSkillAnimations();
    }

    // Trigger typing animation if page2 is activated
    if (pageId === 'page2') {
        const p = targetPage.querySelector('p');
        if (p) {
            const fullText = "Là một Gen Z đam mê truyền thông, đang tìm hiểu chính mình giữa thế giới sáng tạo rộng lớn – không ngừng học hỏi, thử nghiệm và trưởng thành qua từng câu chữ, từng chiến dịch và những lần dám bước ra khỏi vùng an toàn. Tôi từng đảm nhiệm nhiều vai trò như quản lý fanpage, viết nội dung, thiết kế cơ bản và triển khai chiến dịch đa kênh.\n\nVới tôi, truyền thông không chỉ là truyền tải thông điệp, mà là xây dựng sự kết nối thực sự giữa thương hiệu và cộng đồng. Một chiến dịch không cần ồn ào, nhưng phải đúng người, đúng thời điểm và đủ sâu để được nhớ đến.";
            typeText(p, fullText, 2500);
        }
    }

}

window.addEventListener('hashchange', () => {
    console.log('hashchange event fired, new hash:', window.location.hash);
    const pageId = window.location.hash.slice(1) || 'page0';
    navigateToPage(pageId);
});

// Listen for hash changes
window.addEventListener('hashchange', () => {
    const pageId = window.location.hash.slice(1) || 'page0';
    navigateToPage(pageId);
});

// Initial page load
window.addEventListener('load', () => {
    // Always start with page0 if no hash is present
    if (!window.location.hash) {
        navigateToPage('page0');
    } else {
        const pageId = window.location.hash.slice(1);
        navigateToPage(pageId);
    }

    // Trigger skill item animations if page3 is active on load
    if (window.location.hash === '#page3') {
        triggerSkillAnimations();
    }
});

// Function to trigger skill item animations
function triggerSkillAnimations() {
    const skillItems = document.querySelectorAll('#page3 .skill-item');
    skillItems.forEach(item => {
        item.style.animation = 'none';
        // Trigger reflow to restart animation
        void item.offsetWidth;
        item.style.animation = '';
    });
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}
.fade-in {
    animation: fadeIn 0.5s ease forwards;
}`;
document.head.appendChild(style);

// Popup functionality
const popup = document.getElementById('playPopup');
const playButton = document.querySelector('.btn-play');
const closeButton = document.querySelector('.popup-close');

function openPopup() {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
}

function closePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Show popup when Play button is clicked
playButton.addEventListener('click', openPopup);

// Close popup when close button is clicked
closeButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event from bubbling to popup
    closePopup();
});

// Close popup when clicking outside
popup.addEventListener('click', (e) => {
    // Only close if clicking directly on the overlay, not its children
    if (e.target === popup) {
        closePopup();
    }
});

// Close popup when pressing ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        closePopup();
    }
});

// Prevent clicks inside popup from closing it
popup.querySelector('.popup-content').addEventListener('click', (e) => {
    e.stopPropagation();
});

document.addEventListener('DOMContentLoaded', () => {
    const bannerImage = document.querySelector('.banner img');
    if (bannerImage) {
        // Trigger zoom animation by adding the zoomed class
        setTimeout(() => {
            bannerImage.classList.add('zoomed');
        }, 0);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.querySelector('.main-header');
    setTimeout(() => {
        window.location.hash = 'page1';
        mainHeader.style.display = 'flex';
        mainHeader.classList.add('fade-in');
    }, 2000);
});
