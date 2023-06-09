let loginApp = document.querySelector("#loginApp");
let userMsg = document.querySelector("#userMsg");
let loggedInMsg = document.querySelector("#loggedInMsg");

export function printLoginForm() {
  // SKAPA VY FÖR ATT LOGGA IN
  let formDiv = document.createElement("div");
  formDiv.classList.add("log-in-form");

  let loginHeader = document.createElement("h1");

  let formWrapper = document.createElement("div");
  formWrapper.setAttribute("id", "formId");

  let loginDiv = document.createElement("div");
  loginDiv.classList.add("login-div");

  let inputDivEmail = document.createElement("div");
  inputDivEmail.classList.add("txt_field");
  let emailInput = document.createElement("input");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("name", "email");
  emailInput.setAttribute("id", "email");
  emailInput.placeholder = "email";
  let span = document.createElement("span");
  let labelName = document.createElement("label");

  let inputDivPassword = document.createElement("div");
  inputDivPassword.classList.add("txt_field");
  let passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("name", "password");
  passwordInput.setAttribute("id", "password");
  passwordInput.placeholder = "password";
  let spanTwo = document.createElement("span");
  let labelPassword = document.createElement("label");

  let loginBtn = document.createElement("button");
  loginBtn.setAttribute("id", "loginBtn");
  loginBtn.classList.add("login-btn");
  loginBtn.innerText = "Login";

  let signUpDiv = document.createElement("div");
  signUpDiv.classList.add("signup_link");
  let signUpTxt = document.createElement("p");
  signUpTxt.innerText = "Be a surfer!";

  let signUpBtn = document.createElement("button");
  signUpBtn.setAttribute("id", "signUpBtn");
  signUpBtn.innerText = "Signup";

  inputDivEmail.append(emailInput, span, labelName);
  inputDivPassword.append(passwordInput, spanTwo, labelPassword);
  loginDiv.append(inputDivEmail, inputDivPassword, loginBtn);
  signUpDiv.append(signUpTxt, signUpBtn);
  formWrapper.append(loginDiv, signUpDiv);
  formDiv.append(loginHeader, formWrapper);

  signUpBtn.addEventListener("click", () => {
    loggedInMsg.innerHTML = "";
    printSignUpForm();
  });

  loginBtn.addEventListener("click", () => {
    let loginUser = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error("Wrong password");
        } else {
          throw new Error("Something went wrong")
        }
      })
      .then((data) => {
        console.log(data);
        if (data) {
          userMsg.innerHTML = "";
          loggedInMsg.innerHTML = `<h3>Du är nu inloggad ${data.name}!<br>
                    Hoppas du har en fin dag!</h3>`;
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          userMsg.innerText =
            "Inloggning misslyckades, var vänlig och kontrollera användarnamn och lösenord.";
        }
      });
  });

  loginApp.innerHTML = "";
  userMsg.innerText = "";
  loginApp.append(formDiv);
}

function printSignUpForm() {
  loginApp.innerHTML = "";
  userMsg.innerText = "";

  let signupFormDiv = document.createElement("div");
  signupFormDiv.classList.add("signup-form");

  let signupHeader = document.createElement("h1");
  signupHeader.innerText = "Signup!";

  let newUserName = document.createElement("input");
  newUserName.setAttribute("type", "text");
  newUserName.setAttribute("name", "name");
  newUserName.setAttribute("id", "newUserName");
  newUserName.placeholder = "name";

  let newUserEmail = document.createElement("input");
  newUserEmail.setAttribute("type", "email");
  newUserEmail.setAttribute("name", "newemail");
  newUserEmail.setAttribute("id", "newUserEmail");
  newUserEmail.placeholder = "email";

  let newUserPassword = document.createElement("input");
  newUserPassword.setAttribute("type", "password");
  newUserPassword.setAttribute("name", "password");
  newUserPassword.setAttribute("id", "newUserpassword");
  newUserPassword.placeholder = "password";

  let saveNewUserBtn = document.createElement("button");
  saveNewUserBtn.setAttribute("id", "newUserBtn");
  saveNewUserBtn.classList.add("new-user-btn");
  saveNewUserBtn.innerText = "Save";

  signupFormDiv.append(
    signupHeader,
    newUserName,
    newUserEmail,
    newUserPassword,
    saveNewUserBtn
  );
  loginApp.append(signupFormDiv);

  saveNewUserBtn.addEventListener("click", () => {
    // SKAPA EN NY ANVÄNDARE
    let user = {
      name: newUserName.value,
      email: newUserEmail.value,
      password: newUserPassword.value,
    };
    console.log(user);

    // SKICKA TILL SERVERN
    fetch("http://localhost:3000/api/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        printLoginForm();
      });
  });
}
