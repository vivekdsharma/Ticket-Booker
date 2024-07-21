let button = document.getElementById("button");
let confirm = document.getElementById('confirm');
let tobe = document.getElementById('tobe');
let tobeadd = document.getElementById('tobeadd');

tobe.style.display = "none";

let yourName;
let YourContactNumber;
let YourSeat;

let PersonsDetail = () => {
    yourName = prompt("Enter Your Name");
    YourContactNumber = prompt("Enter Your Contact Detail");
    YourSeat = prompt("Enter preferred seat number(from 1-100)");

    hii();
    tobe.style.display = "block";
}

button.addEventListener('click', PersonsDetail);

let hii = () => {
    tobeadd.innerText = `Name = ${yourName}\nContact Number = ${YourContactNumber}\nSelected Seat Number = ${YourSeat}`;
}

let bookedTickets = JSON.parse(localStorage.getItem('bookedTickets')) || [];
let EnteredNames = JSON.parse(localStorage.getItem('EnteredNames')) || [];
let EnteredPhoneNumber = JSON.parse(localStorage.getItem('EnteredPhoneNumber')) || [];
let bookedTicketsList = document.getElementById("bookedTicketsList");

let bookTicket = () => {
    let ticketNumber = YourSeat;
    if (ticketNumber && !bookedTickets.includes(ticketNumber)) {
        bookedTickets.push(ticketNumber);
        EnteredNames.push(yourName);
        EnteredPhoneNumber.push(YourContactNumber);
        localStorage.setItem('bookedTickets', JSON.stringify(bookedTickets));
        localStorage.setItem('EnteredNames', JSON.stringify(EnteredNames));
        localStorage.setItem('EnteredPhoneNumber', JSON.stringify(EnteredPhoneNumber));
        updateBookedTicketsList();
    } else {
        alert('Ticket number is invalid or already booked.');
    }
}

let updateBookedTicketsList = () => {
    bookedTicketsList.innerHTML = '';
    bookedTickets.forEach((ticket, index) => {
        let li = document.createElement('li');
        li.innerText = ticket;

        li.addEventListener('click', () => {
            alert(`Name: ${EnteredNames[index]}\n Phone Number : ${EnteredPhoneNumber[index]}\n Seat No.: ${ticket} `);
        });

        bookedTicketsList.addEventListener('dblclick', () => {
            bookedTickets.splice(index, 1);
            EnteredNames.splice(index, 1);
            localStorage.setItem('bookedTickets', JSON.stringify(bookedTickets));
            localStorage.setItem('EnteredNames', JSON.stringify(EnteredNames));
            updateBookedTicketsList();
        });

        bookedTicketsList.appendChild(li);
    });
}

confirm.addEventListener('click', bookTicket);

// Initialize the list on page load
updateBookedTicketsList();
