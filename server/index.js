const express = require('express');
const verifyProof = require('../utils/verifyProof');

const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT = merkleTree.getRoot();


app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {proof, name, MERKLE_ROOT} = req.body;
  
  
  console.log('body Proof : ', proof);
  console.log('body Name : ', name);
  console.log('body Root : ', MERKLE_ROOT);
  

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT)
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
