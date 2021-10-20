export const TRANSFER_ABI: any = {
  inputs: [
    {
      name: '_from',
      type: 'address',
    },
    {
      name: '_to',
      type: 'address',
    },
    {
      name: '',
      type: 'bool',
    }],
  name: 'transferFrom',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
};
