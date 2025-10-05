export interface AppConfig {
  idpBase: string;
  clientId: string;
  apiBase: string;
  scope: string; // space-separated
  // redirectUri is computed: `${location.origin}/auth/callback`
}