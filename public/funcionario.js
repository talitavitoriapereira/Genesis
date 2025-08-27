async function cadastrarfuncionario(event) {
    event.preventDefault();

    const funcionario = {
        nome: document.getElementById('func-nome').value,
        data_de_nascimento: document.getElementById('func-data-nascimento').value,
        cpf:document.getElementById('func-cpf').value,
        rg: document.getElementById('func-rg').value,
        genero: document.getElementById('func-genero').value,
        estado_civil: document.getElementById('func-estado-civil').value,
        email: document.getElementById('func-email').value,
        email_institucional: document.getElementById('func-email-institucional').value,
        telefone: document.getElementById('func-telefone').value,
        telefone_alternativo: document.getElementById('func-telefone-alternativo').value,
        cep: document.getElementById('func-cep').value,
        logradouro: document.getElementById('func-logradouro').value,
        numero: document.getElementById('func-numero').value,
        complemento: document.getElementById('func-complemento').value,
        bairro: document.getElementById('func-bairro').value,
        cidade: document.getElementById('func-cidade').value,
        estado: document.getElementById('func-estado').value,
        data_adimissão: document.getElementById('func-data-admissao').value,
        cgm: document.getElementById('func-matricula').value,
        cargo: document.getElementById('func-cargo').value,
        carga_horaria: document.getElementById('func-carga-horaria').value,
        contrato: document.getElementById('func-tipo-contrato').value
    };
       
    try {
        const response = await fetch('/funcionario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
        });

        const result = await response.json();
        if (response.ok) {
            alert('Funcionario cadastrado com sucesso!');
            //document.getElementById('cliente-form').reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error('Erro na solicitação:', err);
        alert('Erro ao cadastrar cliente.');
    }
}

// Função para listar todos os funcionario ou buscar funcionario por CPF
async function listarfuncionario() {
    // const cpf = document.getElementById('cpf').value.trim();  // Pega o valor do CPF digitado no input
    const nome = document.getElementById('funcionario-nome').value.trim();
    const cpf = document.getElementById('funcionario-cpf').value.trim();
    const email = document.getElementById('funcionario-email').value.trim();
    const telefone_responsavel = document.getElementById('resp0-telefone').value.trim();

    let url = '/funcionario';  // URL padrão para todos os funcionario

    if (cpf) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?cpf=${cpf}`;
    }

    try {
        const respo = await fetch(url);
        const funcionario = await respo.json();

        const tabela = document.getElementById('tabela-funcionario');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (!Array.isArray(funcionario) || funcionario.length === 0) {
            // Caso não encontre funcionario, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="6">Nenhum funcionario encontrado.</td></tr>';
        } else {
            funcionario.forEach(funcionarioItem => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${funcionario.nome}</td>
                    <td>${funcionario.cpf}</td>
                    <td>${funcionario.email}</td>
                    <td>${funcionario.telefone}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar funcionario:', error);
    }
}

// Função para atualizar as informações do funcionario
async function atualizarfuncionario() {
    const nome = document.getElementById('funcionario-nome').value;
    const cpf = document.getElementById('funcionario-cpf').value;
    const email = document.getElementById('funcionario-email').value;
    const telefone_responsavel = document.getElementById('resp0-telefone').value;

    const funcionarioAtualizado = {
        nome,
        cpf,
        email,
        telefone_responsavel,
    };

    try {
        const respo = await fetch(`/funcionario/cpf/${cpf}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionarioAtualizado)
        });

        if (respo.ok) {
            alert('funcionario atualizado com sucesso!');
        } else {
            const errorMessage = await respo.text();
            alert('Erro ao atualizar funcionario: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar funcionario:', error);
        alert('Erro ao atualizar funcionario.');
    }
}
