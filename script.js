async function buscarClima() {
    const cidade = document.getElementById("cidade").value.trim();

    const resultado = document.getElementById("resultado");

    if(!cidade){
        resultado.innerHTML = "Digite uma cidade!"
        return
    };
    const cidades = { };

    if(!cidades[cidade]){
        resultado.innerHTML ="Cidade não encotrada"
        return
    };

    const {lat, lon} = cidades[cidade];

    const apiKey = "8NlspQzxfOTGL7Fa";

    const url = `https://my.meteoblue.com/packages/basic-1h?apikey=${apiKey}&lat=${lat}&lon=${lon}&format=json`;

    try{
        const resposta = await fetch(url)

        if(!resposta.ok) throw new Error("Erro ao buscar dados da API");

        const dados = await resposta.json()

        const temperatura = dados.data_temperature2m[0]
        
        const hora = hora.data_time[0]

        resultado.innerHTML = `${cidade}\nTemperatura: ${temperatura}°C\nHorario: ${hora}`

    } catch(error){
        resultado.innerHTML = "Erro: " + error.message
    }
}


