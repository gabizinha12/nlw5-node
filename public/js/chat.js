document.querySelector("#start_chat").addEventListener("click", (event) => {
    const chat_help = document.getElementById('chat_help');
  chat_help.style.display = 'none';

  const email = document.getElementById('email').value;
  const text = document.getElementById('txt_help').value;

  const chat_in_support = document.getElementById('chat_in_support');
  chat_in_support.style.display = 'block';

  const socket = io();
  const params = {
      email,
      text
  }


  socket.on("connect", () => {
      socket.emit("client_first_access", params, (callback, err) => {
      if(err) {
           console.error(err)
      } else {
          console.log(call)
      }
      })
  })
});
