// https://github.com/vercel/ncc
// т.к.actions не копируют в репозиторий дополнительные модули нужно установить который будет собирать
// indexe.js and node_modules в один файл. Для этого устналиваем пакет по ссылке выше
// устанавливаем пакет
// npm i -g @vercel/ncc
// запускаем билд
// ncc./ github / actions / hello / index.js - o./ github / actions / hello / dist
// и в папке с экшеном появляется папака dist с собранным файлом

// https://github.com/actions/toolkit
// $ npm install @actions/github
// $ npm install @actions/core
//  устанавливаем два пакета

const core = require('@actions/core')
const github = require('@actions/github')

try {
    // throw(new Error("my custom error"))
    // это будет выводится только если в секретах есть ключ ACTIONS_STEP_DEBUG - true
    core.debug('Some debug message')
    core.warning('Some worning message')
    core.error('Some error message')

    const name = core.getInput('who-say-hello')
    core.setSecret(name)
    // в раннере name будет выводится как секрет ***
    console.log(`Hello ${name}`);

    const time = new Date()
    core.setOutput("my-time", time.toLocaleDateString())

    core.startGroup("Logging github object")
    console.log(JSON.stringify(github, null, '\t'));
    core.endGroup()
    // создаст кастомную переменную которую можно будет использовать в action   
    core.exportVariable("CASTOM_VAR", "hello")
} catch (error) {
    core.setFailed(error.message)
}


