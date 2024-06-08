// scripts.js
function toggleMenu() {
    document.getElementById('navbarMenu').classList.toggle('active');
}
async function submitForm() {
    event.preventDefault();
    console.log("called Function");
    const userEmail = document.getElementById("email").value;
    console.log(userEmail);
    const userPassword = document.getElementById("password").value;
    console.log(userPassword);
    const sendBody = JSON.stringify({
        "email": userEmail,
        "password": userPassword
    });
    console.log("The body is -----> ", sendBody);
    try {
        const res = await fetch("http://localhost:3000/signin", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: sendBody
        });
        console.log("The response is --->", res.status);
        if (res.status == 404) {
            alert("Sign-in failed! Try again with valid credentials!");
            return;
        }
        const responseData = await res.text();
        alert(responseData);
    } catch (err) {
        console.error("Error during fetch : ", err);
    }
}
