// Add custom JavaScript here

document.addEventListener("DOMContentLoaded", () => {
  const text = "I am Ahmed";
  const typingSpeed = 100; // Speed in milliseconds
  let index = 0;

  const h1Element = document.querySelector("h1");
  if (h1Element) {
    const typeEffect = () => {
      if (index < text.length) {
        h1Element.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, typingSpeed);
      }
    };
    typeEffect();
  }
});
