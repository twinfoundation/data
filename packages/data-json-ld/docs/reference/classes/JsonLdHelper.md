# Class: JsonLdHelper

Class to help with JSON LD.

## Constructors

### new JsonLdHelper()

> **new JsonLdHelper**(): [`JsonLdHelper`](JsonLdHelper.md)

#### Returns

[`JsonLdHelper`](JsonLdHelper.md)

## Methods

### validate()

> `static` **validate**\<`T`\>(`document`, `validationFailures`, `validationMode`?): `Promise`\<`boolean`\>

Validate a JSON-LD document.

#### Type Parameters

• **T** *extends* [`IJsonLdDocument`](../type-aliases/IJsonLdDocument.md) = [`IJsonLdDocument`](../type-aliases/IJsonLdDocument.md)

#### Parameters

• **document**: `T`

The JSON-LD document to validate.

• **validationFailures**: `IValidationFailure`[]

The list of validation failures to add to.

• **validationMode?**: `ValidationMode`

The validation mode to use, defaults to either.

#### Returns

`Promise`\<`boolean`\>

True if the document was valid.

***

### extractProperty()

> `static` **extractProperty**\<`T`\>(`nodeObject`, `propertyNames`, `deleteProperty`): `undefined` \| `T`

Extract a property from the JSON-LD.

#### Type Parameters

• **T**

#### Parameters

• **nodeObject**: [`IJsonLdNodeObject`](../interfaces/IJsonLdNodeObject.md)

The JSON-LD node object to extract from.

• **propertyNames**: `string`[]

The possible names for the property.

• **deleteProperty**: `boolean` = `true`

Delete the property from the object, defaults to true.

#### Returns

`undefined` \| `T`

The properties if available.

***

### combineContexts()

> `static` **combineContexts**(`context1`, `context2`): `Promise`\<`undefined` \| [`IJsonLdContextDefinitionRoot`](../type-aliases/IJsonLdContextDefinitionRoot.md)\>

Combine contexts.

#### Parameters

• **context1**: `undefined` \| [`IJsonLdContextDefinitionRoot`](../type-aliases/IJsonLdContextDefinitionRoot.md)

The first JSON-LD context to combine.

• **context2**: `undefined` \| [`IJsonLdContextDefinitionRoot`](../type-aliases/IJsonLdContextDefinitionRoot.md)

The second JSON-LD context to combine.

#### Returns

`Promise`\<`undefined` \| [`IJsonLdContextDefinitionRoot`](../type-aliases/IJsonLdContextDefinitionRoot.md)\>

The combined context.
