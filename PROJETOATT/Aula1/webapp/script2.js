function confirmarCadastro() {
    var nome = document.getElementById("nome").value;
    var cpf = document.getElementById("cpf").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    // Cria um objeto com os dados do usuário
    var usuario = {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha
    };

    // Armazena o objeto no localStorage
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Redireciona para a página de confirmação
    window.location.href = "ConfirmacaoCadastro.html";
    window.location.href = "confirmacaopagamento.html";
}