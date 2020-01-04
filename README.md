# Ether Tools

Some useful utilities for Ethereum testing.

## Install
 
```
git clone https://github.com/dselman/eth-tools.git
cd eth-tools
npm install
```

## Setup a local geth node, create an account and request Ether

To setup your local geth node follow [these instructions](https://gist.github.com/cryptogoth/10a98e8078cfd69f7ca892ddbdcf26bc).

## getPrivateKey

Returns the private key for an account on a local geth node, given the account password.

```
node getPrivateKey <accountId> [datadir]
```

The `accountId` is the account address you created when you setup your local geth node.

The `datadir` defaults to `$HOME/Library/Ethereum/rinkeby`.

## transferEther

Transfers Ether between two Ethereum accounts using the private key for the source account (headless).

```
node index.js <source> <destination> <source private key> <wei> <rpc URL>
```

The `source` is the source Ethereum account. It must have enough Ether in to cover the amount of wei to be transferred as well as transaction fees.

The `destination` is the destination Ethereum account.

The `source private key` is the private key for the source account. You can use `getPrivateKey` to retrieve this for local geth accounts.

The `wei` is the amount to transfer from source to destination in wei.

The `rpc URL` is the URL used to connect to the Ethereum network. For example, you could use an Infura URL.

