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
class TextFilterView extends react_1.Component {
    constructor() {
        super(...arguments);
        this.valueToString = (value) => {
            // Make the value a string to prevent loss of accuracy and precision.
            if (typeof value === 'string') {
                return value;
            }
            else if (typeof value === 'number') {
                return String(value);
            }
            else {
                // If it is neither string nor number then it must be empty.
                return '';
            }
        };
        this.handleChange = (event) => {
            const value = event.target.value;
            this.props.onChange(value.replace(/[^0-9.,]+/g, ''));
        };
    }
    render() {
        const { filter, field, innerRef, value } = this.props;
        if (!filter)
            return null;
        const placeholder = field.getFilterLabel(filter);
        return react_1.default.createElement("div", null);
    }
}
exports.default = TextFilterView;
//# sourceMappingURL=Filter.js.map