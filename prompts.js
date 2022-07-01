module.exports = [
    {
        type: 'confirm',
        name: 'addSectionsFiles',
        message: 'Add vue-sections configuration with first sections page',
        description: 'This will generate a ready to use sections page, vue-sections configuration files and add the required dependencies to your package.json',
        default: false,
    },
    {
        type: 'input',
        name: 'projectUrl',
        message: 'What is your project url:',
        validate: input => !!input,
        default: ''
    },
    {
        type: 'input',
        name: 'projectId',
        message: 'What is your project ID:',
        validate: input => !!input,
        default: ''
    }
]