const express = require('express')
const cors = require('cors')

const app = express()
const port = 3001;
app.use(express.json())

app.use(cors({origin:'http://localhost:3000',credentials:true}))

const funcionarioRota = require('./routes/funcionarioRoutes')
app.use('/funcionario',funcionarioRota);


const turmaRota = require('./routes/turmaRoutes')
app.use('/turma',turmaRota);


const disciplinasRota = require('./routes/disciplinaRoutes')
app.use('/disciplina', disciplinasRota)


const alunoRoutes = require('./routes/alunoRoutes')
app.use('/aluno',alunoRoutes);

const cronogramaRoutes = require('./routes/cronogramaRoutes')
app.use('/cronograma',cronogramaRoutes)

const notasController = require('./routes/notaRoutes')
app.use('/notas',notasController)


app.listen(port, ()=> {
    console.log('Rodando na porta: '+ port);
})
