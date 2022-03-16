## interface document
### 1. Quote price
 * Method: get
 * Url: https://open-api.openocean.finance/v1/cross/quote
 * Parameters:

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|exChange | string | openoceanv2 | platform (openoceanv1/openoceanv2/1inch/matcha/paraswap) |
|chainId | number | 56| chain id (1/56/137/41334) | 
|inTokenSymbol | string | OOE | sell token name |
|inTokenAddress | string | 0x9029FdFAe9A03135846381c7cE16595C3554e10A | sell token address |
|outTokenSymbol | string | BNB | buy token name |
|outTokenAddress | string | 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE | buy token Address |
|amount | number | 1 | sell amout |
|gasPrice | number | 5 | you can set it yourself or get it through [getGasPrice](#jump) |
|slippage | number | 1 |  1 equals 1%, 1%-100%|
|withUsd | bool | true | true/false|
* Example:
#### request:
    https://open-api.openocean.finance/v1/cross/quote?inTokenSymbol=OOE&inTokenAddress=0x9029FdFAe9A03135846381c7cE16595C3554e10A&outTokenSymbol=BNB&outTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&amount=1&gasPrice=5&slippage=100&exChange=openoceanv2&chainId=56

#### response：
```
 {
     code: 200,
     error: "", 
     data: {
        "inToken": {
            "symbol": "OOE",
            "chainId": "56",
            "address": "0x9029FdFAe9A03135846381c7cE16595C3554e10A",
            "inUsd": 0.694055  // inAmount to usd
        },
        "outToken": {
            "symbol": "BNB",
            "chainId": "56",
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            "outUsd": "0.6984" // outAmount to usd
        },
        "inAmount": "1",
        "outAmount": "0.0014",
        "exChange": "openoceanv2",
        "transCost": "0.000946225",
        "transUsd": "0.4561", // transCost to usd
        "save": ""  // only openoceanv2 has this key
    }
 }
 
```    
### 2. Get token list
 * Method: get
 * Url: https://open-api.openocean.finance/v1/cross/tokenList
 * Parameters:

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|chainId | number | 56| chain id (1/56/137/41334) | 
* Example:
#### request:
    https://open-api.openocean.finance/v1/cross/tokenList?chainId=56
#### response:
```
{
    "code": 200,
    "error": "",
    "data": [
        {
            "id": 1,
            "code": "oxbitcoin",
            "name": "0xBitcoin Token",
            "address": "0xb6ed7644c69416d67b522e20bc294a9a9b405b31",
            "decimals": 8,
            "symbol": "0xBTC",
            "icon": "https://ethapi.openocean.finance/logos/0xb6ed7644c69416d67b522e20bc294a9a9b405b31.png",
            "chain": "eth",
            "createtime": "2021-10-19T10:40:52.000Z",
            "hot": null
        },
        {
            "id": 2,
            "code": "1inch",
            "name": "1INCH Token",
            "address": "0x111111111117dc0aa78b770fa6a738034120c302",
            "decimals": 18,
            "symbol": "1INCH",
            "icon": "https://ethapi.openocean.finance/logos/0x111111111117dc0aa78b770fa6a738034120c302.png",
            "chain": "eth",
            "createtime": "2021-10-19T10:40:52.000Z",
            "hot": null
        },
        {
            "id": 3,
            "code": "uptrennd",
            "name": "Uptrennd",
            "address": "0x07597255910a51509ca469568b048f2597e72504",
            "decimals": 18,
            "symbol": "1UP",
            "icon": "https://ethapi.openocean.finance/logos/0x07597255910a51509ca469568b048f2597e72504.png",
            "chain": "eth",
            "createtime": "2021-10-19T10:40:52.000Z",
            "hot": null
        },
        {
            "id": 4,
            "code": "2key",
            "name": "TwoKeyEconomy",
            "address": "0xe48972fcd82a274411c01834e2f031d4377fa2c0",
            "decimals": 18,
            "symbol": "2KEY",
            "icon": "https://ethapi.openocean.finance/logos/0xe48972fcd82a274411c01834e2f031d4377fa2c0.png",
            "chain": "eth",
            "createtime": "2021-10-19T10:40:52.000Z",
            "hot": null
        },
        ...
    ]
}
```
### 3. create wallet

 * Method: get
 * Url: https://open-api.openocean.finance/v1/cross/createWallet
 * Parameters:

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|chainId | number | 56 | chain id (1/56/137/41334) |
 * Example:
#### request:
    https://open-api.openocean.finance/v1/cross/createWallet?chainId=56
#### response:
```
  {
      code: 200,
      error: "",
      data: {
        address: string，
        privateKey: string,
      }    
  }
```


### 4. get balance
 * Method: get
 * Url: https://open-api.openocean.finance/v1/cross/getBalance
 * Parameters:
| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|account | string |0xe7d92d0B213bfdfCb1A7fb8fc5C53348EE5f6cFa | wallet address |
|chainId | number | 56 | chain id (1/56/137/41334) |
|inTokenAddress | string | 0x9029FdFAe9A03135846381c7cE16595C3554e10A,0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE| token address|
* Example:
#### request:
    https://open-api.openocean.finance/v1/cross/getBalance?chainId=56&account=0xe7d92d0B213bfdfCb1A7fb8fc5C53348EE5f6cFa&inTokenAddress=0x9029FdFAe9A03135846381c7cE16595C3554e10A,0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
#### response:
```
{
    code: 200, 
    error: "",
    data: [
        {
            "symbol": "OOE",
            "tokenAddress": "0x9029FdFAe9A03135846381c7cE16595C3554e10A",
            "balance": 0,
            "raw": 0
        },
        {
            "symbol": "BNB",
            "tokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            "balance": 0,
            "raw": 0
        }
    ]
}
```

### 5. swap
 * Method: get
 * Url: https://open-api.openocean.finance/v1/cross/swap
 * Parameters:

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|exChange | string | openoceanv2 | platform |
|chainId | number | 56| chain id (1/56/137/41334) | 
|inTokenSymbol | string | OOE | sell token name |
|inTokenAddress | string | 0x9029FdFAe9A03135846381c7cE16595C3554e10A | sell token address |
|outTokenSymbol | string | USDC | buy token name |
|outTokenAddress | string | 0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d | buy token address |
|amount | number | 5 | sell token amount |
|gasPrice | number | 5 | you can set it yourself or get it through [getGasPrice](#jump)|
|account | string? | wallet address | It can be read from the configuration file|
|privateKey | string? | wallet privateKey| It can be read from the configuration file|
|slippage | number | 1 |  1 equals 1%, 1%-100%|
* Example:
#### request:
    https://open-api.openocean.finance/v1/cross/swap?chainId=56&exChange=openoceanv2&inTokenSymbol=OOE&inTokenAddress=0x9029FdFAe9A03135846381c7cE16595C3554e10A&outTokenSymbol=USDC&outTokenAddress=0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d&amount=5&gasPrice=5
#### response:
```
{
    code: 200,
    error: "",
    data: {
        hash: "0x591ba7950e039f21de04831c7231584958a5255c4e2af7a08ec651ed8599de71",
    }
}
```

### 6. get transaction
 * Method: get
 * Url: https://open-api.openocean.finance/v1/cross/getTransaction
 * Parameters:

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|chainId | number | 56 | chain id (1/56/137/41334) |
|hash | string | 0xa4733659e9a9496b30228f98b8d862062e93e58d7e9b8f208c5215228fc5b858 | hash value|
|exChange | string | openoceanv2| platform(openoceanv1/openoceanv2)|
|type | string| transfer| transfer/swap|
* Example:
#### request:
    https://open-api.openocean.finance/v1/cross/getTransaction?chainId=56&hash=0x591ba7950e039f21de04831c7231584958a5255c4e2af7a08ec651ed8599de71&exChange=openoceanv2
 
#### response:
```
{
    code: 200, 
    error: "",
    data: {
        "hash": "0x591ba7950e039f21de04831c7231584958a5255c4e2af7a08ec651ed8599de71",
        "blockNumber": 12123764,
        "transactionIndex": 527,
        "from": "0x6ce8Ea05AFDF026BA6e9998936598EE8F0163F3a",
        "to": "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64",
        "inTokenAddrss": "0x9029FdFAe9A03135846381c7cE16595C3554e10A",
        "inTokenSymbol": "OOE",
        "outTokenAddrss": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        "outTokenSymbol": "USDC",
        "inAmount": 5,
        "outAmount": "3.3951",
        "gasFee": "0.59" // usd
    }
}
```

### 7. getTransactionReceipt
 * Method: get
 * Url: https://open-api.openocean.finance/v1/cross/getTransactionReceipt
 * Parameters:

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|chainId | number | 56 | chain id (1/56/137/41334) |
|hash | string | 0xa4733659e9a9496b30228f98b8d862062e93e58d7e9b8f208c5215228fc5b858 | hash value|
|exChange | string | openoceanv2| platform(openoceanv1/openoceanv2)|
* Example:
#### request:
    https://open-api.openocean.finance/v1/cross/getTransactionReceipt?chainId=56&hash=0x591ba7950e039f21de04831c7231584958a5255c4e2af7a08ec651ed8599de71&exChange=openoceanv2
 
#### response
```
{
    code: 200,
    error: "",
    data: {
        "to": "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64",
        "from": "0x6ce8Ea05AFDF026BA6e9998936598EE8F0163F3a",
        "contractAddress": null,
        "transactionIndex": 527,
        "transactionHash": "0x591ba7950e039f21de04831c7231584958a5255c4e2af7a08ec651ed8599de71",
        "blockNumber": 12123764,
        "confirmations": 190,
        "status": 1
    }
}
```
### 8. transfer
 * Method: get
 * Url: https://open-api.openocean.finance/v1/cross/transfer
 * Parameters:

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|chainId | number | 56 | chain id (1/56/137/41334) |
|inTokenAddress | string | 0x9029FdFAe9A03135846381c7cE16595C3554e10A | transfer token address|
|inTokenSymbol | string | OOE | transfer token name |
|decimals | number | 18 | unit conversion|
|amount | number | 5 | transfer number|
|gasPrice| number | 5|you can set it yourself or get it through [getGasPrice](#jump)|
|targetAddress | string | 0x929B44e589AC4dD99c0282614e9a844Ea9483C69| wallet address|
|account | string? | wallet address | It can be read from the configuration file |
|privateKey | string? | wallet privateKey|  It can be read from the configuration file|
|Nonce | number? | 1 |  transaction nonce|
* Example:
#### request:
    https://open-api.openocean.finance/v1/cross/transfer?chainId=56&inTokenAddress=0x9029FdFAe9A03135846381c7cE16595C3554e10A&inTokenSymbol=OOE&decimals=18&amount=2&gasPrice=5&targetAddress=0x929B44e589AC4dD99c0282614e9a844Ea9483C69
#### response:
```
{
    code: 200,
    error: "",
    data: {
        hash: "0xcec6125eebcfb6a5e32341d9bc2571946dbf2a1db018e333abd644f505840529"
    }
}
```

### <span id="jump">9. getGasPrice</span>
 * Method: get
 * Url: https://open-api.openocean.finance/v1/:chainId/getGasPrice
 * Parameters:

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|chainId | number | 56| chain id (1/56/137/41334) | 
* Example:
#### request:
    https://open-api.openocean.finance/v1/56/getGasPrice
#### response:
```
{
    code: 200,
    data: {
        price: 5 // default 5
    }
}
```
## Common error codes

| code | reason |
| :-----------: | :-----------: |
|201 | invalid request format | 
|204| Insufficient balance|
|205|suspend trading|
|206|approve fail|
|207|trade fail|
| 500 | Internal Server Error|