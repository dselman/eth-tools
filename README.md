# Ether Tools

Some useful utilities for Ethereum testing.

To setup your local geth node use [this](https://gist.github.com/cryptogoth/10a98e8078cfd69f7ca892ddbdcf26bc).

## getPrivateKey

Returns the private key for an account on a local geth node, given the account password.

```
node getPrivateKey <accountId> [datadir]
```

The `datadir` defaults to `$HOME/Library/Ethereum/rinkeby`.

## transferEther

Transfers Ether between two Ethereum accounts using the private key for the source account (headless).

```
node index.js <source> <destination> <source private key> <wei> <rpc URL>
```