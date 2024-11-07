function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key' : 'TU2dc46f39bfdd611bcc2a2faae0ee77d5a575fe054d6639d4996a4ec92fe42edfad80332ba0b7d4047a2594d9e4683e88'
        },
        body: JSON.stringify({
            "UserName": username,
            "PassWord": password,
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message || 'Login successful!';

        if (data.status) {
            // Successfully logged in
            showAccountInfo(data);
            document.getElementById('userNameDisplay').innerText = `Name: ${data.displayname_th || 'N/A'}`;

        } else {
            openPopup(); 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        openPopup(); 
    });
}

function showAccountInfo(data) {
    const accountInfoContainer = document.getElementById('accountInfo');

    // Generate HTML for the account information card
    accountInfoContainer.innerHTML = `
        <div class="account-info-card">
            <h3>Account Information</h3>
            <div class="info-container">
                <div class="info-item">
                    <p class="info-label">Username:</p>
                    <p class="info-value">${data.username || 'N/A'}</p>
                </div>
                <div class="info-item">
                    <p class="info-label">Display Name (TH):</p>
                    <p class="info-value">${data.displayname_th || 'N/A'}</p>
                </div>
                <div class="info-item">
                    <p class="info-label">Display Name (EN):</p>
                    <p class="info-value">${data.displayname_en || 'N/A'}</p>
                </div>
                <div class="info-item">
                    <p class="info-label">Type:</p>
                    <p class="info-value">${data.type || 'N/A'}</p>
                </div>
                <div class="info-item">
                    <p class="info-label">Email:</p>
                    <p class="info-value">${data.email || 'N/A'}</p>
                </div>
                <div class="info-item">
                    <p class="info-label">Department:</p>
                    <p class="info-value">${data.department || 'N/A'}</p>
                </div>
                <div class="info-item">
                    <p class="info-label">Faculty:</p>
                    <p class="info-value">${data.faculty || 'N/A'}</p>
                </div>
                <div class="info-item">
                    <p class="info-label">Current Status:</p>
                    <p class="info-value">${data.tu_status || 'N/A'}</p>
                </div>
            </div>
        </div>
    `;

    // Show the account info container
    accountInfoContainer.style.display = 'block'; 
    accountInfoContainer.classList.add('show');    
}

function openPopup() {
    document.getElementById('loginFailPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('loginFailPopup').style.display = 'none';
}

function togglePassword() {
    var passwordField = document.getElementById("password");
    var toggleBtn = document.querySelector(".toggle-password");
    
    if (passwordField.type === "password") {
        passwordField.type = "text";  
        toggleBtn.textContent = "Hide"; 
    } else {
        passwordField.type = "password";  
        toggleBtn.textContent = "Show";  
    }
}
