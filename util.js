/**
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/
const Web3 = require('web3');

/**
 * Transfer ether between two accounts (headless)
 * @param {object} e the transfer information
 * @param {string} e.fromAccount the source account
 * @param {string} e.toAccount the destination account
 * @param {number} e.weiValue the amount in wei to transfer from source to destination
 * @param {string} e.privateKey the private key for the source account
 * @param {string} e.rpcUrl the RPC url to connect to
 * @param {number} [e.gasLimit] the maximum gas to spend on the transaction
 * @param {number} [e.gasPrice] the gas price paid to validate the transaction
 * @param {*} options 
 */
async function transferEther(e, options) {
    const account = e.fromAccount;
    const destinationAccount = e.toAccount;
    const {
        weiValue,
        privateKey
    } = e;

    // defaults to localhost
    const rpcUrl = e.rpcUrl ? e.rpcUrl : 'https://localhost:8545';

    const web3 = (options && options.web3) ? options.web3 :
        // @ts-ignore
        new Web3(new Web3.providers.HttpProvider(rpcUrl));

    // how much we are prepared to spend in gas executing a transaction
    let {
        gasLimit,
        gasPrice
    } = e;
    if (!gasLimit) {
        gasLimit = 21000;
    }
    console.log(`gasLimit: ${gasLimit}`);
    const gasLimitHex = web3.utils.toHex(gasLimit);

    // get the gas price used by recent blocks
    if (!gasPrice) {
        gasPrice = await web3.eth.getGasPrice();
        // inflate by 20% so we can replace failed transactions and get validated quickly
        gasPrice = Math.ceil(gasPrice * 1.2);
    }
    console.log(`gasPrice: ${gasPrice}`);
    const gasPriceHex = web3.utils.toHex(gasPrice);
    console.log(`using account: ${account}`);

    // the nonce should be a monotonically increasing number
    // it is scoped to an account and allows failed transactions to be retried
    const nonce = await web3.eth.getTransactionCount(account);
    console.log(`nonce: ${nonce}`);

    // create the transaction
    const tx = {
        nonce: web3.utils.toHex(nonce),
        // gas : undefined, // calculate the gas required for the tx
        // the higher this is the more likely the tx is to get included in a block
        gasPrice: gasPriceHex,
        // the max amount of gas we are prepared to pay for the computation for this tx
        gasLimit: gasLimitHex,
        value: web3.utils.toHex(weiValue), // the amount of wei to transfer
        from: account, // the account performing the action that will be debited
        to: destinationAccount, // the account to transfer to
    };

    console.log(`signing transaction: ${JSON.stringify(tx)}`);

    // we sign the transaction with the account's private key so we do not have to
    // interactively unlock the account in geth
    const signed = await web3.eth.accounts.signTransaction(tx, privateKey);

    // submit the transaction
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

    // the transaction was validated
    console.log(`transfer completed: ${JSON.stringify(receipt)}`);
    return receipt;
}

module.exports = transferEther;