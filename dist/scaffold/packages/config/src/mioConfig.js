"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.config = void 0;
var path_1 = __importDefault(require("path"));
var lib = __importStar(require("@mio/lib"));
var scaffold_1 = __importDefault(require("@mio/scaffold"));
console.log(scaffold_1["default"]);
process.env['NODE_CONFIG_DIR'] = path_1["default"].join(lib.findMioRootDir(__dirname), 'configs');
console.log(process.env['NODE_CONFIG_DIR']);
var config_1 = __importDefault(require("config"));
/**
 * #### Provides the application configuration object.
 *
 * This object is provided by the [config](https://www.npmjs.com/package/config) package.
 * Please consult that documentation for general usage and concepts.
 *
 * The default configurations are store in the `../mioApp/configs` directory.
 *
 * @todo Point to default config files
 */
exports.config = config_1["default"];
exports["default"] = exports.config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlvQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29uZmlnL3NyYy9taW9Db25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0I7QUFDeEIsNENBQWdDO0FBRWhDLDJEQUFnQztBQUVoQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFHLENBQUMsQ0FBQztBQUdqQixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsaUJBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUVyRixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0FBRTVDLGtEQUErQjtBQUUvQjs7Ozs7Ozs7O0dBU0c7QUFDVSxRQUFBLE1BQU0sR0FBRyxtQkFBUyxDQUFDO0FBQ2hDLHFCQUFlLGNBQU0sQ0FBQyJ9