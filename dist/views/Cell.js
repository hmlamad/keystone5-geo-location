"use strict";
// @flow
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
class CheckboxCellView extends react_1.Component {
    constructor() {
        super(...arguments);
        this.roundToDecimalPlace = (value, decimalPlace) => Math.round(value * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
    }
    render() {
        const { data } = this.props;
        if (!data || !data.lat || !data.lng) {
            return null;
        }
        const locations = [
            `Lng: ${this.roundToDecimalPlace(data.lng, 5)}`,
            `Lat: ${this.roundToDecimalPlace(data.lat, 5)}`,
        ];
        return react_1.default.createElement("span", null, locations.join(', '));
    }
}
exports.default = CheckboxCellView;
//# sourceMappingURL=Cell.js.map