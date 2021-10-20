// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMiddleWare from '../../../app/controller/middleWare';

declare module 'egg' {
  interface IController {
    middleWare: ExportMiddleWare;
  }
}
