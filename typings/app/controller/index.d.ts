// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAborad from '../../../app/controller/aborad';
import ExportAcross from '../../../app/controller/across';
import ExportHome from '../../../app/controller/home';
import ExportOpenOcean from '../../../app/controller/openOcean';
import ExportWallet from '../../../app/controller/wallet';

declare module 'egg' {
  interface IController {
    aborad: ExportAborad;
    across: ExportAcross;
    home: ExportHome;
    openOcean: ExportOpenOcean;
    wallet: ExportWallet;
  }
}
