"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.lib = void 0;
var lib_1 = __importDefault(require("@mio/lib"));
exports.lib = lib_1["default"];
var path_1 = __importDefault(require("path"));
process.env['NODE_CONFIG_DIR'] = path_1["default"].join(lib_1["default"].findMioRootDir(), 'configs');
//export {config};
exports["default"] = {
    lib: lib_1["default"]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlvU2NhZmZvbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wYWNrYWdlcy9zY2FmZm9sZC9zcmMvbWlvU2NhZmZvbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaURBQTJCO0FBS25CLGNBTEQsZ0JBQUcsQ0FLQztBQUpYLDhDQUF3QjtBQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsaUJBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQUcsQ0FBQyxjQUFjLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUk1RSxrQkFBa0I7QUFFbEIscUJBQWU7SUFDZCxHQUFHLGtCQUFBO0NBRUgsQ0FBQyJ9