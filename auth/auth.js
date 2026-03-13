window.onload = function () {
  let loginStatus = localStorage.getItem("isLoggedIn");
  if (loginStatus === "true") {
    window.location.href = "../examination/exam.html";
  }
  const authThemeToggle = document.getElementById("authThemeToggle");
  const authThemeIcon = document.getElementById("authThemeIcon");

  function applyAuthTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add("dark-auth");
      authThemeIcon.innerText = "light_mode";
    } else {
      document.documentElement.classList.remove("dark-auth");
      authThemeIcon.innerText = "dark_mode";
    }
  }

  applyAuthTheme(localStorage.getItem("theme") === "dark");

  authThemeToggle.addEventListener("click", function () {
    const isDark = document.documentElement.classList.toggle("dark-auth");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    applyAuthTheme(isDark);
  });

  const rightPanel = document.getElementById("rightPanel");
  const btnGotoRegister = document.getElementById("goto-register");
  const btnGotoLogin = document.getElementById("goto-login");

  btnGotoRegister.addEventListener("click", function (e) {
    e.preventDefault();
    rightPanel.classList.add("active-register");
  });

  btnGotoLogin.addEventListener("click", function (e) {
    e.preventDefault();
    rightPanel.classList.remove("active-register");
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

  document.querySelectorAll(".password-toggle button").forEach(function (btn) {
    btn.onclick = function () {
      let input = this.parentElement.previousElementSibling;
      let svgPath = this.querySelector("path");

      const eyeVisible =
        "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z";
      const eyeHidden =
        "M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z";

      if (input.type === "password") {
        input.type = "text";
        svgPath.setAttribute("d", eyeVisible);
      } else {
        input.type = "password";
        svgPath.setAttribute("d", eyeHidden);
      }
    };
  });



  const regForm = document.getElementById("regForm");
  const regFirstname = document.getElementById("reg-firstname");
  const regLastname = document.getElementById("reg-lastname");
  const regEmail = document.getElementById("reg-email");
  const regPassword = document.getElementById("reg-password");
  const regConfirm = document.getElementById("reg-confirm");
  const passwordBars = document.querySelectorAll(".password-bar");

  regPassword.oninput = function () {
    let pwd = regPassword.value;
    let counter = 0;

    let ruleLength = document.getElementById("rule-length");
    let ruleLower = document.getElementById("rule-lower");
    let ruleUpper = document.getElementById("rule-upper");
    let ruleNumber = document.getElementById("rule-number");
    let ruleSpecial = document.getElementById("rule-special");

    if (pwd.length >= 8) {
      ruleLength.classList.add("valid");
      counter++;
    } else {
      ruleLength.classList.remove("valid");
    }

    if (/[a-z]/.test(pwd)) {
      ruleLower.classList.add("valid");
      counter++;
    } else {
      ruleLower.classList.remove("valid");
    }

    if (/[A-Z]/.test(pwd)) {
      ruleUpper.classList.add("valid");
      counter++;
    } else {
      ruleUpper.classList.remove("valid");
    }

    if (/[0-9]/.test(pwd)) {
      ruleNumber.classList.add("valid");
      counter++;
    } else {
      ruleNumber.classList.remove("valid");
    }

    if (/[^A-Za-z0-9]/.test(pwd)) {
      ruleSpecial.classList.add("valid");
      counter++;
    } else {
      ruleSpecial.classList.remove("valid");
    }

    for (let i = 0; i < 5; i++) {
      passwordBars[i].style.backgroundColor = "#e2e8f0";
    }
    let colors = ["#ef4444", "#f97316", "#eab308", "#3b82f6", "#22c55e"];
    for (let i = 0; i < counter; i++) {
      passwordBars[i].style.backgroundColor = colors[counter - 1];
    }
  };

  regForm.onsubmit = function (event) {
    event.preventDefault();

    let savedUser = JSON.parse(localStorage.getItem("user"));

    let isFirstNameValid = false;
    let isLastNameValid = false;
    let isEmailValid = false;
    let isPasswordValid = false;
    let isConfirmValid = false;

    if (regFirstname.value.trim() === "") {
      setError(regFirstname, "First Name is required");
    } else if (
      regFirstname.value.trim().length < 3 ||
      regFirstname.value.trim().length > 10
    ) {
      setError(regFirstname, "Must be 3-10 characters");
    } else if (!/^[a-zA-Z]+$/.test(regFirstname.value.trim())) {
      setError(regFirstname, "Letters only");
    } else {
      setSuccess(regFirstname);
      isFirstNameValid = true;
    }

    if (regLastname.value.trim() === "") {
      setError(regLastname, "Last Name is required");
    } else if (
      regLastname.value.trim().length < 3 ||
      regLastname.value.trim().length > 10
    ) {
      setError(regLastname, "Must be 3-10 characters");
    } else if (!/^[a-zA-Z]+$/.test(regLastname.value.trim())) {
      setError(regLastname, "Letters only");
    } else {
      setSuccess(regLastname);
      isLastNameValid = true;
    }

    if (regEmail.value.trim() === "") {
      setError(regEmail, "Email is required");
    } else if (
      regEmail.value.trim().length < 10 ||
      regEmail.value.trim().length > 30
    ) {
      setError(regEmail, "Must be 10-30 characters");
    } else if (!emailRegex.test(regEmail.value.trim())) {
      setError(regEmail, "Invalid email address");
    } else if (savedUser && savedUser.email === regEmail.value.trim()) {
      setError(regEmail, "Email already exists");
    } else {
      setSuccess(regEmail);
      isEmailValid = true;
    }

    if (regPassword.value === "") {
      setError(regPassword, "Password is required");
    } else if (regPassword.value.length < 8 || regPassword.value.length > 32) {
      setError(regPassword, "Min 8 and Max 32 characters");
    } else if (!passwordRegex.test(regPassword.value)) {
      setError(regPassword, "Follow the password rules");
    } else {
      setSuccess(regPassword);
      isPasswordValid = true;
    }

    if (regConfirm.value === "") {
      setError(regConfirm, "Confirm Password is required");
    } else if (regConfirm.value !== regPassword.value) {
      setError(regConfirm, "Passwords do not match");
    } else {
      setSuccess(regConfirm);
      isConfirmValid = true;
    }

   
    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmValid
    ) {
      return;
    }

   
    let userData = {
      firstName: regFirstname.value.trim(),
      lastName: regLastname.value.trim(),
      email: regEmail.value.trim(),
      password: regPassword.value.trim(),
    };

    localStorage.setItem("user", JSON.stringify(userData));

    showPopup("Registration Successful! Please login.", "success");

    for (let i = 0; i < passwordBars.length; i++) {
      passwordBars[i].style.backgroundColor = "#e2e8f0";
    }
    let rules = document.querySelectorAll(".password-rules li");
    for (let i = 0; i < rules.length; i++) {
      rules[i].classList.remove("valid");
    }

    setTimeout(function () {
      rightPanel.classList.remove("active-register");
      document.getElementById("login-email").value = userData.email;
      document.getElementById("login-password").value = "";
      regForm.reset();
    }, 1500);
  };

 

  const loginForm = document.getElementById("loginForm");
  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");

  loginForm.onsubmit = function (event) {
    event.preventDefault();

    let savedUser = JSON.parse(localStorage.getItem("user"));

    let isEmailValid = false;
    let isPasswordValid = false;

    if (loginEmail.value.trim() === "") {
      setError(loginEmail, "Email is required");
    } else if (!emailRegex.test(loginEmail.value.trim())) {
      setError(loginEmail, "Invalid email address");
    } else {
      setSuccess(loginEmail);
      isEmailValid = true;
    }

    if (loginPassword.value === "") {
      setError(loginPassword, "Password is required");
    } else {
      setSuccess(loginPassword);
      isPasswordValid = true;
    }

    if (isEmailValid && isPasswordValid) {
      let enteredEmail = loginEmail.value.trim();
      let enteredPassword = loginPassword.value.trim();

      if (savedUser === null) {
        showPopup("No Account Found. Please Register first.", "error");
        setTimeout(function () {
          document.getElementById("reg-email").value = enteredEmail;
          document.getElementById("reg-password").value = enteredPassword;
          document.getElementById("reg-confirm").value = enteredPassword;
          regPassword.oninput();
          rightPanel.classList.add("active-register");
        }, 2000);
        return;
      }

      if (
        savedUser.email === enteredEmail &&
        savedUser.password === enteredPassword
      ) {
        localStorage.setItem("isLoggedIn", "true");
        showPopup("Login Successful", "success");
        setTimeout(() => {
          window.location.href = "../examination/exam.html";
        }, 1500);
      } else if (
        savedUser.email === enteredEmail &&
        savedUser.password !== enteredPassword
      ) {
        setError(loginPassword, "Incorrect Password");
      } else {
        setError(loginEmail, "Email Not Found");
        setError(loginPassword, "Email Not Found");
      }
    }
  };

  function setError(input, message) {
    let formDiv = input.closest(".form-div");
    let errorMsg = formDiv.querySelector(".error-msg");
    formDiv.classList.add("error");
    formDiv.classList.remove("success");
    errorMsg.innerText = message;
    errorMsg.style.display = "block";
  }

  function setSuccess(input) {
    let formDiv = input.closest(".form-div");
    let errorMsg = formDiv.querySelector(".error-msg");
    formDiv.classList.add("success");
    formDiv.classList.remove("error");
    errorMsg.innerText = "";
    errorMsg.style.display = "none";
  }

  function showPopup(message, type) {
    let overlay = document.getElementById("popupOverlay");
    let icon = document.getElementById("popupIcon");
    let msg = document.getElementById("popupMessage");

    msg.innerText = message;

    if (type === "success") {
      icon.innerText = "✔";
      icon.style.color = "green";
    } else {
      icon.innerText = "✖";
      icon.style.color = "red";
    }

    overlay.style.display = "flex";

    setTimeout(function () {
      overlay.style.display = "none";
    }, 2000);
  }
};
