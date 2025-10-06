document.addEventListener("DOMContentLoaded", () => {
  // ====== TAB SWITCHING ======
  const formTab = document.getElementById("formTab");
  const carouselTab = document.getElementById("carouselTab");
  const formSection = document.getElementById("formSection");
  const carouselSection = document.getElementById("carouselSection");

  formTab.addEventListener("click", () => {
    formTab.classList.add("active");
    carouselTab.classList.remove("active");
    formSection.classList.remove("hidden");
    carouselSection.classList.add("hidden");
  });

  carouselTab.addEventListener("click", () => {
    carouselTab.classList.add("active");
    formTab.classList.remove("active");
    formSection.classList.add("hidden");
    carouselSection.classList.remove("hidden");
  });

  // ====== FORM VALIDATION ======
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const gender = document.getElementById("gender").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Clear previous errors
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

    if (name === "") {
      document.getElementById("nameError").textContent = "Name is required.";
      valid = false;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      document.getElementById("emailError").textContent = "Invalid email format.";
      valid = false;
    }

    if (!contact.match(/^[0-9]{10}$/)) {
      document.getElementById("contactError").textContent = "Contact must be 10 digits.";
      valid = false;
    }

    if (gender === "") {
      document.getElementById("genderError").textContent = "Please select gender.";
      valid = false;
    }

    if (password.length < 6) {
      document.getElementById("passwordError").textContent = "Password must be at least 6 characters.";
      valid = false;
    }

    if (confirmPassword !== password) {
      document.getElementById("confirmError").textContent = "Passwords do not match.";
      valid = false;
    }

    if (valid) {
      alert("Registration Successful!");
      form.reset();
    }
  });

  // ====== CAROUSEL FUNCTIONALITY ======
  const slides = document.querySelectorAll(".slides img");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let index = 0;

  function showSlide(i) {
    slides.forEach((img) => img.classList.remove("active"));
    slides[i].classList.add("active");
  }

  showSlide(index);

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length; // loops back to first
    showSlide(index);
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length; // loops to last
    showSlide(index);
  });

  // ====== STAR RATING SYSTEM ======
  const starsContainer = document.getElementById("stars");
  const ratingMsg = document.getElementById("ratingMsg");
  let currentRating = 0;

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.classList.add("star");
    star.innerHTML = "★";
    star.dataset.value = i;

    // Hover effect
    star.addEventListener("mouseover", () => {
      highlightStars(i);
    });

    // Remove hover effect
    star.addEventListener("mouseout", () => {
      highlightStars(currentRating);
    });

    // Click to set rating
    star.addEventListener("click", () => {
      currentRating = i;
      ratingMsg.textContent = `You rated ${i} star${i > 1 ? "s" : ""}!`;
      highlightStars(currentRating);
    });

    starsContainer.appendChild(star);
  }

  function highlightStars(rating) {
    const allStars = document.querySelectorAll(".star");
    allStars.forEach((star, idx) => {
      star.classList.toggle("selected", idx < rating);
    });
  }
});
