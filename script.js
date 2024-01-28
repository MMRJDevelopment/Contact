document.addEventListener("DOMContentLoaded", function () {
  const allContactBtn = document.getElementById("all-contact-btn");
  const usContactBtn = document.getElementById("us-contact-btn");
  const modalA = document.getElementById("modal-a");
  const modalB = document.getElementById("modal-b");
  const modalACloseBtn = document.getElementById("modal-a-close-btn");
  const modalBCloseBtn = document.getElementById("modal-b-close-btn");
  const searchInputA = document.getElementById("search-a");
  const searchInputB = document.getElementById("search-b");
  const contactListA = document.getElementById("contact-list-a");
  const contactListB = document.getElementById("contact-list-b");

  allContactBtn.addEventListener("click", function () {
    fetchContacts("all");
    modalA.style.display = "block";
  });

  usContactBtn.addEventListener("click", function () {
    fetchContacts("us");
    modalB.style.display = "block";
  });

  modalACloseBtn.addEventListener("click", function () {
    modalA.style.display = "none";
  });

  modalBCloseBtn.addEventListener("click", function () {
    modalB.style.display = "none";
  });

  function fetchContacts(type) {
    let url = "https://contact.mediusware.com/api-doc/?format=openapi";
    if (type === "us") {
      url += "?country=US";
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (type === "all") {
          displayContacts(data.contacts, contactListA);
        } else {
          displayContacts(data.contacts, contactListB);
        }
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  }

  function displayContacts(contacts, listElement) {
    listElement.innerHTML = "";
    contacts.forEach((contact) => {
      const contactItem = document.createElement("div");
      contactItem.textContent = `${contact.id}: ${contact.name}`;
      listElement.appendChild(contactItem);
    });
  }

  searchInputA.addEventListener("input", function (event) {
    const searchTerm = event.target.value.toLowerCase();
  });

  searchInputB.addEventListener("input", function (event) {
    const searchTerm = event.target.value.toLowerCase();
  });
});
