import { AppConfig } from "./app-config.model";


let _cfg: AppConfig | null = null;

export function setAppConfig(c: AppConfig) { _cfg = c; }

export function getAppConfig(): AppConfig {
  if (!_cfg) throw new Error('AppConfig not loaded');
  return _cfg;
}
