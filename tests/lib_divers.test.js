const lib = require('../src/lib/lib_divers.js')

describe('optionsPost', () => {
    test(`all options for post resquet and data's form`, () => {
        data = {
            nom:'joffre',
            prenom:'sophie',
        }
        expect(lib.optionsPost(data)).toEqual({
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
    })
})

describe('optionsGet', () => {
    test(`all options for get resquet`, () => {
        expect(lib.optionsGet()).toEqual({
            method: 'get',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
    })
})

describe('findUserStatus', () => {
    test(`should be inactif when date_exp correct`, () => {
        date_exp = new Date()
        expect(lib.findUserStatus(date_exp)).toEqual('inactif')
    })
    test(`should be inactif when date_exp null`, () => {
        expect(lib.findUserStatus(null)).toEqual('actif')
    })
    test(`should be inactif else`, () => {
        expect(lib.findUserStatus('coucou')).toEqual('inactif')
    })
})

describe('findProfil - determineProfil', () => {
    test(`should be inactif when profil:0`, () => {
        profil = 0
        result = lib.findProfil(profil)
        expect(result).toEqual('inactif')
        result = lib.determineProfil(profil)
        expect(result).toEqual({ profil: 'administrateur', ecran: 'gestionUtilisateurs' })
    })
    test(`should be usager when profil:1`, () => {
        profil = 1
        result = lib.findProfil(profil)
        expect(result).toEqual('usager')
        result = lib.determineProfil(profil)
        expect(result).toEqual({ profil: 'usager', ecran: 'gestionUtilisateurs' })
    })
    test(`should be technicien when profil:2`, () => {
        profil = 2
        result = lib.findProfil(profil)
        expect(result).toEqual('technicien')
        result = lib.determineProfil(profil)
        expect(result).toEqual({ profil: 'technicien', ecran: 'gestionUtilisateurs' })
    })
    test(`should be valideur when profil:3`, () => {
        profil = 3
        result = lib.findProfil(profil)
        expect(result).toEqual('valideur')
        result = lib.determineProfil(profil)
        expect(result).toEqual({ profil: 'valideur', ecran: 'gestionUtilisateurs' })
    })
    test(`should be admin when profil:4`, () => {
        profil = 4
        result = lib.findProfil(profil)
        expect(result).toEqual('admin')
        result = lib.determineProfil(profil)
        expect(result).toEqual({ profil: 'admin', ecran: 'gestionUtilisateurs' })
    })
    test(`should be actif when profil else`, () => {
        profil = 'xxx'
        result = lib.findProfil(profil)
        expect(result).toEqual('actif')
        result = lib.determineProfil(profil)
        expect(result).toEqual({ profil: 'profil plus que surprenant !', ecran: 'gestionUtilisateurs' })
    })
})

describe('cleanNull', () => {
    test(`should return null when data empty`, () => {
        expect(lib.cleanNull('')).toEqual(null)
    })
    test(`should return null when data null`, () => {
        expect(lib.cleanNull(null)).toEqual(null)
    })
    test(`should return null when data undefined`, () => {
        expect(lib.cleanNull(undefined)).toNull
    })
    test(`should return data when data else`, () => {
        data = 'xxx'
        expect(lib.cleanNull(data)).toEqual(data)
    })
})

describe('cleanNothing', () => {
    test(`should return '' when data empty`, () => {
        expect(lib.cleanNothing('')).toEqual('')
    })
    test(`should return '' when data null`, () => {
        expect(lib.cleanNothing(null)).toBeEmptyDOMElement 
    })
    test(`should return '' when data undefined`, () => {
        expect(lib.cleanNothing(undefined)).toBeEmptyDOMElement 
    })
    test(`should return data when data else`, () => {
        data = 'xxx'
        expect(lib.cleanNothing(data)).toEqual(data)
    })
})

describe('determineStatus - statusLibelle', () => {      //inc_affect_date, inc_fin_date, inc_cloture_date
    inc_affect_date = new Date()
    inc_fin_date = new Date()
    inc_cloture_date = new Date()
    test(`should return 'clos' when inc_cloture_date not empty`, () => {
        result_determineStatus = lib.determineStatus(inc_affect_date,inc_fin_date,inc_cloture_date)
        expect(result_determineStatus).toEqual('clos')
        expect(lib.statusLibelle(result_determineStatus)).toEqual('Incident clôturé')
    })
    test(`should return 'termine' when inc_fin_date not empty and inc_cloture_date null`, () => {
        result_determineStatus = lib.determineStatus(inc_affect_date,inc_fin_date,null)
        expect(result_determineStatus).toEqual('termine')
        expect(lib.statusLibelle(result_determineStatus)).toEqual('Intervention terminée')
    })
    test(`should return 'termine' when inc_fin_date not empty and inc_cloture_date undefined`, () => {
        result_determineStatus = lib.determineStatus(inc_affect_date,inc_fin_date,undefined)
        expect(result_determineStatus).toEqual('termine')
    })
    test(`should return 'enCours' when inc_affect_date not empty and other dates null or undefined`, () => {
        result_determineStatus = lib.determineStatus(inc_affect_date,undefined,undefined)
        expect(result_determineStatus).toEqual('enCours')
        expect(lib.statusLibelle(result_determineStatus)).toEqual('Prise en charge')
    })
    test(`should return 'enCours' when inc_affect_date not empty and other dates null or undefined`, () => {
        result_determineStatus = lib.determineStatus(inc_affect_date,null,undefined)
        expect(result_determineStatus).toEqual('enCours')
    })
    test(`should return 'enAttente' when inc_affect_date null or undefined`, () => {
        result_determineStatus = lib.determineStatus(null,null,undefined)
        expect(result_determineStatus).toEqual('enAttente')
        expect(lib.statusLibelle(result_determineStatus)).toEqual('En attente d\'affectation')
    })
    test(`should return 'enAttente' when inc_affect_date null or undefined`, () => {
        result_determineStatus = lib.determineStatus(null,null,undefined)
        expect(result_determineStatus).toEqual('enAttente')
    })
})

describe('determineURL', () => {      //catUrl, profil, profilEcran
    test(`should return correct url`, () => {
        catUrl = 'demande'
        data = {profilEcran: 'usager', }
        result = lib.determineURL(catUrl,data)
        correctUrl = 'http://localhost:3001/inc/get_byUser'
        expect(result).toEqual(correctUrl)
    })
    test(`should return correct url`, () => {
        catUrl = 'demande',
        data = { profil: 'technicien', profilEcran: 'techno', }
        result = lib.determineURL(catUrl,data)
        correctUrl = 'http://localhost:3001/inc/get_byPresta'
        expect(result).toEqual(correctUrl)
    })
    test(`should return correct url`, () => {
        catUrl = 'demande',
        data = { profil: 'admin', profilEcran: 'techno', }
        result = lib.determineURL(catUrl,data)
        correctUrl = 'http://localhost:3001/inc/get_all'
        expect(result).toEqual(correctUrl)
    })
    test(`should return nothing when demande/profil !=admin !=technicien`, () => {
        catUrl = 'demande',
        data = { profil: 'xxx', profilEcran: 'techno', }
        result = lib.determineURL(catUrl,data)
        expect(result).toBeEmptyDOMElement 
    })
    test(`should return nothing when demande/profil ok/profilEcran !=admin !=technicien`, () => {
        catUrl = 'demande',
        data = { profil: 'admin', profilEcran: 'xxx', }
        result = lib.determineURL(catUrl,data)
        expect(result).toBeEmptyDOMElement 
    })

    test(`should return correct url when affectation/profil:technicien `, () => {
        catUrl = 'affectation',
        data = { profil: 'technicien',}
        result = lib.determineURL(catUrl,data)
        correctUrl = 'http://localhost:3001/inc/affect/' + data.inc_id
        expect(result).toEqual(correctUrl)
    })
    test(`should return correct url when affectation/profil:xxx`, () => {
        catUrl = 'affectation',
        data = { profil: 'xxx', inc_id:0, techno:'toto', }
        result = lib.determineURL(catUrl,data)
        correctUrl = 'http://localhost:3001/inc/affect/' + data.inc_id + '/' + data.techno
        expect(result).toEqual(correctUrl)
    })
})


describe('determineTitre', () => {      
    test(`should return correct string when 'usager'`, () => {
        result = lib.determineTitre('usager')
        resultExpected = 'MES DEMANDES'
        expect(result).toEqual(resultExpected)
    })
    test(`should return correct string when 'techno'`, () => {
        result = lib.determineTitre('techno')
        resultExpected = 'SUIVI INCIDENTS'
        expect(result).toEqual(resultExpected)
    })
    test(`should return undefined when other`, () => {
        result = lib.determineTitre('xxx')
        expect(result).toBeUndefined
    })
    test(`should return undefined when no parameter`, () => {
        result = lib.determineTitre()
        expect(result).toBeUndefined
    })
})
