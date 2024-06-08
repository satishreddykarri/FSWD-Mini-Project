// Function to toggle 
function toggleMenu() {
    document.getElementById('navbarMenu').classList.toggle('active');
}
function toggleStatus(button) {
    var status = button.previousElementSibling.querySelector('.status');
    if (status.textContent === 'Available') {
        status.textContent = 'Taken';
        status.classList.remove('available');
        status.classList.add('taken');
    } else {
        status.textContent = 'Available';
        status.classList.remove('taken');
        status.classList.add('available');
    }
}
