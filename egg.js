window.addEventListener('scroll', function() {
    var nav = document.querySelector('nav');
    var placeholder = document.querySelector('.nav-placeholder');
    var headerHeight = document.querySelector('header').offsetHeight;

    if (window.pageYOffset > headerHeight) {
        nav.classList.add('sticky');
        placeholder.style.display = 'block'; // Show the placeholder
    } else {
        nav.classList.remove('sticky');
        placeholder.style.display = 'none'; // Hide the placeholder
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var copyIcons = document.querySelectorAll('.copy-icon');

    copyIcons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            var textToCopy = icon.getAttribute('data-clipboard-text');
            navigator.clipboard.writeText(textToCopy).then(function() {
                alert('Copied to clipboard: ' + textToCopy);
            }, function(err) {
                console.error('Could not copy text: ', err);
            });
        });
    });

    var navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var targetId = link.getAttribute('href').substring(1);
            var targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Remove glow class from all sections
                document.querySelectorAll('section').forEach(function(section) {
                    section.classList.remove('glow');
                });

                // Add glow class to the clicked section
                targetSection.classList.add('glow');

                // Scroll to the target section
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Remove glow class after 3 seconds
                setTimeout(function() {
                    targetSection.classList.remove('glow');
                }, 3000); // 3000 milliseconds = 3 seconds
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const eggIcon = document.getElementById('egg-icon');
    let clickCount = 0;

    eggIcon.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 20) {
            window.open('egg.html'); // Replace with the URL you want to open
        }
    });
});

const img = document.getElementById('profile-image');
let theRapture = 0;

img.addEventListener('mousedown', () => {
    if (theRapture != 5) {
        img.src = 'bin/images/egg.webp';
        theRapture += 1
    }
    if (theRapture >= 5) {
        img.src = 'bin/images/räkegg.jpg';
    }
});