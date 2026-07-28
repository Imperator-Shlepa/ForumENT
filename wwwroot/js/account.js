window.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        window.location.replace("/login.html");
        return;
    }

    const response = await fetch("/api/account/manage/info", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.replace("/login.html");
        return;
    }

    const data = await response.json();

    document.getElementById("UserName").textContent = data.email;
    document.getElementById("NName").textContent = data.email;
});