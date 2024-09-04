// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
 navLinks.classList.toggle("show");
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 anchor.addEventListener("click", function (e) {
  e.preventDefault();

  document.querySelector(this.getAttribute("href")).scrollIntoView({
   behavior: "smooth",
  });
 });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {
 button.addEventListener("click", () => {
  const filter = button.getAttribute("data-filter");

  filterButtons.forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");

  portfolioItems.forEach(item => {
   if (filter === "all" || item.getAttribute("data-category") === filter) {
    item.style.display = "block";
   } else {
    item.style.display = "none";
   }
  });
 });
});

// Form Validation
const contactForm = document.querySelector(".contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

contactForm.addEventListener("submit", e => {
 e.preventDefault();
 if (validateForm()) {
  // Here you would typically send the form data to a server
  contactForm.reset();
 }
});

function validateForm() {
 let isValid = true;

 if (nameInput.value.trim() === "") {
  showError(nameInput, "Name is required");
  isValid = false;
 } else {
  removeError(nameInput);
 }

 if (emailInput.value.trim() === "") {
  showError(emailInput, "Email is required");
  isValid = false;
 } else if (!isValidEmail(emailInput.value)) {
  showError(emailInput, "Please enter a valid email");
  isValid = false;
 } else {
  removeError(emailInput);
 }

 if (messageInput.value.trim() === "") {
  showError(messageInput, "Message is required");
  isValid = false;
 } else {
  removeError(messageInput);
 }

 return isValid;
}

function showError(input, message) {
 const formGroup = input.parentElement;
 const error = formGroup.querySelector(".error-message") || document.createElement("div");
 error.className = "error-message";
 error.textContent = message;
 if (!formGroup.querySelector(".error-message")) {
  formGroup.appendChild(error);
 }
 input.classList.add("error");
}

function removeError(input) {
 const formGroup = input.parentElement;
 const error = formGroup.querySelector(".error-message");
 if (error) {
  formGroup.removeChild(error);
 }
 input.classList.remove("error");
}

function isValidEmail(email) {
 const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 return re.test(String(email).toLowerCase());
}

// Intersection Observer for Animations
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
 entries => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    entry.target.classList.add("animate");
   }
  });
 },
 { threshold: 0.1 }
);
document.querySelector(".show-message-btn").addEventListener("click", function () {
 const messageDiv = document.querySelector(".thank-you-message");

 // Show the message with animation
 messageDiv.classList.remove("hidden");
 messageDiv.classList.add("show");

 // Hide the message after 4 seconds with animation
 setTimeout(() => {
  messageDiv.classList.add("hide");
 }, 4000);

 // Reset the message after the hide animation completes
 setTimeout(() => {
  messageDiv.classList.remove("show", "hide");
  messageDiv.classList.add("hidden");
 }, 4500);
});
document.addEventListener('DOMContentLoaded', () => {
    const readMoreLinks = document.querySelectorAll('.read-more');

    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const testimonialText = link.previousElementSibling;

            if (testimonialText.classList.contains('expanded')) {
                testimonialText.classList.remove('expanded');
                link.textContent = 'Read More';
            } else {
                testimonialText.classList.add('expanded');
                link.textContent = 'Read Less';
            }
        });
    });
});
const testimonialContainer = document.querySelector('.testimonial-container');

function autoScrollTestimonials() {
    testimonialContainer.scrollBy({
        left: 1, // Scroll horizontally
        behavior: 'smooth'
    });
    
    // Scroll to the start if we've reached the end
    if (testimonialContainer.scrollLeft + testimonialContainer.clientWidth >= testimonialContainer.scrollWidth) {
        testimonialContainer.scrollLeft = 0;
    }
}

// Start the auto-scrolling
setInterval(autoScrollTestimonials, 50); // Adjust the interval as needed

