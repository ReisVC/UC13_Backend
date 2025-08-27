// Seleciona o formulário de login
document.getElementById("formCadastro").addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede o recarregamento da página
  
    // Captura os valores do formulário
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;
  
    try {
      // Faz a requisição para o endpoint de login
      const resposta = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }) // Envia os dados como JSON
      });
  
      if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(erro);
      }
  
      // Converte a resposta em JSON
      const dados = await resposta.json();
  
      // O token retornado pelo servidor
      const token = dados.token;
  
      // Armazena o token no localStorage
      localStorage.setItem("token", token);

      // Exibe mensagem de sucesso
      document.getElementById("mensagem").textContent = "Login realizado com sucesso!";
      document.getElementById("mensagem").style.color = "green";
      window.location.href = "profile.html"
  
    } catch (erro) {
      console.error("Erro:", erro);
      document.getElementById("mensagem").textContent = "Erro: " + erro.message;
      document.getElementById("mensagem").style.color = "red";
    }
  });
  
