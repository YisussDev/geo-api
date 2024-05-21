import { errorsDictionarie } from "../../../dictionaries/errors/mongo/errors.dictionarie";

export const ExtractErrorsMongo = (allErrors: any): ErrorGeneral[] => {
  const errorsFound: ErrorGeneral[] = [];
  for (const error in allErrors.errors) {
    const nameProperty: string = error;
    const errorProperties: ErrorProperties = allErrors.errors[error].properties;
    errorsFound.push({
      property: nameProperty,
      message: errorProperties.message
    });
  }
  if (allErrors.code) {
    errorsFound.push({
      property: "Primary Key",
      message: errorsDictionarie[allErrors.code].message
    });
  }
  return errorsFound;
};

export interface ErrorGeneral {
  message: string;
  property: string;
}

export interface ErrorProperties {
  validator: string;
  message: string;
  type: string;
  path: string;
  fullPath: string | undefined;
  value: string | undefined;

}