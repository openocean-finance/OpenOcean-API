## interface document
### 1、quote
#### request： 
 * method: get
 * url：https://open-api.openocean.finance/v1/cross/quote
 * params：

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|exChange | string | openoceanv1/openoceanv2/oneinch/paraswap/matcha | platform |
|chainId | string | 56/137/43114| chain id | 
|inTokenSymbol | string | USDC | sell token name |
|inTokenAddress | string | 0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d | sell token address |
|outTokenSymbol | string | OOE | buy token name |
|outTokenAddress | string | 0x9029FdFAe9A03135846381c7cE16595C3554e10A | buy token Address |
|amount | string | 500 | sell token amout |
|gasPrice | string | 5 | procedure rates |
#### response：
```
 {
    inToken: {
      symbol: 'USDC',
      chainId: 56,
      address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
      inUsd: intoken to usd
    },
    outToken: {
      symbol: 'OOE',
      chainId: 56,
      address: '0x9029FdFAe9A03135846381c7cE16595C3554e10A',
      outUsd: outtoken to usd
    },
    inAmount: sell Token amount,
    outAmount: buy Token amount, 
    transCost: gasLimit,
    save: '',  
    exChange: openoceanv2,
    transUsd: transCost to usd
  }
```    
### 2、get token list
#### request： 
 * method: get
 * url：https://open-api.openocean.finance/v1/cross/tokenList
 * params：

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|chainId | string | 56/137/43114| chain id | 

#### response:
```
 [
     {
        'address': '0x9029FdFAe9A03135846381c7cE16595C3554e10A',
        'decimals': 18,
        'name': 'OOE',
        'symbol': 'OOE'
    },
    {
        'symbol': 'AVAX',
        'name': 'Avalanche Token',
        'address': '0x0000000000000000000000000000000000000000',
        'decimals': 18
    },
    {
        'address': '0x78ea17559b3d2cf85a7f9c2c704eda119db5e6de',
        'name': 'Avaware',
        'symbol': 'AVE',
        'decimals': 18
    }
    ...
]
```
### 3、create wallet
#### request： 
 * method: get
 * url：https://open-api.openocean.finance/v1/cross/createWallet
 * params：

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
| chainId | string | 56/137/43114 | chain id |

#### response
```
  {
    ret: 'ok' || 'fail'
    address: '',
    private: '',
  }
```


### 4、get balance
#### request： 
 * method: get
 * url：https://open-api.openocean.finance/v1/cross/getBalance
 * params：

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|address | string | 0x6ce8Ea05AFDF026BA6e9998936598EE8F0163F3a| wallet address |
|chainId | string | 56/137/43114 | chain id |
|inTokenAddress | string | 0x9029FdFAe9A03135846381c7cE16595C3554e10A| token address|
|inTokenSymbol | string | OOE |token name |
### response:
```
{
  ret: 'ok' || 'fail'
  OOE: amount
}
```

### 5、swap
#### request
 * method: get
 * url：https://open-api.openocean.finance/v1/cross/swap
 * params：

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|exChange | string | openoceanv2 | fixed value |
|chainId | string | 56/137/43114| chain id | 
|inTokenSymbol | string | OOE | sell token name |
|inTokenAddress | string | 0x9029FdFAe9A03135846381c7cE16595C3554e10A | sell token address |
|outTokenSymbol | string | USDC | buy token name |
|outTokenAddress | string | 0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d | buy token address |
|amount | string | 50 | sell token amount |
|gasPrice | string | 5 | procedure rates |
|account | string | 0x6ce8Ea05AFDF026BA6e9998936598EE8F0163F3a | wallet address|
#### response
```
{
  ret: 'ok' || 'fail'
  hash: string
}
```

### 6、get transaction
#### request
 * method: get
 * url：https://open-api.openocean.finance/v1/cross/getTransaction
 * params：

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|chainId | string | 56/137/43114 | chain id |
|hash | string | 0xa4733659e9a9496b30228f98b8d862062e93e58d7e9b8f208c5215228fc5b858 | |
#### response
```
{
    'hash': '0xa4733659e9a9496b30228f98b8d862062e93e58d7e9b8f208c5215228fc5b858',
    'type': 0,
    'accessList': null,
    'blockHash': '',
    'blockNumber': ,
    'transactionIndex': ,
    'confirmations': ,
    'from': '',
    'gasPrice': {
        'type': 'BigNumber',
        'hex': ''
    },
    'gasLimit': {
        'type': 'BigNumber',
        'hex': ''
    },
    'to': '',
    'value': {
        'type': 'BigNumber',
        'hex': ''
    },
    'nonce': 618,
    'data': '',
    'r': '',
    's': '',
    'v': 147,
    'creates': null,
    'chainId': 56
}
```


### 7、transfer
#### request
 * method: get
 * url：https://open-api.openocean.finance/v1/cross/transfer
 * params：

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|chainId | string | 56/137/43114  | chain id |
|inTokenAddress | string | 0x9029FdFAe9A03135846381c7cE16595C3554e10A | transfer token address|
|inTokenSymbol | string | OOE | transfer token name |
|decimals | string | 18 | unit conversion|
|amount | string | 5 | transfer number|
|gasPrice| string | required|procedure rates|
|targetAddress | string |0x6ce8Ea05AFDF026BA6e9998936598EE8F0163F3a | wallet address|
#### response
```
{
  ret: 'ok' | 'fail'
  hash: string
}
```

