async function buscarClima(){
    const cidade = document.getElementById("cidade");
    const resultado = document.getElementById("resultado");

    if(!cidade[cidade]){
        resultado.innerHTML = "Digite uma cidade"
        return
    }
    const cidades = {
            "Sao Paulo": { lat: -23.55, lon: -46.63 },
                "Rio de Janeiro": { lat: -22.91, lon: -43.17 },
                    "Brasilia": { lat: -15.78, lon: -47.93 }
                      };
    }

    const {lat, lon} = cidades[cidade]
    const apiKey = "8NlspQzxfOTGL7Fa";
    const url = `https://my.meteoblue.com/packages/basic-1h?apikey=${apiKey}&lat=${lat}&lon=${lon}&format=json`;
    

    try {
        const resposta = await fetch(url);
        if(!resposta.ok) throw new Error("Cidade não encontrada");

        const dados = await resposta.json();

        const temperatura = dados.data_temperature2m[0]


        resultado.innerHTML = ` Temperatura em ${cidade}:${temperatura}°C`

    } catch(error){
        resultado.innerHTML = "Erro: " + error.message
    }



