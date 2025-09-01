async function buscarClima() {
  const cidade = document.getElementById("cidade").value.trim();
  const resultado = document.getElementById("resultado");

  if (!cidade) return resultado.innerHTML = "Digite uma cidade!";

  resultado.innerHTML = "Carregando...";

  try {
    const geo = await (await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cidade)}`)).json();
    if (!geo.length) return resultado.innerHTML = "Cidade não encontrada";

    const { lat, lon } = geo[0];
    const dados = await (await fetch(`https://my.meteoblue.com/packages/basic-1h?apikey=8NlspQzxfOTGL7Fa&lat=${lat}&lon=${lon}&format=json`)).json();

    resultado.innerHTML = `<strong>${cidade}</strong><br>Temperatura: ${dados.data.temperature[0]}°C<br>Horário: ${new Date().toLocaleTimeString()}`;

  } catch (e) {
    resultado.innerHTML = "Erro: " + e.message;
  }
}            Horário: ${horaAtual}
        `;

    } catch (error) {
        resultado.innerHTML = "Erro: " + error.message;
    }
}
