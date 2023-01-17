import lodashPkg from "lodash";
const { isArray } = lodashPkg;

export const pageSize = 100;

export function mapEntityProperties(row, entity, properties) {
    properties.forEach((property) => {
        let propertyName = property;
        let columnName = property;
        if (isArray(property)) [columnName, propertyName] = property;
        if (row[columnName]) entity[propertyName] = row[columnName];
    });
}
