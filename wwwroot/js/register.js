
const register = document.getElementById("register-form");

register.addEventListener("submit", regfetch);
async function regfetch(event){
    event.preventDefault();
    const LoginInput = document.getElementById("login").value.trim();
    const PasswordInput = document.getElementById("password").value.trim();
    const ConfirmPasswordInput = document.getElementById("confirm-password").value.trim();

    if (PasswordInput === ConfirmPasswordInput) {
        const data = {
            email: LoginInput,
            password: PasswordInput
        };
        
        const response = await fetch("/api/account/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        //god bless this code plssssss


        if (response.ok){
            window.location.replace("/login.html");
        }
        else {
            const errReg = await response.json()
            switch(errReg.code){
                case "DuplicateUserName":
                    document.getElementById("result").innerText = "Такой пользователь уже существует"; //its maybe work.. I dk lol
                    break;
            }
        }
    }
    else {
        document.getElementById("result").innerText = "Ошибка! Пароли не одинаковые!";
        return;
    }
}




