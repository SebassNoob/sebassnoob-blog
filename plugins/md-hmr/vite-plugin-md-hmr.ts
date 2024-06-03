import { PluginOption } from 'vite';

export default function mdHmr(): PluginOption {
  return {
    name: 'md-hmr',

    handleHotUpdate({ file, server }) {
      if (file.endsWith('.md')) {
        server.config.logger.info(`${file} changed, restarting server...`, {
          timestamp: true,
          clear: true,
        });

        server.hot.send({
          type: 'full-reload',
          path: '*',
        });

        server.config.logger.info(`server restarted.`, { timestamp: true });
      }
    },
  };
}
