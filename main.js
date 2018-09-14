const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  createGenesisBlock() {
    return new Block(0, "19/09/2018", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash != currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash != previousBlock.hash) {

      }
    }
    return true;
  }
}

let myCoin = new Blockchain();
myCoin.addBlock(new Block(1, "13/09/2018", { amount: 4 }));
myCoin.addBlock(new Block(2, "14/09/2018", { amount: 30 }));

console.log('Is Blockchain valid? ', myCoin.isChainValid());

myCoin.chain[1].data = { amount: 14 };
myCoin.chain[1].hash = myCoin.chain[1].calculateHash();

console.log('Is Blockchain valid? ', myCoin.isChainValid());

// console.log(JSON.stringify(myCoin, null, 2));