async function buscarClima() {
  const cidade = document.getElementById("cidade").value.trim();
  const resultado = document.getElementById("resultado");

  if (!cidade){
    resultado.innerHTML = "Digite uma cidade!";
    return
  } 

  resultado.innerHTML = "Carregando...";

  try {
    const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cidade)}`);

     const geo = await geoResponse.json();

    if (!geo.length){
      resultado.innerHTML = "Cidade não encontrada";
      return 
    } 
    const { lat, lon } = geo[0];
     const climaResponse = await fetch(`https://my.meteoblue.com/packages/basic-1h?apikey=8NlspQzxfOTGL7Fa&lat=${lat}&lon=${lon}&format=json`);
    const dados = await climaResponse.json();

    const temperatura = dados?.data?.temperature?.[0];
    const horaAtual = new Date().toLocaleTimeString();

    if (temperatura === undefined) {
      resultado.innerHTML = "Não foi possível obter a temperatura.";
      return;
    }

    resultado.innerHTML = `<strong>${cidade}</strong><br>Temperatura: ${dados.data.temperature[0]}°C<br>Horário: ${new Date().toLocaleTimeString()};
    Horário: ${ horaAtual}
    `;
  } catch (error) {
    resultado.innerHTML = "Erro: " + error.message;
  }
}
