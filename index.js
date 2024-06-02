fetch("http://localhost:5000/")
    .then((response) => response.json())
    .then((response) => {
        console.log(response)
    }
    )