export const logger = {
  log: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✓ ${msg}`),
  error: (msg) => console.error(`✗ ${msg}`),
  warn: (msg) => console.warn(`⚠️  ${msg}`),
  debug: (msg) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🐛 ${msg}`);
    }
  },
};
