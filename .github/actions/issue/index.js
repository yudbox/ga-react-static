// https://github.com/vercel/ncc
// т.к.actions не копируют в репозиторий дополнительные модули нужно установить который будет собирать
// indexe.js and node_modules в один файл. Для этого устналиваем пакет по ссылке выше
// устанавливаем пакет
// npm i -g @vercel/ncc
// запускаем билд
// ncc build ./.github/actions/issue/index.js -o ./.github/actions/issue/dist
// и в папке с экшеном появляется папака dist с собранным файлом

// https://github.com/actions/toolkit
// $ npm install @actions/github
// $ npm install @actions/core
//  устанавливаем два пакета

const core = require('@actions/core')
const github = require('@actions/github')

const run = async () => {
    try {
        const token = core.getInput('token')
        const title = core.getInput('title')
        const body = core.getInput('body')
        const assignees = core.getInput('assignees')
    
        const octokit = new github.Github(token)
    
        const response = await octokit.issues.create({
            // owner: github.context.repo.owner,
            // repo: github.context.repo.repo,
            ...github.context.repo,
            title,
            body,
            assignees: assignees ? assignees.split('\n') : undefined
    
        })
    
        core.setOutput('issue', JSON.stringify(response.data))
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()

