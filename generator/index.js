const axios = require('axios');

module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        dependencies: {
            "@geeks.solutions/vue-sections": "^1.0.23",
            "bootstrap-vue": "^2.21.2",
            "cookie-universal-nuxt": "^2.1.4",
            "nuxt-i18n": "^6.20.5",
            "vue-metamask": "^2.2.1",
            "web3": "^1.7.3",
            "js-sha256": "^0.9.0"
        }
    })
    api.render('./template/vue-sections', {
        ...options,
    })
    if (options.addSectionsFiles) {
        api.render('./template/vue-sections-first-page', {
            ...options,
        })
    }
    if (options.addReadyToUseSectionTypes) {
        api.render('./template/ready-to-use-section-types', {
            ...options,
        })
    }
}

module.exports.hooks = (api, options) => {
    api.afterInvoke(() => {
        const {EOL} = require('os')
        const fs = require('fs')
        const contentMain = fs.readFileSync(api.resolve('nuxt.config.js'), {encoding: 'utf-8'})
        const lines = contentMain.split(/\r?\n/g)

        const renderIndex1 = lines.findIndex(line => line.match(/plugins:/))
        lines[renderIndex1] = lines[renderIndex1].replace(`[`, `[\r{ src: '~/plugins/sections.js', ssr: false },`)

        const renderIndex2 = lines.findIndex(line => line.match(/modules:/))
        lines[renderIndex2] = lines[renderIndex2].replace(`[`, `[\r'bootstrap-vue/nuxt',
    [
      "nuxt-i18n",
      {
        lazy: true,
        locales: [
          {
            name: "English",
            code: "en",
            iso: "en",
            file: "en.js"
          }
        ],
        loadLanguagesAsync: true,
        langDir: "lang/",
        defaultLocale: "en"
      }
    ],`)

        fs.writeFileSync(api.resolve('nuxt.config.js'), lines.join(EOL), {encoding: 'utf-8'})

        api.onCreateComplete(async () => {

            if(options.addReadyToUseSectionTypes) {
                await axios.post(`https://api.sections-saas.k8s-dev.geeks.solutions/api/v1/login`,
                    {
                        email: options.email,
                        password: options.password
                    }
                    , {
                    headers: {
                        'project-id-1': '1',
                        'access-control-request-headers': 'project-id-1',
                        origin: 'https://sections-saas.k8s-dev.geeks.solutions'
                    }
                }).then( async (res) => {
                    await axios.get(`https://api.sections-saas.k8s-dev.geeks.solutions/api/v1/project/${res.data.projects[0].saas_project_id}/generate_auth_code`
                        , {
                            headers: {
                                'project-id-1': '1',
                                'access-control-request-headers': 'project-id-1',
                                origin: 'https://sections-saas.k8s-dev.geeks.solutions',
                                token: res.data.token.token
                            }
                        }).then(async (res) => {
                        const authCode = res.data.url.substring(res.data.url.indexOf('auth_code=') +10, res.data.url.length)
                        await axios.get(`https://api.sections-saas.k8s-dev.geeks.solutions/api/v1/project/${options.projectId}/token/${authCode}`
                            , {
                                headers: {
                                    'project-id-1': '1',
                                    'access-control-request-headers': 'project-id-1',
                                    origin: 'https://sections-saas.k8s-dev.geeks.solutions'
                                }
                            }).then(async (res) => {
                                const sectionTypeNames = ['TermsPolicy', 'TextButtonRow', 'nftSection']
                            for (const typeName of sectionTypeNames) {
                                await axios.post(`https://api.sections-saas.k8s-dev.geeks.solutions/api/v1/project/${options.projectId}/section-types/${typeName}`
                                    , {},
                                    {
                                        headers: {
                                            'project-id-1': '1',
                                            'access-control-request-headers': 'project-id-1',
                                            origin: 'https://sections-saas.k8s-dev.geeks.solutions',
                                            token: res.data.token
                                        }
                                    }).then((res) => {
                                }).catch((e) => {
                                })
                            }
                        }).catch((e) => {
                        })
                    }).catch((e) => {
                    })
                }).catch((e) => {
                })
            }

            const contentSections = fs.readFileSync(api.resolve('plugins/sections.js'), {encoding: 'utf-8'})
            const linesSections = contentSections.split(/\r?\n/g)

            const renderSectionsIndex1 = linesSections.findIndex(line => line.match(/projectId:/))
            linesSections[renderSectionsIndex1] = linesSections[renderSectionsIndex1].replace(`""`, `"${options.projectId}"`)

            const renderSectionsIndex2 = linesSections.findIndex(line => line.match(/projectUrl:/))
            linesSections[renderSectionsIndex2] = linesSections[renderSectionsIndex2].replace(`""`, `"${options.projectUrl}"`)

            fs.writeFileSync(api.resolve('plugins/sections.js'), linesSections.join(EOL), {encoding: 'utf-8'})
        })
    })
}