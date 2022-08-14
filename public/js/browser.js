const submitBtn = document.querySelector('.submit');

async function addPost(event) {
    const title = document.querySelector('input=[name="title"]').value;
    const message = document.querySelector('input[name="message"]').value;

    event.preventDefault();
    const data = {
        message: message,
        title: title,
    }

    const response = await fetch('/post', {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else if (err) console.log(err);
};

submitBtn.addEventListener('click', addPost);