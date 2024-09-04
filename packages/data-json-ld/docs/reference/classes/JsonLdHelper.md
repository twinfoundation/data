# Class: JsonLdHelper

JSON-LD Helper.

## Constructors

### new JsonLdHelper()

> **new JsonLdHelper**(): [`JsonLdHelper`](JsonLdHelper.md)

#### Returns

[`JsonLdHelper`](JsonLdHelper.md)

## Methods

### buildJsonLdType()

> `static` **buildJsonLdType**(`properties`): `string`[]

Builds the JSON-LD @type.

#### Parameters

• **properties**: `undefined` \| `IProperty`[]

The current properties.

#### Returns

`string`[]

The LD Type encountered.

#### Throws

General Error if the input type cannot be converted to JSON-LD.

***

### registerStem()

> `static` **registerStem**(`stem`): `void`

Register a stem for use during term compaction.

#### Parameters

• **stem**: `string`

The stem to register.

#### Returns

`void`

***

### compactTerm()

> `static` **compactTerm**(`term`): `string`

Compacts a term. If URI prefix not known then it is kept as it is.

#### Parameters

• **term**: `string`

The term to be compacted.

#### Returns

`string`

The compacted version of the term.
