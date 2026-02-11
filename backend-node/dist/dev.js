"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const PORT = config_1.config.server.port;
// Start the server for local development
app_1.default.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${config_1.config.server.env}`);
    console.log(`🌐 CORS enabled for: ${config_1.config.cors.origins.join(', ')}`);
});
//# sourceMappingURL=dev.js.map