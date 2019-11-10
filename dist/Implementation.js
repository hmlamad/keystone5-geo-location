"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fields_1 = require("@keystone-alpha/fields");
const adapter_mongoose_1 = require("@keystone-alpha/adapter-mongoose");
const adapter_knex_1 = require("@keystone-alpha/adapter-knex");
// Ref: https://mongoosejs.com/docs/geojson.html
const pointSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});
class GeoLocation extends fields_1.Implementation {
    constructor(path, { defaultZoom, defaultCenter, googleApiKey, defaultValue, showMap }) {
        super(...arguments);
        this.graphQLOutputType = 'GeoLocation';
        this.defaultCenter = defaultCenter || {
            lat: 22.28552,
            lng: 114.15769,
        };
        this.defaultValue = defaultValue || defaultCenter;
        this.defaultZoom = defaultZoom || 11;
        this.googleApiKey = googleApiKey || process.env.GOOGLE_API_KEY;
        if (typeof showMap === 'undefined') {
            this.showMap = true;
        }
        else {
            this.showMap = showMap || false;
        }
    }
    getGqlAuxTypes() {
        return [
            `
      type ${this.graphQLOutputType} {
        type: String!,
        coordinates: [Float!]!
      }
      input ${this.graphQLOutputType}Format{
        type: String!,
        coordinates: [Float!]!
      }
    `,
        ];
    }
    gqlOutputFields() {
        return [`${this.path}: ${this.graphQLOutputType}`];
    }
    gqlOutputFieldResolvers() {
        return {
            [this.path]: (item) => item[this.path],
        };
    }
    get gqlUpdateInputFields() {
        return [`${this.path}: ${this.graphQLOutputType}Format`];
    }
    get gqlCreateInputFields() {
        return [`${this.path}: ${this.graphQLOutputType}Format`];
    }
    extendAdminMeta(meta) {
        return Object.assign(Object.assign({}, meta), { defaultCenter: this.defaultCenter, defaultZoom: this.defaultZoom, googleApiKey: this.googleApiKey, showMap: this.showMap });
    }
}
exports.GeoLocation = GeoLocation;
class MongoGeoLocationInterface extends adapter_mongoose_1.MongooseFieldAdapter {
    rangeCheck(target, min, max) {
        return target !== NaN && min <= target && target <= max;
    }
    addToMongooseSchema(schema) {
        const validator = (locationObject) => {
            if (typeof locationObject !== 'object')
                return false;
            if (locationObject.type !== 'Point')
                return false;
            if (!locationObject.coordinates)
                return false;
            return (this.rangeCheck(locationObject.coordinates[0], -180, 180)
                && this.rangeCheck(locationObject.coordinates[1], -90, 90));
        };
        const schemaOptions = {
            type: pointSchema,
            validate: {
                validator: this.buildValidator(validator),
                message: '{VALUE} is not a valid geo coordinate',
            },
        };
        schema.add({
            [this.path]: this.mergeSchemaOptions(schemaOptions, this.config),
        });
    }
    buildValidator(validator) {
        return super.buildValidator(validator);
    }
    mergeSchemaOptions(schemaOptions, config) {
        return super.mergeSchemaOptions(schemaOptions, config);
    }
    getQueryConditions() {
        return {};
    }
}
exports.MongoGeoLocationInterface = MongoGeoLocationInterface;
class KnexGeoLocationInterface extends adapter_knex_1.KnexFieldAdapter {
    addToTableSchema(table) {
        table.jsonb(this.path);
    }
    getQueryConditions() {
        return {};
    }
}
exports.KnexGeoLocationInterface = KnexGeoLocationInterface;
//# sourceMappingURL=Implementation.js.map