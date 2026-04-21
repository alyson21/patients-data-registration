const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevel = LEVELS[process.env.LOG_LEVEL] ?? LEVELS.info;

function log(level, message, extra = {}) {
  if (LEVELS[level] > currentLevel) return;
  process.stdout.write(
    JSON.stringify({ timestamp: new Date().toISOString(), level, message, ...extra }) + '\n'
  );
}

const logger = {
  info:  (msg, extra) => log('info',  msg, extra),
  warn:  (msg, extra) => log('warn',  msg, extra),
  error: (msg, extra) => log('error', msg, extra),
  debug: (msg, extra) => log('debug', msg, extra),
};

module.exports = logger;
