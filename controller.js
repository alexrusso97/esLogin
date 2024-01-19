function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function login() {
    const emailIn = document.getElementById("emailIn");
    const email = emailIn.value.trim();

    if (!isValidEmail(email)) {
        alert('Inserisci un indirizzo email valido.');
        return;
    }

    localStorage.setItem("emailLoggato", email);

    let accessi = parseInt(localStorage.getItem(`${email}_accessCount`) || 0) + 1;
    localStorage.setItem(`${email}_accessCount`, accessi);

    const lastAccessDate = localStorage.getItem(`${email}_lastAccessDate`);
    const currentDate = new Date().toLocaleString();
    localStorage.setItem(`${email}_lastAccessDate`, currentDate);
    localStorage.setItem(`${email}_lastAccessDatePrevious`, lastAccessDate);

    document.body.innerHTML = "";

    if (accessi > 1) {
        const accessCounter = document.createElement('div');
        accessCounter.innerHTML = `<div> Accessi: ${accessi} </div>`;
        document.body.appendChild(accessCounter);

        const bentornato = document.createElement('div');
        bentornato.innerHTML = `<div style="display: flex; transform: translate(-50%, -50%); position: absolute; top: 50%; left: 50%;">
        Bentornato ${email} <button id="btn-logout" onclick="logout()">Logout</button></div>`;
        document.body.appendChild(bentornato);

        const lastAccessDiv = document.createElement('div');
        lastAccessDiv.innerHTML = `
        <div>
        ${lastAccessDate}</div>`;
        document.body.appendChild(lastAccessDiv);

    } else {
        const benvenuto = document.createElement('div');
        benvenuto.innerHTML = `<div style="display: flex; transform: translate(-50%, -50%); position: absolute; top: 50%; left: 50%;">
        Benvenuto ${email} <button id="btn-logout" onclick="logout()">Logout</button></div>`;
        document.body.appendChild(benvenuto);
    }
}

function logout() {

    location.reload();
}



