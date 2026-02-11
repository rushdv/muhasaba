import app from './app';
import { config } from './config';

const PORT = config.server.port;

// Start the server for local development
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${config.server.env}`);
    console.log(`🌐 CORS enabled for: ${config.cors.origins.join(', ')}`);
});
