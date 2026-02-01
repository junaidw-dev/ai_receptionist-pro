// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
        navbar.classList.remove('bg-white/80');
        navbar.classList.add('bg-white/95');
    } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.remove('bg-white/95');
        navbar.classList.add('bg-white/80');
    }
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.slide-in').forEach((el) => observer.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// Chat simulation
setInterval(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer && Math.random() > 0.7) {
        const messages = [
            { text: "Thank you for your help!", sender: "user" },
            { text: "You're welcome! Have a great day.", sender: "bot" },
            { text: "Can I book for next Tuesday?", sender: "user" },
            { text: "Certainly! What time works best?", sender: "bot" }
        ];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        
        const div = document.createElement('div');
        div.className = `flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''} animate-pulse`;
        div.innerHTML = msg.sender === 'bot' ? `
            <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i data-lucide="bot" class="w-4 h-4 text-indigo-600"></i>
            </div>
            <div class="bg-slate-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                <p class="text-sm text-slate-700">${msg.text}</p>
            </div>
        ` : `
            <div class="bg-indigo-600 rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%]">
                <p class="text-sm text-white">${msg.text}</p>
            </div>
        `;
        
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Re-render icons for new elements
        lucide.createIcons();
        
        // Remove old messages if too many
        if (chatContainer.children.length > 6) {
            chatContainer.removeChild(chatContainer.firstElementChild);
        }
    }
}, 5000);