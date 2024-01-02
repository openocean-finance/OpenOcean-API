from web3 import Web3
from web3.middleware import geth_poa_middleware
import os
import json
import requests


abi_file_path = os.path.join(os.path.split(os.path.abspath(__file__))[0], 'abi', 'abi.json')
with open(abi_file_path) as f:
    TOKEN_ABI = json.load(f)

contract_abi_file_path = os.path.join(os.path.split(os.path.abspath(__file__))[0], 'abi', 'contract.json')
with open(contract_abi_file_path) as f:
    CONTRACT_ABI = json.load(f)['abi']
    
#connect to bsc chain，You can change it to the node you want
w3 = Web3(Web3.HTTPProvider('https://bsc-dataseed.binance.org/'))
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

#in_token_address，You can change it to the token you want
in_token_address = Web3.to_checksum_address('0xe9e7cea3dedca5984780bafc599bd69add087d56') #BUSD or other token address
in_token_contract = w3.eth.contract(address=in_token_address, abi=TOKEN_ABI)  

#ou t_token_address，You can change it to the token you want
out_token_address = Web3.to_checksum_address('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') #BNB
 
 # oo's crontact address in bsc（https://docs.openocean.finance/dev/contracts-of-chains）
spender = Web3.to_checksum_address('0x6352a56caadc4f1e25cd6c75970fa768a3304e64') 
spender_contract = w3.eth.contract(address=spender, abi=CONTRACT_ABI)

approve_amount = Web3.to_wei(10000,'ether') # approve amount,10000
swap_amount = 0.001                         # Set as needed
slippage_tolerance = 1                      # Set as needed

# user address that needs approve 
sender = '0x9D20...'


# private keys
private_keys = {
    '0x9D20...':'cd...',
}


def approve(sender, spender, approve_amount):
    #approve
    nonce = w3.eth.get_transaction_count(sender)
    approve_tx = in_token_contract.functions.approve(
        spender,
        approve_amount
    ).build_transaction({
        'from': sender,
        'nonce': nonce,
    })

    sender = approve_tx['from']
    signed_approve_tx = w3.eth.account.sign_transaction(approve_tx, private_keys[sender])
    tx_hashes = w3.eth.send_raw_transaction(signed_approve_tx.rawTransaction) 
    print(f'Approve Hash: {tx_hashes.hex()}')
    return tx_hashes.hex()

def swap(sender, in_token, out_token, swap_amount, gasPrice, slippage):
    #swap
    #Get data from openocean interface, The demo is on the bsc chain. Modify the chainID according to your needs.
    oo_url = "https://open-api.openocean.finance/v3/56/swap_quote"
    params = {
        'account': sender,
        'inTokenAddress': in_token,
        'outTokenAddress': out_token,
        'amount': swap_amount,
        'gasPrice': gasPrice,
        'slippage': slippage
        }
    response = requests.get(oo_url, params=params)
    response_json = response.json()

    from_o = response_json['data']['from']
    to_o = response_json['data']['to']
    value = response_json['data']['value']
    data = response_json['data']['data']


    # Construct transaction parameters on the chain
    transaction_params = {
        'from': from_o,
        'to': to_o,
        'value': int(value),
        'data': data,
        'gas': 500000,  # Set as needed
        'gasPrice': w3.eth.gas_price,
        'nonce': w3.eth.get_transaction_count(sender),
    }

    signed_transaction = w3.eth.account.sign_transaction(transaction_params, private_keys[sender])
    transaction_hash = w3.eth.send_raw_transaction(signed_transaction.rawTransaction)
    print(f'Transaction Hash: {transaction_hash.hex()}')



# transaction
approve(sender, spender=spender, approve_amount=approve_amount)
swap(sender, in_token=in_token_address, out_token=out_token_address, swap_amount=swap_amount, gasPrice=3, slippage=1)