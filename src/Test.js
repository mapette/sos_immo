import { v4 as uuidv4 } from 'uuid';
const sha1 = require('sha1')

let msg1 = 'fama' + 'Pepette2021+'
let msg2 = 'fama' + 'Pepette2022+'
let msg3 = 'fama' + 'aaa'
let msg4 = 'mario' + 'Pepette2021+'
let msg5 = 'mafa' + 'aaa'
let code = uuidv4()

function Test() {
  return (
    <div>
      <p> ex uuid : {code}</p>
      <p> hash {msg3} : {sha1(msg3)}</p>
      <p> hash {msg1} : {sha1(msg1)}</p>
      <p> hash {msg2} : {sha1(msg2)}</p>
      <p> hash {msg4} : {sha1(msg4)}</p>
      <p> hash {msg5} : {sha1(msg5)}</p>
    </div>
  )
}


export default Test;