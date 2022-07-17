/**
 * @description Exports the PM2 config
 * @module
 * @exports
 */
const settings  = {
  apps: [{
    name: 'blizzard',
    script: './lib/index.js',
    node_args: `-r dotenv/config ./lib/index.js dotenv_config_path=./lib/config/worlds/blizzard.env`,
    exec_mode: 'cluster',
    instances: 2,
    kill_timeout: 3000,
    wait_ready: true,
    shutdown_with_message: true
  }]
}

export { settings as default }