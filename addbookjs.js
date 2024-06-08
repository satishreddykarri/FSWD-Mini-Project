async function submitForm() {
    event.preventDefault(); 
    console.log("called Function");

    const bookName = document.getElementById("bookName").value;
    const bookPrice = document.getElementById("price").value;
    console.log("Book Name: ", bookName);
    console.log("Book Price: ", bookPrice);

    const sendBody = JSON.stringify({
        "name": bookName,
        "price": bookPrice
    });
    console.log("The body is -----> ", sendBody);

    try {
        const res = await fetch("http://localhost:3000/addbook", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: sendBody
        });

        console.log("The response is --->", res.status);
        if (res.status !== 200) {
            alert("Error adding book!");
            return;
        }
        const responseData = await res.text();
        alert(responseData);
    } catch (err) {
        console.error("Error during fetch: ", err);
    }
}