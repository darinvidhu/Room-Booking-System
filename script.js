const apiUrl = 'http://localhost:5000'; // Ensure this matches your backend URL

document.getElementById('toggleAuth').addEventListener('click', () => {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('registerForm').classList.toggle('hidden');
});

document.getElementById('registerButton').addEventListener('click', async () => {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const phone = document.getElementById('registerPhone').value;

    try {
        const res = await fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, phone }),
        });
        const data = await res.json();
        alert(data.message);
        if (res.ok) {
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('loginForm').classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error registering:', error);
    }
});

document.getElementById('loginButton').addEventListener('click', async () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        alert(data.message);
        if (res.ok) {
            // Redirect to the room booking section on successful login
            document.getElementById('authSection').classList.add('hidden');
            document.getElementById('roomBookingSection').classList.remove('hidden');
            loadRooms();  // Load available rooms after login
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
});

async function loadRooms() {
    try {
        const res = await fetch(`${apiUrl}/rooms`); // Make sure to use /rooms here
        if (!res.ok) {
            const errorText = await res.text(); // Log the error response for debugging
            console.error('Error loading rooms:', errorText);
            return; // Exit the function on error
        }
        const rooms = await res.json();
        displayRooms(rooms);
    } catch (error) {
        console.error('Error loading rooms:', error);
    }
}

function displayRooms(rooms) {
    const roomList = document.getElementById('roomList');
    roomList.innerHTML = '';
    rooms.forEach((room) => {
        const roomDiv = document.createElement('div');
        roomDiv.innerHTML = `${room.type} - Rs.${room.price}`;
        roomList.appendChild(roomDiv);
    });
    
    // Show the booking button only when rooms are loaded
    document.getElementById('bookRoomButton').classList.remove('hidden');
}

document.getElementById('bookRoomButton').addEventListener('click', () => {
    const selectedRoomType = document.querySelector('input[name="room"]:checked'); // Get selected radio button
    const name = document.getElementById('userName').value; // Get name from input
    const phone = document.getElementById('userPhone').value; // Get phone from input

    if (selectedRoomType && name && phone) {
        bookRoom(selectedRoomType.value, name, phone); // Pass the values to bookRoom function
    } else {
        alert('Please select a room and provide your name and phone number.');
    }
});

async function bookRoom(roomType, name, phone) {
    try {
        const res = await fetch(`${apiUrl}/rooms/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomType, name, phone }),
        });
        const data = await res.json();
        
        // Update booking details section
        if (data.success) {
            updateBookingTable(name, phone, roomType);
            alert('Room booked!'); // Changed to "Room booked!"
        } else {
            alert('Room booked'); // Changed to "Room booked"
        }
    } catch (error) {
        console.error('Error booking room:', error);
    }
}

function updateBookingTable(name, phone, roomType) {
    const bookingDetailsSection = document.getElementById('bookingDetailsSection');
    bookingDetailsSection.classList.remove('hidden'); // Show the section
    
    const bookingTableBody = document.getElementById('bookingTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${phone}</td>
        <td>${roomType}</td>
    `;
    bookingTableBody.appendChild(newRow); // Append new booking
}
