const { cp } = require('fs')
const { flushSync } = require('react-dom')
const readLine = require('readline')

const rl = readLine.createInterface({
    input:process.stdin,
    output:process.stdout,
})

const demarrerSansPromise =  () => {
    const lirePrenom = prenom => {
        rl.question("nom ? ", lireNom)
    }
      const lireNom = nom => {
        console.log("bonjour " +  nom)
        rl.close()
    }
  rl.question("prenom ? ", lirePrenom)
    
}
//demarrerSansPromise()

const demanderPrenom = ()=>{
    return new Promise(resolve => {
        rl.question("prenom ? ", resolve)
    })
}
const affPrenom = prenom => {console.log("bonjour " + prenom)}
const demanderNom = ()=>{
    return new Promise(resolve => {
        rl.question("nom ? ", resolve)
    })
}
const affNom = Nom => {console.log("bonjour " + Nom)}
const demarrerAvecThen =  () => {
    demanderPrenom()
    .then(repPrenom => affPrenom(repPrenom))
    .then(()=>demanderNom())
    .then(repNom => affNom(repNom))
    .then(()=> rl.close())  
}
//demarrerAvecThen()

const demarrerAvecAwait0 = async() => {
    const repPrenom = await demanderPrenom()
    affPrenom(repPrenom)
    const repNom = await demanderNom()
    affNom(repNom)
    rl.close()
}

const demander = (quoi) => {
    return new Promise(resolve => {
        rl.question(quoi, resolve)
    })
}
const affiche = saisie => {console.log("saisie : " + saisie)}
const demarrerAvecAwait = async() => {
    affiche(await demander("prenom ? "))
    affiche(await demander("nom ? "))
    rl.close()
}
demarrerAvecAwait()
