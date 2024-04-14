module.exports = {
    apps: [
        {
            name: 'belchfy-py',
            script: './belchfy-py/app.py'
        },
        {
            name: 'belchfy-be',
            cwd: './belchfy-be',
            script: 'npm run serve'
        },
        {
            name: 'belchfy-fe',
            cwd: './belchfy-fe',
            script: 'npm run preview'
        },
        {
            name: 'Stream Updater',
            cwd: './belchfy-be',
            script: 'npm run update-streams',
            cron_restart: '*/30 * * * *'
        }
    ]
}