//Kyle Thom

//This function creates the html for a new tag and inserts it at the start of the tag box

function insertnewTag(Title) {
  var numTags = document.getElementsByClassName("tag").length;
  var newTag = {
    Id: numTags,
    Title: Title,
  };
  var tagBox = document.getElementById("tagBox");
  var newTagHTML = Handlebars.templates.tag(newTag);
  tagBox.insertAdjacentHTML("afterbegin", newTagHTML);
  var x = document.getElementById(numTags);
  x.addEventListener("click", tagClick);
}
//This should unhide the tag suggestion box when the button is clicked.
function showSuggestTagModal() {
  var modalBackdrop = document.getElementById("modal-backdrop");
  var createTagModal = document.getElementById("create-tag-modal");

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove("hidden");
  createTagModal.classList.remove("hidden");
}
// this function rehides it
function hideCreateTagModal() {
  var modalBackdrop = document.getElementById("modal-backdrop");
  var createTagModal = document.getElementById("create-tag-modal");

  // Show the modal and its backdrop.
  modalBackdrop.classList.add("hidden");
  createTagModal.classList.add("hidden");
  clearTagInputValues();
}
//clears tag values
function clearTagInputValues() {
  var tagInputElems = document.getElementsByClassName("tag-input-element");
  for (var i = 0; i < tagInputElems.length; i++) {
    var input = tagInputElems[i].querySelector("input, textarea");
    input.value = "";
  }
}

//This fuction makes the new tag and adds it to the Json Data base
function handleModalAcceptClick() {
  var tagText = document.getElementById("tag-text-input").value;

  if (!tagText) {
    alert("You have not entered anything");
    return;
  }
  if (tagText && tagText.length < 6) {
    var numTags = document.getElementsByClassName("tag").length;
    fetch("/index/addTags", {
      method: "POST",
      body: JSON.stringify({
        Id: numTags,
        Title: tagText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        insertnewTag(tagText);
        hideCreateTagModal();
      }
    });
  } else {
    alert("You can only use 5 characters!");
  }
}
//handles the tag being clicked
function tagClick() {
  if (this.classList.contains("background-orange")) {
    this.classList.remove("background-orange");
  } else {
    this.classList.add("background-orange");
  }
}
//adds event listners to preexisting tags
function tagListeners() {
  var numTags = document.getElementsByClassName("tag").length;
  for (i = 0; i < numTags; i++) {
    var x = document.getElementById(i);
    x.addEventListener("click", tagClick);
  }
}

function showLoginModule() {
  var modalBackdrop = document.getElementById("modal-backdrop");
  var createLoginModal = document.getElementById("create-login-modal");
  modalBackdrop.classList.remove("hidden");
  createLoginModal.classList.remove("hidden");
}

function hideCreateLoginModal() {
  var modalBackdrop = document.getElementById("modal-backdrop");
  var createLoginModal = document.getElementById("create-login-modal");
  modalBackdrop.classList.add("hidden");
  createLoginModal.classList.add("hidden");
  clearTagInputValues();
}

function handleLoginAcceptClick() {
  var EmailText = document.getElementById("email-text-input").value;
  var PassText = document.getElementById("password-text-input").value;
  fetch("/index/peopleData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        for (i = 0; i < data.length; i++) {
          if ((data[i].Email == EmailText) & (data[i].Password == PassText)) {
            showLoggedin(data, i);
          }
        }
      });
    }
  });
  clearTagInputValues();
  hideCreateLoginModal();
}
function showLoggedin(data, index) {
  document.getElementById("login").innerHTML = data[index].Email;
}

window.addEventListener("DOMContentLoaded", function () {
  tagListeners();
  //login module
  var login = document.getElementById("login");
  if (login) {
    login.addEventListener("click", showLoginModule);
  }
  var loginCloseButton = document.querySelector(
    "#create-login-modal .modal-close-button"
  );
  if (loginCloseButton) {
    loginCloseButton.addEventListener("click", hideCreateLoginModal);
  }
  var loginAcceptButton = document.querySelector(
    "#create-login-modal .modal-accept-button"
  );
  if (loginAcceptButton) {
    loginAcceptButton.addEventListener("click", handleLoginAcceptClick);
  }

  //tag modal create button
  var createTagButton = document.getElementById("create-tag-button");
  if (createTagButton) {
    createTagButton.addEventListener("click", showSuggestTagModal);
  }
  //tag  modal cancel button
  var modalCancelButton = document.querySelector(
    "#create-tag-modal .modal-cancel-button"
  );
  if (modalCancelButton) {
    modalCancelButton.addEventListener("click", hideCreateTagModal);
  }
  //tag modal close button
  var modalCloseButton = document.querySelector(
    "#create-tag-modal .modal-close-button"
  );
  if (modalCloseButton) {
    modalCloseButton.addEventListener("click", hideCreateTagModal);
  }
  // tag creation button
  var modalAcceptButton = document.querySelector(
    "#create-tag-modal .modal-accept-button"
  );
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener("click", handleModalAcceptClick);
  }
});
