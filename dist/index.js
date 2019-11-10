"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_field_types_1 = require("@keystone-alpha/build-field-types");
const Implementation_1 = require("./Implementation");
exports.default = {
    type: 'GeoLocation',
    implementation: Implementation_1.GeoLocation,
    views: {
        Controller: build_field_types_1.importView('./views/Controller'),
        Field: build_field_types_1.importView('./views/Field'),
        Filter: build_field_types_1.importView('./views/Filter'),
        Cell: build_field_types_1.importView('./views/Cell'),
    },
    adapters: {
        mongoose: Implementation_1.MongoGeoLocationInterface,
        knex: Implementation_1.KnexGeoLocationInterface,
    },
};
//# sourceMappingURL=index.js.map