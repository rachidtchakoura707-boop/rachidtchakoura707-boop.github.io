document.addEventListener('DOMContentLoaded', function () {
    var root = document.documentElement;

    /* ===== THEME TOGGLE ===== */
    var themeToggle = document.getElementById('theme-toggle');
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', function () {
        var current = root.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    /* ===== LANGUAGE TOGGLE ===== */
    var langToggle = document.getElementById('lang-toggle');
    var savedLang = localStorage.getItem('lang');

    function applyLang(lang) {
        root.setAttribute('data-lang', lang);
        root.setAttribute('lang', lang);
        document.querySelectorAll('[data-fr][data-en]').forEach(function (el) {
            var value = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-fr');
            if (value !== null) {
                el.textContent = value;
            }
        });
    }

    if (savedLang) {
        applyLang(savedLang);
    }

    langToggle.addEventListener('click', function () {
        var current = root.getAttribute('data-lang');
        var next = current === 'fr' ? 'en' : 'fr';
        applyLang(next);
        localStorage.setItem('lang', next);
    });

    /* ===== BURGER MENU ===== */
    var burger = document.getElementById('burger');
    var navMenu = document.getElementById('nav-menu');

    burger.addEventListener('click', function () {
        navMenu.classList.toggle('open');
        burger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            navMenu.classList.remove('open');
            burger.classList.remove('active');
        });
    });

    /* ===== SCROLL REVEAL ===== */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        revealEls.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* ===== ACTIVE NAV LINK ON SCROLL ===== */
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink(id) {
        navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
    }

    if ('IntersectionObserver' in window) {
        var navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

        sections.forEach(function (section) {
            navObserver.observe(section);
        });
    }

    /* ===== CONTACT FORM ===== */
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var message = document.getElementById('message').value;

            var subject = encodeURIComponent('Message depuis le portfolio de ' + name);
            var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');

            showToast();
            window.location.href = 'mailto:rachidtchakoura707@gmail.com?subject=' + subject + '&body=' + body;
        });
    }

    /* ===== TOAST ===== */
    var toast = document.getElementById('form-toast');
    var toastTimer;
    function showToast() {
        if (!toast) return;
        toast.classList.add('visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            toast.classList.remove('visible');
        }, 3500);
    }

    /* ===== SCROLL PROGRESS BAR ===== */
    var progressBar = document.getElementById('progress-bar');
    var backToTop = document.getElementById('back-to-top');

    function onScroll() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = progress + '%';
        }

        if (backToTop) {
            backToTop.classList.toggle('visible', scrollTop > 400);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
