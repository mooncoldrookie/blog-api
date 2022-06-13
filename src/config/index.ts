import { merge } from 'lodash';
import defaultConfig from './config.default'
import { IAppConfig } from "./config.types";


/**
 * @description 用于智能提示
 */
export function defineConfig(config: IAppConfig): IAppConfig {
  return config;
}



/**
 * @description 根据环境变量 process.env.NODE_ENV 返回项目配置
 */
export function getAppConfig(){
  let appConfig :IAppConfig ={}
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    appConfig = require(`./config.${process.env.NODE_ENV}`).default;
  } catch (e) {

  }
  // 合并配置 覆盖默认环境配置
  return merge(defaultConfig, appConfig);
};
