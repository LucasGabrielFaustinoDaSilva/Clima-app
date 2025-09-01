async function buscarClima(){
    const cidade = document.getElementById("cidade");
    const resultado = document.getElementById("resultado");

    if(!cidade){
        resultado.innerHTML = "Digite uma cidade"
        return
    }
    const apiKey = "b6907d289e10d714a6e88b30761fae22";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const resposta = await fetch(url);
        if(!resposta.ok) throw new Error("Cidade não encontrada");

        const dados = await resposta.json();

        resultado.innerHTML = ` Temperatura em ${dados.name}:${dados.main.temp}°C`

    } catch(error){
        resultado.innerHTML = "Erro" + error.message
    }



}