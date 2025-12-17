// Environment configuration
export const config = {
  // Environment info
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,

  // External Links
  whatsappLink: "https://chat.whatsapp.com/CxkVX14yHcrLRpMoDVftMN",
  appDownloadLink: "http://svastha.fit/download",

  // Webhook URL
  webhookUrl: "https://strongbyyoga.com/wp-json/uap/v2/uap-76485-76486",
};

console.log(`🚀 App running in ${config.mode} mode`);
console.log(`📡 Using webhook: ${config.webhookUrl}`);
