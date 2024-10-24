document.addEventListener('DOMContentLoaded', function () {
    const switchEn = document.getElementById('switch-en');
    const switchPt = document.getElementById('switch-pt');

    const translations = {
        pt: {
            "nav-about": "Sobre",
            "nav-work": "Trabalho",
            "nav-contact": "Contato",
            "landing-title": "Leonardo Pereira",
            "landing-subtitle": "Desenvolvedor Fullstack.",
            "about-title": "Sobre",
            "about-description": "Sou Leonardo Pereira, um estudante de Ciência da Computação de Brasília, mostrando minhas habilidades e projetos.",
            "work-title": "Trabalho",
            "work-experience-title": "Título da Experiência de Trabalho",
            "work-experience-description": "Uma breve descrição da experiência de trabalho. Discuta os detalhes, habilidades utilizadas ou tecnologias envolvidas no projeto ou experiência.",
            "work-learn-more": "Saiba Mais",
            "contact-title": "Contato",
            "contact-email-placeholder": "Seu Email",
            "contact-message-placeholder": "Sua Mensagem",
            "contact-submit": "Enviar"
        },
        en: {
            "nav-about": "About",
            "nav-work": "Work",
            "nav-contact": "Contact",
            "landing-title": "Leonardo Pereira",
            "landing-subtitle": "Fullstack Developer.",
            "about-title": "About",
            "about-description": "I'm Leonardo Pereira, a Computer Science student from Brasília, showcasing my skills and projects.",
            "work-title": "Work",
            "work-experience-title": "Job Experience Title",
            "work-experience-description": "A short description of the job experience goes here. Discuss the details, skills used, or technologies involved in the project or experience.",
            "work-learn-more": "Learn More",
            "contact-title": "Contact",
            "contact-email-placeholder": "Your Email",
            "contact-message-placeholder": "Your Message",
            "contact-submit": "Send"
        }
    };

    // Function to update the page content based on selected language
    function updateLanguage(lang) {
        const elementsToTranslate = document.querySelectorAll("[id]");

        elementsToTranslate.forEach(function (element) {
            const translationKey = element.id;
            if (translations[lang][translationKey]) {
                element.textContent = translations[lang][translationKey];
                if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                    element.setAttribute("placeholder", translations[lang][translationKey]);
                }
            }
        });
    }

    // Event listeners for language switcher
    switchEn.addEventListener('click', function (e) {
        e.preventDefault();
        updateLanguage('en');
    });

    switchPt.addEventListener('click', function (e) {
        e.preventDefault();
        updateLanguage('pt');
    });
});
