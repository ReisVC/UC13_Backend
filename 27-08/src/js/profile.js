// Função para carregar dados do usuário
async function carregarPerfil() {
    const token = localStorage.getItem("token"); // pega token do localStorage

    if (!token) {
      document.getElementById("mensagem").textContent = "Usuário não autenticado!";
      document.getElementById("mensagem").style.color = "red";
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3000/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token // envia token
        }
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(erro);
      }

      const user = await resposta.json();

      // Preenche os campos com os dados retornados
      document.getElementById("nome").value = user.name || "";
      document.getElementById("email").value = user.email || "";

    } catch (erro) {
      console.error("Erro:", erro);
      document.getElementById("mensagem").textContent = "Erro ao carregar perfil: " + erro.message;
      document.getElementById("mensagem").style.color = "red";
    }
  }

async function atualizar() {
    document.getElementById("btnAtualizar");
}

async function deletar() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;
    const token = localStorage.token

    try {
      // Faz a requisição para o endpoint de login
      const resposta = await fetch("http://localhost:3000/users/me", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token // envia token
        },
        
      });
  
      if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(erro);
      }
  
      // Converte a resposta em JSON
      const dados = await resposta.json();
  
      // O token retornado pelo servido
      // Exibe mensagem de sucesso
      
      window.location.href = "../index.html"
  
    } catch (erro) {
      console.error("Erro:", erro);
      document.getElementById("mensagem").textContent = "Erro: " + erro.message;
      document.getElementById("mensagem").style.color = "red";
    }
}

  // Carrega o perfil assim que a página é aberta
  window.addEventListener("DOMContentLoaded", carregarPerfil);
