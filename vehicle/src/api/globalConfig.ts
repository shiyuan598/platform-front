declare global {
    interface Window {
        globalConfig?: any;
    }
}
const globalConfig = window.globalConfig;
// const baseUrl = globalConfig.api;
export default globalConfig;