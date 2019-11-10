"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const fields_1 = require("@arch-ui/fields");
const input_1 = require("@arch-ui/input");
const controls_1 = require("@arch-ui/controls");
const button_1 = require("@arch-ui/button");
const icons_1 = require("@arch-ui/icons");
const google_map_react_1 = __importDefault(require("google-map-react"));
const lodash_debounce_1 = __importDefault(require("lodash.debounce"));
class Maker extends react_1.Component {
    constructor() {
        super(...arguments);
        this.render = () => react_1.default.createElement(icons_1.LocationIcon, null);
    }
}
class TextField extends react_1.Component {
    constructor(props) {
        super(props);
        this.onSubFieldChange = type => event => {
            const value = event.target.value;
            const { value: location } = this.props;
            this.props.onChange(Object.assign({}, location, { [type]: parseFloat(value) }));
        };
        this.setCurrentGeoLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
                    this.props.onChange({
                        lat,
                        lng,
                    });
                });
            }
            else {
                alert('Browser does not support location fetching');
            }
        };
        this.valueToString = value => {
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
        this.onDisplayMapChange = event => {
            this.setState({
                displayMap: event.target.checked,
            });
        };
        this.onMapClick = lodash_debounce_1.default(({ lat, lng }) => {
            const location = { lat, lng };
            this.props.onChange(Object.assign({}, location));
        }, 400, { leading: false, trailing: true });
        const { field } = this.props;
        this.state = {
            displayMap: field.config.showMap,
        };
    }
    render() {
        const { autoFocus, field, value = {}, errors } = this.props;
        const { defaultCenter, defaultZoom, googleApiKey } = field.config;
        const { lng, lat } = value || defaultCenter;
        const { displayMap } = this.state;
        const htmlID = `ks-input-${field.path}`;
        const mapComponent = (react_1.default.createElement("div", { style: { height: '300px', width: '100%' } },
            react_1.default.createElement(google_map_react_1.default, { bootstrapURLKeys: {
                    key: googleApiKey,
                    language: 'en',
                    region: 'en',
                }, defaultCenter: defaultCenter, center: value, defaultZoom: defaultZoom, onClick: this.onMapClick }, lat && lng && react_1.default.createElement(Maker, { lat: lat, lng: lng }))));
        return (react_1.default.createElement(fields_1.FieldContainer, null,
            react_1.default.createElement(fields_1.FieldLabel, { htmlFor: htmlID, field: field, errors: errors }),
            react_1.default.createElement(fields_1.FieldInput, null,
                react_1.default.createElement("label", { style: { lineHeight: '2.2em' } }, "Latitude "),
                react_1.default.createElement(input_1.Input, { autoComplete: "off", autoFocus: autoFocus, type: "number", min: "-90.0", max: "90.0", step: "any", value: this.valueToString(lat), onChange: this.onSubFieldChange('lat'), id: `${htmlID}['lat']`, placeholder: 'Latitude' }),
                react_1.default.createElement("label", { style: { lineHeight: '2.2em' } }, "Longitude "),
                react_1.default.createElement(input_1.Input, { autoComplete: "off", autoFocus: false, type: "number", min: "-180.0", max: "180.0", step: "any", value: this.valueToString(lng), onChange: this.onSubFieldChange('lng'), id: `${htmlID}['lng']`, placeholder: 'Longitude' })),
            react_1.default.createElement(controls_1.CheckboxPrimitive, { checked: displayMap, onChange: this.onDisplayMapChange }, "Show Map?"),
            displayMap && mapComponent,
            react_1.default.createElement(button_1.Button, { onClick: this.setCurrentGeoLocation, variant: "ghost" }, "Set to current location")));
    }
}
exports.default = TextField;
//# sourceMappingURL=Field.js.map