# Class: JsonLdHelper

Class to help with JSON LD.

## Constructors

### new JsonLdHelper()

> **new JsonLdHelper**(): [`JsonLdHelper`](JsonLdHelper.md)

#### Returns

[`JsonLdHelper`](JsonLdHelper.md)

## Methods

### validate()

> `static` **validate**\<`T`\>(`propertyName`, `document`, `validationFailures`, `validationMode`?): `Promise`\<`boolean`\>

Validate a JSON LD document.

#### Type parameters

• **T** *extends* `JsonLdDocument` = `JsonLdDocument`

#### Parameters

• **propertyName**: `string`

The name of the property being validated to use in error messages.

• **document**: `T`

The data to validate.

• **validationFailures**: `IValidationFailure`[]

The list of validation failures to add to.

• **validationMode?**: `"schema"` \| `"validate"` \| `"either"`

The validation mode to use, defaults to either.

#### Returns

`Promise`\<`boolean`\>

True if the data was valid.
