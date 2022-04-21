import { LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import axios from 'axios';
// import { decimals2Amount } from './utils';
// export async function getBalance(params) {
//   const { account, inToken } = params;
//   const terra = new LCDClient({
//     URL: 'https://lcd.terra.dev',
//     chainID: 'columbus-5',
//   });

//   const result = await terra.bank.balance(account);
//   // eslint-disable-next-line dot-notation
//   const token = result[0]['_coin'][inToken];
//   let amount = 0;
//   if (token) {
//     amount = token.amount.toNumber();
//   } else {
//     const res = await axios.get(
//       `https://fcd.terra.dev/wasm/contracts/${inToken}/store`,
//       {
//         params: {
//           query_msg: {
//             balance: {
//               address: account,
//             },
//           },
//         },
//         cache: false,
//       },
//     );
//     amount = +(res.result.balance || 0);
//   }
//   return {
//     balance:
//           Math.floor(+decimals2Amount(amount || 0, decimals) * 1000000) / 1000000,
//     balanceDecimals: amount,
//     approve: 1000000000000000,
//   };
// }

export async function getTerraFee(address, msg, gasPrices): Promise<any> {
  try {
    const terra = new LCDClient({
      chainID: 'bombay-12',
      URL: 'https://lcd.terra.dev',
      gasPrices,
      gasAdjustment: 1.75,
    });
    const accountInfo = await terra.auth.accountInfo(address);
    const fee = await terra.tx.estimateFee(
      [
        {
          sequenceNumber: accountInfo.getSequenceNumber(),
          publicKey: accountInfo.getPublicKey(),
        },
      ],
      {
        msgs: [ msg ],
      },
    );
    return {
      fee,
      accountInfo,
    };
  } catch (e) {
    return { fee: 0, accountInfo: 0 };
  }
}

export async function getTerraMsgExecuteContract(res, contract, sender, gasPrices) {
  try {
    const { inToken, inAmount, execute_swap_operations } = res;
    const { address } = inToken;
    let msg;
    if (gasPrices[address]) {
      const coins = {};
      coins[address] = +inAmount;
      msg = new MsgExecuteContract(
        sender,
        contract,
        {
          execute_swap_operations,
        },
        coins,
      );
    } else {
      msg = new MsgExecuteContract(
        sender,
        address,
        {
          send: {
            contract,
            amount: inAmount,
            msg: Buffer.from(JSON.stringify(execute_swap_operations)).toString('base64'),
          },
        },
        [],
      );
    }
    return msg;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function swap_quote_terra(address, res, contract) {
  try {
    const gasPrices = await axios.get('https://fcd.terra.dev/v1/txs/gas_prices');
    const msg = await getTerraMsgExecuteContract(res, contract, address, gasPrices.data);
    const { fee, accountInfo } = await getTerraFee(address, msg, gasPrices.data);
    return { code: 200, data: {
      msgs: [ msg ],
      gasAdjustment: 1.5,
      waitForConfirmation: true,
      fee,
      account_number: accountInfo.account_number,
      sequence: accountInfo.sequence,
      purgeQueue: true },
    };
  } catch (error) {
    console.log(error);
    return { code: 500, error };
  }
}
