## api v3.0
### quote
 * url: https://open-api.openocean.finance/v3/:chain/quote
 * method: get
 * params:

  | parameter | type | example | description |
  | :-----------: | :-----------: | :-----------: | :-----------: |
  |chain | string | bsc |  bsc, eth, polygon, fantom, avax, heco, okex, xdai, arbitrum, optimism, moonriver, boba, ont, tron, solana, terra|
  |inTokenAddress|string|0x783C08b5F26E3daf8C4681F3bf49844e425b6393|token address|
  |outTokenAddress|string|0xD81D45E7635400dDD9c028839e9a9eF479006B28|out token address|
  |amount|string|5|token amount(without decimals)|

 * example:
    * request: https://open-api.openocean.finance/v3/avax/quote?inTokenAddress=0x783C08b5F26E3daf8C4681F3bf49844e425b6393&outTokenAddress=0xD81D45E7635400dDD9c028839e9a9eF479006B28&amount=5&gasPrice=5&slippage=100
    * response: 
    ```
    {
    "code": 200,
    "data": {
        "inToken": {
            "symbol": "AUSD",
            "name": "Avaware USD",
            "address": "0x783C08b5F26E3daf8C4681F3bf49844e425b6393",
            "decimals": 18
        },
        "outToken": {
            "symbol": "EMBR",
            "name": "EmbrToken",
            "address": "0xD81D45E7635400dDD9c028839e9a9eF479006B28",
            "decimals": 18
        },
        "inAmount": "5000000000000000000",
        "outAmount": "126261357830302882735",
        "estimatedGas": "189669",
        "dexes": [
            {
                "dexIndex": 1,
                "dexCode": "SushiSwap",
                "swapAmount": "0"
            },
            ...
        ],
        "path": {
        }
    }
    }
    ```


### swap_quote
 * url: https://open-api.openocean.finance/v3/:chain/swap_quote
 * method: get
 * params:

  | parameter | type | example | description |
  | :-----------: | :-----------: | :-----------: | :-----------: |
  |chain | string | bsc |  bsc, eth, polygon, fantom, avax, heco, okex, xdai, arbitrum, optimism, moonriver, boba, ont, tron, solana, terra|
  |inTokenAddress|string|0x783C08b5F26E3daf8C4681F3bf49844e425b6393|token address|
  |outTokenAddress|string|0xD81D45E7635400dDD9c028839e9a9eF479006B28|out token address|
  |amount|string|5|token amount(without decimals)|
  |gasPrice|string|5|without decimals|
  |slippage | number | 1 |  1 equals 1%, 1%-100%|
  |account|string||user's address|
  |referrer|string?|0x0000000000000000000000000000000000000000|Please contact us for a unique referrer parameter|
 * example:
    * request:https://open-api.openocean.finance/v3/bsc/swap_quote?inTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&outTokenAddress=0x55d398326f99059ff775485246999027b3197955&amount=5&gasPrice=5&slippage=100&account=0x929B44e589AC4dD99c0282614e9a844Ea9483C69
    * response: 
    ```
    {
    "code": 200,
    "data": {
        "inToken": {
            "symbol": "BNB",
            "name": "Binance Coin",
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            "decimals": 18
        },
        "outToken": {
            "symbol": "USDT",
            "name": "Binance-Peg USD (T)",
            "address": "0x55d398326f99059ff775485246999027b3197955",
            "decimals": 18
        },
        "inAmount": "5000000000000000000",
        "outAmount": "1854329353330546150894",
        "estimatedGas": "353007",
        "minOutAmount": "0",
        "from": "0x929B44e589AC4dD99c0282614e9a844Ea9483C69",
        "to": "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64",
        "value": "5000000000000000000",
        "gasPrice": "5000000000",
        "data": ""
    }
    }
    ```

### getTransaction
 * url: https://open-api.openocean.finance/v3/:chain/getTransaction
 * method: get
 * params:

  | parameter | type | example | description |
  | :-----------: | :-----------: | :-----------: | :-----------: |
  |chain | string | bsc |  bsc, eth, polygon, fantom, avax, heco, okex, xdai, arbitrum, optimism, moonriver, boba, ont, tron, solana, terra|
  |hash|string||transaction hash|
 * example:
    * request: https://open-api.openocean.finance/v3/avax/getTransaction?hash=0x57e752d311c347008a5d66286096b62d6a0687834a3df8b0dd06265ff16ee575
    * response:
    ```
    {
    "code": 200,
    "data": {
        "id": 25144,
        "tx_id": null,
        "block_number": 12091885,
        "tx_index": 8,
        "address": "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64",
        "tx_hash": "0x57e752d311c347008a5d66286096b62d6a0687834a3df8b0dd06265ff16ee575",
        "sender": "0x7fFadA80929a732f93D648D92cc4E052e2b9C4Aa",
        "in_token_address": "0x0000000000000000000000000000000000000000",
        "in_token_symbol": "AVAX",
        "out_token_address": "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
        "out_token_symbol": "USDC.e",
        "referrer": "0x40603469C577B1Db3D401155901A276F604436f4",
        "in_amount": "1400000000000000000",
        "out_amount": "97659580",
        "fee": "",
        "referrer_fee": "",
        "usd_valuation": 97.38,
        "create_at": "2022-03-14T08:39:18.000Z",
        "update_at": "2022-03-14T08:39:18.000Z",
        "tx_fee": "0.010181825",
        "tx_fee_valuation": "0.72993503",
        "in_token_decimals": 18,
        "out_token_decimals": 6,
        "in_amount_value": "1.4",
        "out_amount_value": "97.65958"
    }
    }
    ```

### token list
 * url: https://open-api.openocean.finance/v3/:chain/tokenList
 * method: get
 * params:
 
 | parameter | type | example | description |
 | :-----------: | :-----------: | :-----------: | :-----------: |
 |chain | string | bsc |  bsc, eth, polygon, fantom, avax, heco, okex, xdai, arbitrum, optimism, moonriver, boba, ont, tron, solana, terra|
 * example:
    * request: https://open-api.openocean.finance/v3/avax/tokenList
    * response:
    ```
    {
    "code": 200,
    "data": [
        {
            "id": 1619,
            "code": "avaware-usd",
            "name": "Avaware USD",
            "address": "0x783C08b5F26E3daf8C4681F3bf49844e425b6393",
            "decimals": 18,
            "symbol": "AUSD",
            "icon": "https://cloudstorage.openocean.finance/images/1646208600388_8016544631355003.png",
            "chain": "avax",
            "createtime": "2022-03-02T08:10:07.000Z",
            "hot": null,
            "sort": "2022-03-02T08:10:07.000Z",
            "chainId": null
        },
        ...
    ]
    }
    ```

### dex list
 * url: https://open-api.openocean.finance/v3/:chain/dexList
 * method: get
 * params: 

| parameter | type | example | description |
| :-----------: | :-----------: | :-----------: | :-----------: |
|chain | string | bsc |  bsc, eth, polygon, fantom, avax, heco, okex, xdai, arbitrum, optimism, moonriver, boba, ont, tron, solana, terra|
 * example:
    * request: https://open-api.openocean.finance/v3/avax/dexList
    * response:
    ```
    {
    "code": 200,
    "data": [
        {
            "index": 1,
            "code": "SushiSwap",
            "name": "SushiSwap"
        },
        {
            "index": 2,
            "code": "Pangolin",
            "name": "Pangolin"
        },
        ...
        ]
    }
    ```