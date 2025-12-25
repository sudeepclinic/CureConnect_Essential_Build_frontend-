document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Hamburgur animation toggle if needed
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth Scroll for Anchor Links (if browser doesn't support scroll-behavior: smooth in CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.animate-scroll');
    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.classList.add('transition-element'); // Add class if needed for CSS transitions
        observer.observe(el);
    });
    
    // Add CSS for the JS animation
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-scroll.animate-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: all 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // Language Translation Logic
    // ==========================================
    
    const translations = {
        en: {
            nav_home: "Home",
            nav_specialists: "Specialists",
            nav_location: "Location",
            nav_book: "Book Appointment",
            hero_title: "World-Class Care <br> Close to Home",
            hero_subtitle: "Expert Orthopedic & ENT specialists dedicated to your well-being in Shirpur.",
            hero_book: "Book an Appointment",
            hero_visit: "Visit Us",
            doctors_title: "Our Specialists",
            doctors_subtitle: "Meet our highly qualified and experienced medical professionals.",
            doc_kamlesh_name: "Dr. Mr. Kamlesh Dilip Yeshi",
            doc_kamlesh_spec: "Orthopedic Surgeon",
            doc_namrata_name: "Dr. Mrs. Namrata Kamlesh Yeshi",
            doc_namrata_spec: "ENT Specialist",
            book_visit: "Book Visit",
            location_title: "Find Us",
            address_title: "Address",
            emergency_title: "Emergency Contact",
            timings_title: "OPD Timings",
            timings_1: "Mon - Sat: 10:00 AM - 2:00 PM",
            timings_2: "Mon - Sat: 5:00 PM - 9:00 PM",
            footer_rights: "All rights reserved."
        },
        mr: {
            nav_home: "मुख्यपृष्ठ",
            nav_specialists: "तज्ञ डॉक्टर्स",
            nav_location: "पत्ता",
            nav_book: "अपॉइंटमेंट",
            hero_title: "जागतिक दर्जाची हॉस्पिटल सेवा <br> आता आपल्या शिरपूरमध्ये",
            hero_subtitle: "शिरपूरमध्ये आपल्या आरोग्यासाठी समर्पित तज्ञ ऑर्थोपेडिक आणि ईएनटी सेवा.",
            hero_book: "अपॉइंटमेंट बुक करा",
            hero_visit: "भेट द्या",
            doctors_title: "आमचे तज्ञ डॉक्टर्स",
            doctors_subtitle: "आमच्या अत्यंत qualified आणि अनुभवी वैद्यकीय तज्ञांना भेटा.",
            doc_kamlesh_name: "डॉ. श्री. कमलेश दिलीप येषी",
            doc_kamlesh_spec: "अस्थिरोग तज्ञ (Orthopedic Surgeon)",
            doc_namrata_name: "डॉ. सौ. नम्रता कमलेश येषी",
            doc_namrata_spec: "कान-नाक-घसा तज्ञ (ENT Specialist)",
            book_visit: "भेट बुक करा",
            location_title: "संपर्क साधा",
            address_title: "पत्ता",
            emergency_title: "आपत्कालीन संपर्क",
            timings_title: "ओपीडी वेळ",
            timings_1: "सोम - शनि: सकाळी १०:०० - दुपारी २:००",
            timings_2: "सोम - शनि: सायंकाळी ५:०० - रात्री ९:००",
            footer_rights: "सर्व हक्क राखीव."
        }
    };

    const langBtn = document.getElementById('lang-btn');
    const currentLangSpan = document.getElementById('current-lang');
    const langOptions = document.querySelectorAll('.lang-content a');

    // Function to set language
    function setLanguage(lang) {
        if (!translations[lang]) return;

        // Update Text Content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // Handle different element types if necessary, but innerHTML is usually safe for these specific keys
                // Using innerHTML to preserve line breaks in hero_title
                element.innerHTML = translations[lang][key]; 
            }
        });

        // Update Button Text
        currentLangSpan.textContent = lang === 'en' ? 'EN' : 'मराठी';

        // Persist preference
        // localStorage.setItem('preferredLang', lang); // Optional: Persist selection
    }

    // Event Listeners for Language Selection
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = option.getAttribute('data-lang');
            setLanguage(selectedLang);
            
            // On mobile, close menu after selection
            if (window.innerWidth <= 768) {
                // Optional: Close dropdown or navbar
            }
        });
    });

    // Initialize (optional: check localStorage)
    // const savedLang = localStorage.getItem('preferredLang') || 'en';
    // setLanguage(savedLang);

});
