// scripts.js

// Function to include the navbar
function includeNavbar() {
    document.getElementById('navbar').innerHTML = '<object type="text/html" data="navbar.html" ></object>';
}
function toggleMenu() {
    document.getElementById('navbarMenu').classList.toggle('active');
}
// Call the function to include the navbar
includeNavbar();

// Handle Take Book Form Submission
document.getElementById('takeBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var bookName = event.target.bookName.value;
    alert('Request to take the book "' + bookName + '" has been submitted!');
    // You can handle the form submission and data processing here
});
async function submitForm() {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    console.log("called Function");

    const bookName = document.getElementById("bookName").value;
    console.log("Book Name: ", bookName);

    const sendBody = JSON.stringify({
        "name": bookName
    });
    console.log("The body is -----> ", sendBody);

    try {
        const res = await fetch("http://localhost:3000/returnbook", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: sendBody
        });

        console.log("The response is --->", res.status);
        if (res.status === 404) {
            alert("Book not found!");
            return;
        }
        const responseData = await res.text();
        alert(responseData);
    } catch (err) {
        console.error("Error during fetch: ", err);
    }
}