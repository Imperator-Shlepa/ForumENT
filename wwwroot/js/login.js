const login = document.getElementById("login-form");


register.addEventListener("submit", loginfetch);
async function loginfetch(event){
    event.preventDefault();
    const LoginInput = document.getElementById("login").value.trim();
    const PasswordInput = document.getElementById("password").value.trim();

    const data = {
        email: LoginInput,
        password: PasswordInput
    };

    const response = await fetch ("api/account/login", {
        method: "POST",
        headers: {"Contetn-Type": "application/json"},
        body: JSON.stringify(data)
    });
    if (response.ok){
        const resData = await response.json();
        localStorage.setItem("accessToken", resData.accessToken);
        localStorage.setItem("refreshToken", resData.refreshToken);
        window.location.replace("/");
    }
    else {
        const errLogin = await response.json();
        const result = document.getElementById("result");
        result.innerText ="Неверный логин или пароль!";

        console.log("Status:", response.status);
        console.log("Identity error:", errLogin);
    }
}