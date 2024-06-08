function toggleMenu() {
    document.getElementById('navbarMenu').classList.toggle('active');
}
function togglePassword(id) {
    var input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}
async function submitForm() {
    event.preventDefault();
    console.log("called Function");
    const userName = document.getElementById("name").value;
    console.log(userName);
    const userPhone = document.getElementById("phone").value;
    console.log(userPhone);
    const userEmail = document.getElementById("email").value;
    console.log(userEmail);
    const userPassword = document.getElementById("password").value;
    console.log(userPassword);
    const confirmPassword = document.getElementById("confirm-password").value;
    console.log(confirmPassword);
    if (userPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
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