import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';

const MD5 = require('sha1')

function TestBtClick() {
  // Déclare une nouvelle variable d'état, que l'on va appeler « count »
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>
        Cliquez ici
      </button>
    </div>
  );
}

let msg1 = 'jlaurent' + 'aaa'
let msg2 = 'blaurent' + 'aaa'
let msg3 = 'ocain' + 'aaa'
let msg4 = 'hwilliam' + 'aaa'
let code = uuidv4()
let msg = code
function Test() {
  return (
    <div>
      <p> ex uuid : {uuidv4()}</p>
      <p> hash {msg1} : {MD5(msg1)}</p>
      <p> hash {msg2} : {MD5(msg2)}</p>
      <p> hash {msg3} : {MD5(msg3)}</p>
      <p> hash {msg4} : {MD5(msg4)}</p>
    </div>
  )
}

export default Test;