function addRecord(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let gender = document.querySelector('input[name="gender"]').value;
        let languages = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map((c)=>c.id);
        console.log(languages);
        let country = document.getElementById('country').value;

        let senddata = { name, email, gender, languages, country };
        console.log(senddata);
    fetch('http://localhost:3001', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(senddata),

    }).then((res) => {
        return res.json();
    }).then((data) => {
        getUser();
        console.log(data);
    }).catch((e) => {
        console.log(e);
    })
}

function getUser() {
    fetch("http://localhost:3001").then((res) => {
        return res.json();
    }).then((data) => {
        let users = data.users;
        let output = "";
        users.map((user, index) => {
            output += `
            <tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>              
            <td>${user.gender}</td>            
            <td>${user.country}</td>            
            <td>${user.languages}</td>            
            <td>
            <button>Edit</button>
            <button onclick="deleteUser('${user._id}')">Delete</button>
            </td>

            </tr>
            `
        });
        document.getElementById('users_list').innerHTML=output;
    }).catch((e) => {
        console.log(e);
    });
}

getUser();

function deleteUser(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
        fetch(`http://localhost:3001/${id}`, {
            method: 'DELETE',
        })
        .then((res) => res.json())
        .then((data) => {
            getUser();
            console.log(data);
        })
        .catch((e) => {
            console.log(e);
        });
    } else {
        // User clicked Cancel
        console.log('Deletion canceled by user.');
    }
}
