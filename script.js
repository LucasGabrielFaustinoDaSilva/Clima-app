async function buscarClima() {
    const cidade = document.getElementById("cidade").value.trim();
    const resultado = document.getElementById("resultado");

    if (!cidade) {
        resultado.innerHTML = "Digite uma cidade!";
        return;
    }

    try {
        // Buscar latitude e longitude
        const geoResp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cidade}`);
        const geoDados = await geoResp.json();

        if (geoDados.length === 0) {
            resultado.innerHTML = "Cidade não encontrada";
            return;
        }

        const lat = geoDados[0].lat;
        const lon = geoDados[0].lon;

        const apiKey = "8NlspQzxfOTGL7Fa";
        const url = `https://my.meteoblue.com/packages/basic-1h?apikey=${apiKey}&lat=${lat}&lon=${lon}&format=json`;

        const resposta = await fetch(url);

        if (!resposta.ok) throw new Error("Erro ao buscar dados");

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
