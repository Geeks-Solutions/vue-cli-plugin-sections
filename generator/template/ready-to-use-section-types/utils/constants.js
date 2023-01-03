export function getTranslation(settings, lang, primaryKey, frKey) {
  if(settings[lang]) {
    if(lang === 'fr') {
      return settings[lang][primaryKey] === '' ? settings[frKey] : settings[lang][primaryKey]
    } else return settings[lang][primaryKey] === '' ? settings[primaryKey] : settings[lang][primaryKey]
  } else return lang === 'fr' ? settings[frKey] : settings[primaryKey]
}

export function getArray(settings, lang, primaryKey, frKey) {
  if(settings[lang]) {
    if(lang === 'fr') {
      if(settings[lang][primaryKey] != null) {
        return settings[lang][primaryKey] === '' ? settings[frKey] === '' ? [] : settings[frKey].split('-') : settings[lang][primaryKey].split('-')
      }
    } else return settings[lang][primaryKey] === '' ? settings[primaryKey] === '' ? [] : settings[primaryKey].split('-') : settings[lang][primaryKey].split('-')
  } else return lang === 'fr' ? (settings[frKey] && settings[frKey] !== '') ? settings[frKey].split('-') : [] : (settings[primaryKey] && settings[primaryKey] !== '') ? settings[primaryKey].split('-') : []
}

export function getFormsKeysTranslation(val) {
  if(val.en) {
    for(let i = 0; i < Object.keys(val.en).length; i++) {
      if(val.en[Object.keys(val.en)[i]] === '') val.en[Object.keys(val.en)[i]] = val[Object.keys(val.en)[i]]
    }
  }
  if(val.fr) {
    for(let i = 0; i < Object.keys(val.fr).length; i++) {
      if(val.fr[Object.keys(val.fr)[i]] === '') val.fr[Object.keys(val.fr)[i]] = val[Object.keys(val.fr)[i]+'_fr']
    }
  }
}
