async function LoadUsers() {
    const response = await fetch('/api/users');
    if (!response.ok){
        console.error("Не удалось загрузить пользователей");
        return;
    }
    const users = await response.json();

    const select = document.getElementById('userSelect');
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        select.appendChild(option);
    });
}

loadUsers();