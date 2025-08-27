console.log("a")
// Seleciona o formulário e adiciona um "ouvinte" para o evento de submit
document.getElementById("formCadastro").addEventListener("submit", async function(event) {
  event.preventDefault(); // Impede o recarregamento da página

  // Captura os valores do formulário
  const name = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  try {
    // Faz a requisição para a API
    const resposta = await fetch("http://localhost:3000/auth/register", {
      method: "POST", // Tipo da requisição
      headers: {
        "Content-Type": "application/json" // Informa que está enviando JSON
      },
      body: JSON.stringify({ name, email, password }) // Converte os dados em JSON
    });

    // Se a resposta não for bem-sucedida, lança um erro
    if (!resposta.ok) {
      const erro = await resposta.text();
      throw new Error(erro);
    }

    // Converte a resposta da API em objeto JavaScript
    const dados = await resposta.json();

    limpaCampos("input")

    // Mostra mensagem de sucesso
    document.getElementById("mensagem").textContent = "✅ Usuário cadastrado com sucesso!";
    document.getElementById("mensagem").style.color = "green";

  } catch (erro) {
    // Mostra mensagem de erro
    document.getElementById("mensagem").textContent = "❌ Erro: " + erro.message;
    document.getElementById("mensagem").style.color = "red";
  }

  
});

function limpaCampos(tag) {

    document.querySelectorAll(tag).forEach((a) => {
      a.value = "";
    })
}
