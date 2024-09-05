# Class: JsonLdProcessor

JSON-LD Processor.

## Constructors

### new JsonLdProcessor()

> **new JsonLdProcessor**(): [`JsonLdProcessor`](JsonLdProcessor.md)

#### Returns

[`JsonLdProcessor`](JsonLdProcessor.md)

## Properties

### \_redirects

> `static` `private` `readonly` **\_redirects**: `object`[] = `[]`

Redirects to use during document resolution.

## Methods

### DOCUMENT\_LOADER()

> `static` **DOCUMENT\_LOADER**(`url`): `Promise`\<`RemoteDocument`\>

The document loader to use.

#### Parameters

• **url**: `string`

#### Returns

`Promise`\<`RemoteDocument`\>

***

### compact()

> `static` **compact**(`document`, `context`?): `Promise`\<[`JsonLdDocument`](../type-aliases/JsonLdDocument.md)\>

Compact a document according to a particular context.

#### Parameters

• **document**: [`JsonLdDocument`](../type-aliases/JsonLdDocument.md)

The JSON-LD document to compact.

• **context?**: [`ContextDefinition`](../interfaces/ContextDefinition.md)

The context to compact the document to.

#### Returns

`Promise`\<[`JsonLdDocument`](../type-aliases/JsonLdDocument.md)\>

The compacted JSON-LD document.

***

### expand()

> `static` **expand**(`compacted`): `Promise`\<[`JsonLdDocument`](../type-aliases/JsonLdDocument.md)\>

Expand a document, removing its context.

#### Parameters

• **compacted**: [`JsonLdDocument`](../type-aliases/JsonLdDocument.md)

The compacted JSON-LD document to expand.

#### Returns

`Promise`\<[`JsonLdDocument`](../type-aliases/JsonLdDocument.md)\>

The expanded JSON-LD document.

***

### addRedirect()

> `static` **addRedirect**(`from`, `to`): `void`

Add a redirect to use during document resolution.

#### Parameters

• **from**: `RegExp`

The URL to redirect from.

• **to**: `string`

The URL to redirect to.

#### Returns

`void`
