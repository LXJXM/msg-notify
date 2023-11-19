// Chrome Extension 最终build目录
export const CRX_OUTDIR = "build"
// 临时build content script 的目录
export const CRX_CONTENT_OUTDIR = "_build_content"
// 临时build background script 的目录
export const CRX_BACKGROUND_OUTDIR = "_build_background"
/**
 * 1. popup项目是一个包含html、css、登文件的完整小型网站，按照Vite的默认配置即可直接build生成。
 * 但是content script、background script 是没有html的，配置不一样需要单独build。
 * 
 * 
 * 
 */