// Função para carregar dados do usuário
async function carregarPerfil() {
  const token = localStorage.getItem("token"); // pega token do localStorage

  if (!token) {
    location.replace("../index.html");
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

function escreverTexto(texto, elementoId, velocidade = 50) {
  const elemento = document.getElementById(elementoId);
  let i = 0;

  elemento.textContent = ""; // limpa antes de escrever

  const intervalo = setInterval(() => {
    if (i < texto.length) {
      elemento.textContent += texto.charAt(i);
      i++;
    } else {
      clearInterval(intervalo);
    }
  }, velocidade);
}

async function atualizar() {
  const name = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("senha").value.trim();
  const token = localStorage.token

  try {

    document.getElementById("btnAtualizar").disabled = true;
    document.getElementById("btnAtualizar").style.backgroundColor = "rgba(199, 199, 37, 1)";
    document.getElementById("btnAtualizar").textContent = "Atualizando...";

    const body = {}
    if (!(name == "")) { body.name = name }
    if (!(email == "")) { body.email = email }
    if (!(password == "")) { body.password = password }

    // Faz a requisição para o endpoint de login
    const resposta = await fetch("http://localhost:3000/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token // envia token
      },
      body: JSON.stringify(body)
    });

    if (!resposta.ok) {
      const erro = await resposta.text();
      throw new Error(erro);
    }

    // Converte a resposta em JSON
    

    setTimeout(() => {
      document.getElementById("btnAtualizar").disabled = false;
      document.getElementById("btnAtualizar").textContent = "Atualizar";
      document.getElementById("btnAtualizar").style.backgroundColor = "yellow";

      document.getElementById("mensagem").textContent = "Perfil atualizado com sucesso!";
      document.getElementById("mensagem").style.color = "green";
    }, 2000);


  } catch (erro) {
    console.error("Erro:", erro);
    document.getElementById("mensagem").textContent = "Erro: " + erro.message;
    document.getElementById("mensagem").style.color = "red";
  }
}

async function deletar() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;
  const token = localStorage.token

  try {

    var confirmacao = confirm("Tem certeza que deseja enviar os dados?");
    if (confirmacao) {

      document.getElementById("btnDeletar").disabled = true;
      document.getElementById("btnDeletar").style.backgroundColor = "rgba(184, 38, 38, 1)";
      document.getElementById("btnDeletar").textContent = "Deletando...";
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

      document.getElementById("mensagem").textContent = "";
      escreverTexto("Perfil deletado com sucesso! Redirecionando...", "mensagem", 50);
      document.getElementById("mensagem").style.color = "green";


      setTimeout(() => {
        localStorage.removeItem("token");
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("senha").value = "";
        location.replace("../index.html");
      }, 4000);

    }
  } catch (erro) {
    console.error("Erro:", erro);
    document.getElementById("mensagem").textContent = "Erro: " + erro.message;
    document.getElementById("mensagem").style.color = "red";
  }
}



// Carrega o perfil assim que a página é aberta
window.addEventListener("DOMContentLoaded", carregarPerfil);
