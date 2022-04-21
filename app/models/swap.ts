import { QuoteModel } from './quote';
export interface SwapModel extends QuoteModel{
  slippage: number;
  account: string,
  inTokenSymbol?: string;
  inTokenDecimals?: number,
  outTokenSymbol?: string;
  outTokenDecimals?: number,
  sender?: string,
  referrer?: string;
}
