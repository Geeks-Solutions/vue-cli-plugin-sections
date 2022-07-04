console.log("In order to setup section you need to get your projectId and projectUrl by registering an account on https://sections.geeks.solutions")

module.exports = [
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
    },
    {
        type: 'confirm',
        name: 'addSectionsFiles',
        message: 'Add vue-sections configuration with first sections page',
        description: 'This will generate a ready to use sections page',
        default: false,
    }
]