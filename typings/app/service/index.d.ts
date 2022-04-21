// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAborad from '../../../app/service/Aborad';
import ExportAcross from '../../../app/service/Across';
import ExportGlobData from '../../../app/service/GlobData';
import ExportHome from '../../../app/service/Home';
import ExportOpenOcean from '../../../app/service/OpenOcean';
import ExportWallet from '../../../app/service/Wallet';

declare module 'egg' {
  interface IService {
    aborad: AutoInstanceType<typeof ExportAborad>;
    across: AutoInstanceType<typeof ExportAcross>;
    globData: AutoInstanceType<typeof ExportGlobData>;
    home: AutoInstanceType<typeof ExportHome>;
    openOcean: AutoInstanceType<typeof ExportOpenOcean>;
    wallet: AutoInstanceType<typeof ExportWallet>;
  }
}
