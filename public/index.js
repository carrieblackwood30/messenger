const loginInput = document.querySelector(".loginInput")
const btnInput = document.querySelector(".btnInput")
const chatContainer = document.querySelector(".chat-container")
const login = document.querySelector(".login")
const messageInput = document.querySelector(".messageInput")
const submitMessage = document.querySelector(".submitBtn")

const URL = "http://localhost:3000/message"

let messageArray = []

let user = sessionStorage.getItem("user")
console.log(user)

if (user !== null) {
    login.classList.add("offDisplay")
}

btnInput.addEventListener("click" ,() =>{
    user = loginInput.value
    sessionStorage.setItem("user", user)
    login.classList.add("offDisplay")

    let addedUser = document.createElement('p')
    addedUser.innerHTML = `${user} is here!`
    addedUser.classList.add("newUserGreetings")
    chatContainer.append(addedUser)
})

async function get_Messages() {
    try {
        const resp = await fetch(URL)
        const data = await resp.json()
        return data
    } catch (err) {
        return err;
    }
}

async function post_Messages() {
    try {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: messageInput.value,
                chooseUser: user
            }),
        }
        const resp = await fetch(URL, options)
        const data = await resp.json()
        return data
    } catch (err) {
        return err
    }
}

function createMessage(messageArr) {
    for (let i = 0; i < messageArr.length; i++) {
        let card = document.createElement('div')
        let name = document.createElement('h5')
        let message = document.createElement('p')

        card.classList.add("card")
        name.innerText = messageArr[i].chooseUser
        name.classList.add("name")
        message.innerHTML += messageArr[i].message
        card.append(name, message)
        chatContainer.append(card)
    }

}

submitMessage.addEventListener("click" ,(e) =>{
    e.preventDefault()
    post_Messages()
    createMessage()
})

get_Messages()
    .then((messageArr) => {
        messageArray = messageArr
        console.log(messageArr)
        createMessage(messageArr)
    })
    .catch((err) => console.log(err))