const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const readline = require('node:readline');
const {stdin : input , stdout : output} = require('node:process');
const verifyProof = require('../utils/verifyProof');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list?   
  const merkleTree = new MerkleTree(niceList);
  const MERKLE_ROOT = merkleTree.getRoot();
  console.log(niceList.at(200));
  console.log({root: MERKLE_ROOT});
  
  
  const rl = readline.createInterface({input, output});
  const inputName = await new Promise((resolve) => {
    rl.question('Please type your name to check : ', (answer) => {
      resolve(answer);
      rl.close();
    });
  });
  
  const name = inputName;
  const index = niceList.findIndex(n => n === name);
  let proof = merkleTree.getProof(index);
  console.log(verifyProof(proof, name, MERKLE_ROOT));
  
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof, name, MERKLE_ROOT
  });
  console.log({ gift });
}

main();