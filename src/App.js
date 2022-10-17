import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Bandeau from './tools/Bandeau';
import Accueil from './pages/Accueil'
import OubliMdp from './pages/OubliMdp'
import ChangeMdp from './pages/ChangeMdp'
import Menu from './pages/Menu'
import GestionUtilisateurs from './pages/tables/utilisateurs/GestionUtilisateurs'
import GestionPresta from './pages/tables/presta/GestionPresta'
import GestionEmp from './pages/tables/emplacements/GestionEmp'
import NewInc from './pages/signalements/NewInc'
import Demandes from './pages/signalements/Demandes'
import FicheInc from './pages/signalements/FicheInc'
import Pilotage from './pages/kpi/Pilotage'

import './tools/App.css';
import Test from './Test'

function App() {

  let [varGlob, setVarGlob] = useState({
    ecran: 'accueil',
    nom: '',
    profil: '',
    profilEcran: '',  //'Demandes' : depuis 'mes demandes' => 'usager', depuis 'suivi inc' => 'techno
    focus: '',        // élement pour lequel on veut le détail
  })

  if (varGlob.ecran === 'test') {
    return (
      <Test 
      varGlob={varGlob}
      setVarGlob={setVarGlob}
      />
    )
  }

  if (varGlob.ecran !== 'tests') {
    return (
      <div className="centrer">
        <Bandeau
          varGlob={varGlob}
          setVarGlob={setVarGlob}
        />
        <div>
          {varGlob.ecran === 'accueil' &&
            <Accueil
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'oubliMdp' &&
            <OubliMdp
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'changemdp' &&
            <ChangeMdp
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'menu' &&
            <Menu
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'gestionUtilisateurs' &&
            <GestionUtilisateurs
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'gestionPresta' &&
            <GestionPresta
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'gestionEmp' &&
            <GestionEmp
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'newInc' &&
            <NewInc
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'demandes' &&
            <Demandes
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'detailsInc' &&
            <FicheInc
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
           {varGlob.ecran === 'pilot' &&
            <Pilotage
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
        </div>
        <br/>
      </div>
    );
  }
}

export default App;


/*

*/