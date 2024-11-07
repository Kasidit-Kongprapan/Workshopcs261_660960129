document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent default form submission
    submitLogin();  // Call the submitLogin function
});

function submitLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const loginData = {
        userName: username,
        password: password
    };

    // Show loading indicator
    document.getElementById("loading").style.display = 'block';

    fetch('http://localhost:8080/api/students/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("loading").style.display = 'none';
        if (data.message) {
            document.getElementById("message").innerHTML = `
                <h2>Welcome, ${data.eng_name}</h2>
                <p>Faculty: ${data.faculty}</p>
            `;
        } else {
            document.getElementById("message").innerText = data.message;
        }
    })
    .catch(error => {
        document.getElementById("loading").style.display = 'none';
        console.error('Error during fetch:', error);
        document.getElementById("message").innerText = "Error occurred. Please try again.";
    });
}
