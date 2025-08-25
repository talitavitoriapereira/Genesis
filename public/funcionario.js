async function cadastrarfuncionario(event) {
    event.preventDefault();

    const funcionario = {
        nome: document.getElementById('func-nome').value,
        data_de_nascimento: document.getElementById('func-data-nascimento').value,
        cpf:document.document.getElementById('func-cpf').value,
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
        numero_matricula: document.getElementById('func-matricula').value,
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
            alert('Cliente cadastrado com sucesso!');
            //document.getElementById('cliente-form').reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error('Erro na solicitação:', err);
        alert('Erro ao cadastrar cliente.');
    }
}