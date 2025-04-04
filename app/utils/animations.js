"use client";

// Função para animar elementos quando ficarem visíveis durante o scroll
export function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          // Opcional: parar de observar o elemento após a animação
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // 10% do elemento visível
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });

  return () => {
    elements.forEach((element) => {
      observer.unobserve(element);
    });
  };
}

// Função para animar sequencialmente itens de uma lista (como cards)
export function animateItems(containerSelector, delay = 150) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = container.children;

  Array.from(items).forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = `opacity 0.5s ease, transform 0.5s ease`;

    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * delay);
  });
}
