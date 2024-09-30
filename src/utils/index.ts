"use strict";

import _ from "lodash";

export const getData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

export const getDataInfo = <T extends object>({
  fields = [] as Array<keyof T>,
  object = {} as T,
}) => {
  if (!Array.isArray(fields)) {
    throw new TypeError("Fields should be an array");
  }

  if (typeof object !== "object" || object === null) {
    throw new TypeError("Object should be a not bull object");
  }

  return fields.reduce((result, field) => {
    if (field in object) {
      //   (result as Record<string, any>)[field] = object[field as keyof T];
      result[field] = object[field];
    }
    return result;
  }, {} as Partial<T>);
};
