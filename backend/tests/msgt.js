let Message = require('../src/message')
const lib = require('../src/lib_serveur')



m1 = new Message('signal','77c350b8-1cd1-41de-986e-2484c7b32abd')
function msgComplet(msg) {
  console.log('mm',msg);
}

let coucou = m1.getMsg();

console.log(coucou)







// test('nom de mon test', () => {
//     m1 = new Message('signal','coucou')
//     expect(m1.getMsg()).toBe("signal");

//   })

