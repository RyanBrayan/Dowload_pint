document.getElementById('downloadButton').onclick = function() {
    const url = document.getElementById('url').value;
    const name = document.getElementById('name').value;

    if (!url || !name) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const messageElement = document.getElementById('message');
    messageElement.innerHTML = "Baixando...";

    fetch('http://127.0.0.1:5000/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url, name: name })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao baixar o vídeo.');
        }
        return response.blob();
    })
    .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${name}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        messageElement.innerHTML = `Download concluído com sucesso para ${name}.mp4!`;
    })
    .catch(error => {
        messageElement.innerHTML = error.message;
    });
};
