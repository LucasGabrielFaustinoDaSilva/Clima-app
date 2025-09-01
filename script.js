async function buscarClima() {
    const cidadeInput = document.getElementById("cidade");
    const cidade = cidadeInput.value.trim();
    const resultado = document.getElementById("resultado");

    if (!cidade) {
        resultado.innerHTML = "Digite uma cidade!";
        return;
    }

    const cidades = {
        "sao paulo": { lat: -23.5505, lon: -46.6333 },
        "rio de janeiro": { lat: -22.9068, lon: -43.1729 },
        "brasilia": { lat: -15.7975, lon: -47.8919 }
    };

    const cidadeLower = cidade.toLowerCase();
    
    if (!cidades[cidadeLower]) {
        resultado.innerHTML = "Cidade não encontrada";
        return;
    }

    const { lat, lon } = cidades[cidadeLower];
    const apiKey = "8NlspQzxfOTGL7Fa";
    const url = `https://my.meteoblue.com/packages/basic-1h?apikey=${apiKey}&lat=${lat}&lon=${lon}&format=json`;

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar dados");
        }

        const dados = await resposta.json();
        
        const temperatura = dados.data.temperature[0];
        const horaAtual = new Date().toLocaleTimeString();

        resultado.innerHTML = `
            <strong>${cidade}</strong><br>
            Temperatura: ${temperatura}°C<br>
            Horário: ${horaAtual}
        `;

    } catch (error) {
        resultado.innerHTML = "Erro: " + error.message;
    }
}
