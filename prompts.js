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
    },
    {
        type: 'confirm',
        name: 'addReadyToUseSectionTypes',
        message: 'Add 2 ready to use section types to your project',
        description: 'This will generate 11 ready to use section types',
        default: false,
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email:',
        when: answers => answers.addReadyToUseSectionTypes === true,
        validate: input => !!input,
        default: ''
    },
    {
        type: 'input',
        name: 'password',
        message: 'What is your password:',
        when: answers => answers.addReadyToUseSectionTypes === true,
        validate: input => !!input,
        default: ''
    },
]