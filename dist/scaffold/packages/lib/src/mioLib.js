"use strict";
/**
 *
 * A library of pure static functions
 *
 * @module
 */
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
exports.findMioRootDir = exports.persistence = exports.security = void 0;
var path_1 = __importDefault(require("path"));
var security = __importStar(require("./mioSecurity"));
exports.security = security;
var persistence = __importStar(require("./mioPersistence"));
exports.persistence = persistence;
/**
 * Finds the root folder of the mio installation
 *
 * @param childDirName The directory the function is being called from.
 * @param rootDirName The name of the root directory to be sought. Defaults to `mioScaffold`.
 * @returns The file path of the root installation
 */
function findMioRootDir(childDirName, rootDirName) {
    if (childDirName === void 0) { childDirName = __dirname; }
    if (rootDirName === void 0) { rootDirName = 'mioScaffold'; }
    if (childDirName === '/')
        throw Error("Cannot find the project root folder: '".concat(rootDirName, "'"));
    return childDirName.endsWith("/".concat(rootDirName, "/")) ? childDirName : findMioRootDir(path_1["default"].join(childDirName, '../'), rootDirName);
}
exports.findMioRootDir = findMioRootDir;
exports["default"] = {
    security: security,
    persistence: persistence,
    findMioRootDir: findMioRootDir
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlvTGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbGliL3NyYy9taW9MaWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILDhDQUF3QjtBQUN4QixzREFBMEM7QUFHakMsNEJBQVE7QUFGakIsNERBQWdEO0FBR3ZDLGtDQUFXO0FBRXBCOzs7Ozs7R0FNRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxZQUF3QixFQUFFLFdBQTJCO0lBQXJELDZCQUFBLEVBQUEsd0JBQXdCO0lBQUUsNEJBQUEsRUFBQSwyQkFBMkI7SUFDbkYsSUFBSSxZQUFZLEtBQUssR0FBRztRQUFFLE1BQU0sS0FBSyxDQUFDLGdEQUF5QyxXQUFXLE1BQUcsQ0FBQyxDQUFDO0lBQy9GLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFJLFdBQVcsTUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLGlCQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUMvSCxDQUFDO0FBSEQsd0NBR0M7QUFHRCxxQkFBZTtJQUNkLFFBQVEsVUFBQTtJQUNSLFdBQVcsYUFBQTtJQUNYLGNBQWMsZ0JBQUE7Q0FDZCxDQUFDIn0=