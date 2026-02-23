// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Toast Functionality
const showToast = (message, type = 'success') => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconName = type === 'success' ? 'checkmark-circle-outline' : 'alert-circle-outline';

  toast.innerHTML = `
    <ion-icon name="${iconName}"></ion-icon>
    <span class="toast-message">${message}</span>
    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);

  // Trigger entering animation
  setTimeout(() => toast.classList.add('active'), 10);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => toast.remove(), 400); // Wait for transition
  }, 3000);
}



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
let filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// project categories fetch and render
const projectsList = document.querySelector("[data-projects-list]");

if (projectsList) {
  fetch('./assets/data/projects.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(project => {
        const li = document.createElement("li");
        li.classList.add("project-item", "active");
        li.setAttribute("data-filter-item", "");
        li.setAttribute("data-category", project.category);

        li.innerHTML = `
          <a href="${project.link}" target="_blank">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="logo-github"></ion-icon>
              </div>
              <img src="${project.image}" alt="${project.title}" loading="lazy">
            </figure>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-category">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
          </a>
        `;

        projectsList.appendChild(li);
      });

      // update filterItems after dynamic loading
      filterItems = document.querySelectorAll("[data-filter-item]");
    })
    .catch(error => console.error('Error loading projects:', error));
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// EmailJS Initialization
(function () {
  emailjs.init("9XXEBAQ_AHXYa7IfJ");
})();

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// contact form submission handling
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Spam protection (bot field)
    const botField = document.querySelector("#bot-field");
    if (botField && botField.value !== "") {
      console.warn("Spam detected.");
      return;
    }

    formBtn.setAttribute("disabled", "");
    const btnText = formBtn.querySelector("span");
    const originalText = btnText.innerText;
    btnText.innerText = "Sending...";

    // EmailJS Send
    const senderName = document.getElementById('name').value;
    const senderEmail = document.getElementById('email').value;
    const senderMessage = document.getElementById('message').value;

    emailjs.send('service_s0tu7rs', 'template_00p83m7', {
      name: senderName,
      email: senderEmail,
      message: senderMessage
    })
      .then(() => {
        showToast("Message sent successfully!");
        form.reset();
        formBtn.setAttribute("disabled", "");
        btnText.innerText = originalText;
      }, (error) => {
        showToast("Failed to send message", "error");
        console.error("EmailJS Error:", error);
        formBtn.removeAttribute("disabled");
        btnText.innerText = originalText;
      });
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");


// certificate variables
const certificatesList = document.querySelector("[data-certificates-list]");
const certModalOverlay = document.querySelector("[data-cert-modal-overlay]");
const certModalCloseBtn = document.querySelector("[data-cert-modal-close]");
const certModalImg = document.querySelector("[data-cert-modal-img]");

// certificate modal toggle function
const certModalFunc = function () {
  certModalOverlay.classList.toggle("active");
}

// add click event to modal close button and overlay background
if (certModalCloseBtn) {
  certModalCloseBtn.addEventListener("click", certModalFunc);
}
if (certModalOverlay) {
  certModalOverlay.addEventListener("click", function (e) {
    if (e.target === certModalOverlay) {
      certModalFunc();
    }
  });
}

// fetch and render certificates
if (certificatesList) {
  fetch('./assets/data/certificates.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(cert => {
        const li = document.createElement("li");
        li.classList.add("certificate-item");
        li.innerHTML = `
          <div class="certificate-img-box">
            <div class="certificate-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img src="${cert.image}" alt="${cert.title}" loading="lazy">
          </div>
          <h4 class="certificate-item-title">${cert.title}</h4>
          <p class="certificate-item-issuer">${cert.issuer}</p>
          <p class="certificate-item-date">${cert.date}</p>
        `;

        li.addEventListener("click", function () {
          certModalImg.src = cert.image;
          certModalImg.alt = cert.title;
          certModalFunc();
        });

        certificatesList.appendChild(li);
      });
    })
    .catch(error => console.error('Error loading certificates:', error));
}


// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
