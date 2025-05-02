document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    const slideCount = slides.length;

    // Função para mostrar o slide atual
    function showSlide(index) {
        // Esconde todos os slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Mostra o slide atual
        slides[index].style.display = 'block';
    }

    // Navegação para o próximo slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        showSlide(currentIndex);
    }

    // Navegação para o slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        showSlide(currentIndex);
    }

    // Event listeners para os botões
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Mostrar o primeiro slide inicialmente
    showSlide(currentIndex);

    // Opcional: Auto-rotacionar os slides
    let slideInterval = setInterval(nextSlide, 5000);

    // Pausar ao passar o mouse
    const carrossel = document.querySelector('.carrossel');
    carrossel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    carrossel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
});