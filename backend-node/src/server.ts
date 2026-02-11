import app from './app';
import { config } from './config';
import { initDatabase } from './db/database';

const PORT = config.server.port;

// Initialize database and start server
const startServer = async () => {
    try {
        // Initialize database tables
        await initDatabase();
        console.log('✅ Database initialized');

        // Start listening
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📍 Environment: ${config.server.env}`);
            console.log(`🌐 CORS enabled for: ${config.cors.origins.join(', ')}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
