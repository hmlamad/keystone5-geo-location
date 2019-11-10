"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("@keystone-alpha/fields/Controller"));
class GeoLocationController extends Controller_1.default {
    constructor() {
        super(...arguments);
        this.getFilterGraphQL = ({ type, value }) => {
            const key = type === "is" ? `${this.path}` : `${this.path}_${type}`;
            return `${key}: "${value}"`;
        };
        this.getFilterLabel = ({ label }) => {
            return `${this.label} ${label.toLowerCase()}`;
        };
        this.formatFilter = ({ label, value }) => {
            return `${this.getFilterLabel({ label })}: "${value}"`;
        };
        this.serialize = data => {
            const value = data[this.path];
            if (typeof value === "object") {
                return { type: "Point", coordinates: [value.lng, value.lat] };
            }
            else {
                return {};
            }
        };
        this.deserialize = data => {
            if (!data[this.path])
                return {};
            return {
                lng: data[this.path].coordinates[0],
                lat: data[this.path].coordinates[1]
            };
        };
        this.validateInput = ({ addFieldValidationError, originalInput, resolvedData }) => {
            const rangeCheck = (input, min, max) => input >= min && input <= max;
            if (!resolvedData)
                return false;
            const location = resolvedData[this.path];
            if (!location)
                return false;
            const [lng, lat] = location.coordinates;
            if (!lng) {
                addFieldValidationError("Longitude not found");
            }
            else if (lng == NaN) {
                addFieldValidationError("Longitude must be a number");
            }
            else if (!rangeCheck(lng, -180, 180)) {
                addFieldValidationError("Longitude should be in range -180 ~ 180");
            }
            if (!lat) {
                addFieldValidationError("Latitude not found");
            }
            else if (lat == NaN) {
                addFieldValidationError("Latitude must be a number");
            }
            else if (!rangeCheck(lat, -90, 90)) {
                addFieldValidationError("Latitude should be in range -90 ~ 90");
            }
        };
        this.getFilterTypes = () => [];
        this.getQueryFragment = () => `
    ${this.path} {
       coordinates
    }
  `;
    }
}
exports.default = GeoLocationController;
//# sourceMappingURL=Controller.js.map