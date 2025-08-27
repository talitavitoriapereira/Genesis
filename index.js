const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();


const app = express();
const port = process.env.PORT || 3000;

// Serve os arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Configura o body-parser para ler JSON
app.use(bodyParser.json());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação das tabelas
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS aluno (
                id_aluno INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                telefone TEXT,
                email TEXT,
                cpf TEXT NOT NULL UNIQUE,
                rg TEXT NOT NULL UNIQUE,
                genero TEXT,
                data_de_nascimento DATE,
                cep TEXT,
                logradouro TEXT,
                numero INTEGER,
                complemento TEXT,
                cidade TEXT,
                bairro TEXT,
                estado TEXT,
                cgm TEXT,
                curso TEXT NOT NULL,
                periodo TEXT,
                turno TEXT NOT NULL,
                turma TEXT,
                nome_responsavel TEXT,
                parentesco_responsavel TEXT,
                cpf_responsavel TEXT NOT NULL UNIQUE,
                telefone_responsavel TEXT,
                email_responsavel TEXT
    );
        `);

                db.run(`
        CREATE TABLE IF NOT EXISTS funcionario (
               id_funcionario INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                data_de_nascimento DATE,
                cpf TEXT NOT NULL UNIQUE,
                rg TEXT NOT NULL UNIQUE,
                genero TEXT,
                estado_civil TEXT,
                email TEXT,
                email_institucional TEXT,
                telefone TEXT,
                telefone_alternativo TEXT,
                cep TEXT,
                logradouro TEXT,
                numero INTEGER,
                complemento TEXT,
                bairro TEXT,
                cidade TEXT,
                estado TEXT,
                data_adimissão DATE,
                cgm INTEGER,
                cargo TEXT,
                carga_horaria INTEGER,
                contrato TEXT

    );
        
    `);
    


    console.log('Tabelas criadas com sucesso.');
});


///////////////////////////// Rotas para funcionario /////////////////////////////
///////////////////////////// Rotas para funcionario /////////////////////////////
///////////////////////////// Rotas para funcionario /////////////////////////////

// Cadastrar funcionario
app.post('/funcionario', (req, res) => {

    const { nome, data_de_nascimento, cpf, rg, genero, estado_civil, email, email_institucional, telefone, telefone_alternativo, cep, logradouro, numero, complemento , bairro, cidade, estado, data_adimissão, cgm, cargo, carga_horaria, contrato } = req.body;

    if (!nome || !cpf) {
        return res.status(400).send('Nome e CPF são obrigatórios.');
    }

    const query = `INSERT INTO funcionario (  nome, data_de_nascimento, cpf, rg, genero, estado_civil, email, email_institucional, telefone, telefone_alternativo, cep, logradouro, numero, complemento , bairro, cidade, estado, data_adimissão, cgm, cargo, carga_horaria, contrato ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`;
    db.run(query, [  nome, data_de_nascimento, cpf, rg, genero, estado_civil, email, email_institucional, telefone, telefone_alternativo, cep, logradouro, numero, complemento , bairro, cidade, estado, data_adimissão, cgm, cargo, carga_horaria, contrato ], function (err) {
        if (err) {
            return res.status(500).send('Erro ao cadastrar funcionario..');
        }
        res.status(201).send({ id: this.lastID, message: 'Aluno cadastrado com sucesso.' });
    });
});

// Listar funcionario
// Endpoint para listar todos os funcionario ou buscar por CPF
app.get('/funcionario', (req, res) => {
    const cpf = req.query.cpf || '';  // Recebe o CPF da query string (se houver)

    if (cpf) {
        // Se CPF foi passado, busca funcionario que possuam esse CPF ou parte dele
        const query = `SELECT * FROM funcionario WHERE cpf LIKE ?`;

        db.all(query, [`%${cpf}%`], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar funcionario.' });
            }
            res.json(rows);  // Retorna os clientes encontrados ou um array vazio
        });
    } else {
        // Se CPF não foi passado, retorna todos os funcionario
        const query = `SELECT * FROM funcionario`;

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar funcionario.' });
            }
            res.json(rows);  // Retorna todos os funcionario
        });
    }
});



// Atualizar funcionario
app.put('/funcionario/cpf/:cpf', (req, res) => {
    const { cpf } = req.params;
    const {  nome, data_de_nascimento, rg,genero, estado_civil, email, email_institucional, telefone, telefone_alternativo, cep, logradouro, numero, complemento , bairro, cidade, estado, data_adimissão, cgm, cargo, carga_horaria, contrato} = req.body;

    const query = `UPDATE funcionario SET nome = ?, data_de_nascimento = ?, cpf = ?, rg = ?, genero = ?, estado_civil = ?, email = ?, email_institucional = ?, telefone = ?, telefone_alternativo = ?, cep = ?, logradouro = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ?, data_adimissão = ?, cgm = ?, cargo = ?, carga_horaria = ?, contrato = ?`;
    db.run(query, [ nome, data_de_nascimento, cpf, rg, genero, estado_civil, email, email_institucional, telefone, telefone_alternativo, cep, logradouro, numero, complemento , bairro, cidade, estado, data_adimissão, cgm, cargo, carga_horaria, contrato ], function (err) {
        if (err) {
            return res.status(500).send('Erro ao atualizar funcionario.');
        }
        if (this.changes === 0) {
            return res.status(404).send('funcionario não encontrado.');
        }
        res.send('funcionario atualizado com sucesso.');
    });
});





///////////////////////////// Rotas para aluno /////////////////////////////
///////////////////////////// Rotas para aluno /////////////////////////////
///////////////////////////// Rotas para aluno /////////////////////////////



// Cadastrar aluno
app.post('/aluno', (req, res) => {

    const {  nome,telefone, email, cpf, rg, genero, data_de_nascimento, cep, logradouro, numero, complemento, cidade, bairro, estado, cgm, curso, periodo, turno, nome_responsavel, telefone_responsavel, parentesco_responsavel, cpf_responsavel,   email_responsavel } = req.body;

    if (!nome || !cpf) {
        return res.status(400).send('Nome e CPF são obrigatórios.');
    }

    const query = `INSERT INTO aluno ( nome,telefone, email, cpf, rg, genero, data_de_nascimento, cep, logradouro, numero, complemento, cidade, bairro, estado, cgm, curso, periodo, turno, nome_responsavel, telefone_responsavel, parentesco_responsavel, cpf_responsavel,   email_responsavel) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`;
    db.run(query, [ nome,telefone, email, cpf, rg, genero, data_de_nascimento, cep, logradouro, numero, complemento, cidade, bairro, estado, cgm, curso, periodo, turno, nome_responsavel, telefone_responsavel, parentesco_responsavel, cpf_responsavel, email_responsavel ], function (err) {
        if (err) {
            return res.status(500).send('Erro ao cadastrar aluno..');
        }
        res.status(201).send({ id: this.lastID, message: 'Aluno cadastrado com sucesso.' });
    });
});

// Listar aluno
// Endpoint para listar todos os alunos ou buscar por CGM
app.get('/alunos', (req, res) => {
    
    const cgm = req.query.cgm || '';  // Recebe o CGM da query string (se houver)
    console.log("ok");
    if (cgm) {
        // Se CPF foi passado, busca funcionario que possuam esse Cgm ou parte dele
        const query = `SELECT * FROM aluno WHERE cgm LIKE ?`;

        db.all(query, [`%${cgm}%`], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar aluno.' });
            }
            res.json(rows);  // Retorna os alunos encontrados ou um array vazio
        });
    } else {
        // Se Cgm não foi passado, retorna todos os aluno
        const query = `SELECT * FROM aluno`;

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar aluno.' });
            }
            res.json(rows);  // Retorna todos os aluno
        });
    }
});



// Atualizar aluno
app.put('/aluno/cgm/:cgm', (req, res) => {
    const { cgm } = req.params;
    const {  nome,telefone, email,cpf ,rg, genero, data_de_nascimento, cep, logradouro, numero, complemento, cidade, bairro, estado,  curso, periodo, turno, nome_responsavel, telefone_responsavel, parentesco_responsavel, cpf_responsavel,   email_responsavel

    } = req.body;

    const query = `UPDATE aluno SET nome = ?,telefone = ?, email = ?, cpf = ?, rg = ?, genero = ? , data_de_nascimento = ? , cep = ? , logradouro = ? , numero = ? , complemento = ? , cidade = ? , bairro = ? , estado = ? , cgm = ? , curso = ? , periodo = ? , turno = ? , nome_responsavel = ? , telefone_responsavel = ? , parentesco_responsavel = ? , cpf_responsavel = ? ,   email_responsavel = ? `;
    db.run(query, [ nome,telefone, email, cpf, rg, genero, data_de_nascimento, cep, logradouro, numero, complemento, cidade, bairro, estado, cgm, curso, periodo, turno, nome_responsavel, telefone_responsavel, parentesco_responsavel, cpf_responsavel,   email_responsavel

    ], function (err) {
        if (err) {
            return res.status(500).send('Erro ao atualizar aluno.');
        }
        if (this.changes === 0) {
            return res.status(404).send('Aluno não encontrado.');
        }
        res.send('Aluno atualizado com sucesso.');
    });
});










// Teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.send('Servidor está rodando e tabelas criadas!');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
