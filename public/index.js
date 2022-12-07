//const nodemailer = require("nodemailer");
//Kyle Thom
const tagArray = [];
var emailRecip;
//This function creates the html for a new tag and inserts it at the start of the tag box
function insertnewTag(Title) {
  //var numTags = document.getElementsByClassName("tag").length;
  var newTag = {
    Id: Title,
    Title: Title,
  };
  var tagBox = document.getElementById("tagBox");
  var newTagHTML = Handlebars.templates.tag(newTag);
  tagBox.insertAdjacentHTML("afterbegin", newTagHTML);
  var x = document.getElementById(Title);
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
    fetch("/index/addTags", {
      method: "POST",
      body: JSON.stringify({
        Id: tagText,
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

//Ethan Hardey
//handles the tag being clicked
function tagClick() {
  if (this.classList.contains("background-orange")) {
    this.classList.remove("background-orange");
    for (let i = 0; i < tagArray.length; i++) {
      if (tagArray[i].id === this.id) {
        tagArray.splice(i, 1);
      }
    }
    tagClear(this);
  } else {
    this.classList.add("background-orange");
    tagArray.push(this);
    tagSearch();
  }
}

//Ethan Hardey
//resets the skills on screen when you unselect a tag
function tagClear(tagClicked) {
  let skillCollection = document.getElementsByClassName("skill")
  for (let i = 0; i < skillCollection.length; i++) {
    for (let k = 0; k < tagArray.length; k++) {
      if (skillCollection[i].id === tagClicked.id && tagArray[k].id != tagClicked.id) {
        skillCollection[i].classList.add('hidden');
        return;
      }
    }
  }

  for (let i = 0; i < skillCollection.length; i++) {
    skillCollection[i].classList.remove('hidden');
  }
}

//Ethan Hardey
//handles the displaying of tags based on the clicked tag
function tagSearch() {
  let skillCollection = document.getElementsByClassName("skill")
  for (let i = 0; i < skillCollection.length; i++) {
    skillCollection[i].classList.add('hidden');
    for (let k = 0; k < tagArray.length; k++) {
      let goofyAhString = JSON.stringify(skillCollection[i].id)
      if(goofyAhString.includes(tagArray[k].id)) {
        skillCollection[i].classList.remove('hidden');
      }
    }
  }
}

//Ethan Hardey
//This function is used for live searching the database.
function searchSkill() {
  let userInput = document.getElementById("skillSearch").value;
  userInput = userInput.toLowerCase();
  let skillCollection = document.getElementsByClassName("skill")
  let activeArray = []

  if (tagArray.length > 0) {
    for (let i = 0; i < skillCollection.length; i++) {
      for (let k = 0; k < tagArray.length; k++) {
        let goofyAhString2 = JSON.stringify(skillCollection[i].id)
        if (goofyAhString2.includes(tagArray[k].id)) {
          if (!activeArray.includes(skillCollection[i])) {
            activeArray.push(skillCollection[i]);
          }
        }
      }
    }

    for (let i = 0; i < activeArray.length; i++) {
      if (activeArray[i].textContent.toLowerCase().includes(userInput)) {
        activeArray[i].classList.remove('hidden');
      } else {
        activeArray[i].classList.add('hidden');
      }
    }
  } else {
    for (let i = 0; i < skillCollection.length; i++) {
      if (skillCollection[i].textContent.toLowerCase().includes(userInput)) {
        skillCollection[i].classList.remove('hidden');
      } else {
        skillCollection[i].classList.add('hidden');
      }
    }

  }
}

//adds event listners to preexisting tags
//Redid this to add event listeners without using the individual ids of each tag
function tagListeners() {
  var tags = document.getElementsByClassName("tag");
  for (i = 0; i < tags.length; i++) {
    tags[i].addEventListener("click", tagClick);
  }
}

function skillListeners() {
  var skills = document.getElementsByClassName("skill");
  for (i = 0; i < skills.length; i++) {
    skills[i].addEventListener("click", skillClick);
  }
}

function skillClick() {
  console.log(this.classList[1]);
  var peopleCollection = document.getElementsByClassName("people hidden")
  for(let i = 0; i < peopleCollection.length; i++)
  {
    if(peopleCollection[i].id === this.classList[1])
    {
      console.log(peopleCollection[i].textContent);
      emailRecip = peopleCollection[i].textContent;
      console.log(emailRecip);
    }
  }
  showEmailModule()
}

//Ian Backus
//email functions

function showEmailModule() {
  var modalBackdrop = document.getElementById("modal-backdrop");
  var createLoginModal = document.getElementById("create-email-modal");
  modalBackdrop.classList.remove("hidden");
  createLoginModal.classList.remove("hidden");
}

function hideEmailModal() {
  var modalBackdrop = document.getElementById("modal-backdrop");
  var createLoginModal = document.getElementById("create-email-modal");
  modalBackdrop.classList.add("hidden");
  createLoginModal.classList.add("hidden");
  clearTagInputValues();
}

function handleEmailSendClick(){
  //const nodemailer = require("nodemailer");

  var EmailSubjectText = document.getElementById("subject-text-input").value;
  var EmailBodyText = document.getElementById("body-text-input").value;

  if(emailRecip && EmailBodyText && EmailSubjectText){
    fetch("/index/createEmail", {
      method: "POST",
      body: JSON.stringify({
        Recipient: emailRecip,
        Subject: EmailSubjectText,
        Body: EmailBodyText,
      }),
      headers:{
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("email sending success (recipient could still be invalid)");
      }
    });
  }else{
    alert("Please fill out all fields");
  }

  hideEmailModal();
}

//email functions end


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
            setActiveUser(data[i]);
          }
        }
      });
    }
  });
  clearTagInputValues(); //this clears the login module.
  hideCreateLoginModal();
}

function showLoggedin(data, index) {
  login = document.getElementById("login");
  login.innerHTML = data[index].Email;
  login.removeEventListener("click", showLoginModule);
  //login.addEventListener("click", showLogoutModule);
}

function setActiveUser(data) {
  fetch("/index/setActiveUser", {
    method: "POST",
    body: JSON.stringify({
      personName: data.personName,
      Specialty: data.Specialty,
      Tags: data.tags,
      Bio: data.Bio,
      Email: data.Email,
      Password: data.Password,
      Id: data.ID,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      console.log("active user declared");
    }
  });
}

function logInCheck() {
  fetch("/index/activeUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        if (data[0]) {
          showLoggedin(data, 0);
        }
      });
    }
  });
}

window.addEventListener("DOMContentLoaded", function () {
  tagListeners();
  logInCheck();
  skillListeners();
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

  //email modal
  var makeEmail = document.getElementById("emailTab");
  if(makeEmail){
    makeEmail.addEventListener("click", showEmailModule);
  }

  var sendemail = document.getElementById('email-user');
  if(sendemail) {
    sendemail.addEventListener('click', handleEmailSendClick)
  }

  var blockUser = document.getElementById('block-user');
  if(blockUser){
    blockUser.addEventListener('click', blockUser);
  }

  var emailCancelButton = document.querySelector(
    "#create-email-modal .modal-close-button"
  );
  if (emailCancelButton) {
    emailCancelButton.addEventListener("click", hideEmailModal);
  }

  var emailClose = document.getElementsByClassName("modal-close-button")
  console.log(emailClose)
  if(emailClose){
    emailClose[0].addEventListener('click', hideEmailModal)
  }

  //searchbar
  var searchbar = document.getElementById("skillSearch");
  if (searchbar) {
    searchbar.addEventListener('input', searchSkill);
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




