# Interface: NodeObject

A node object represents zero or more properties of a node
in the graph serialized by the JSON-LD document.

## See

https://www.w3.org/TR/json-ld11/#node-objects

## Indexable

 \[`key`: `string`\]: `OrArray`\<`null` \| `boolean` \| `number` \| `string` \| [`NodeObject`](NodeObject.md) \| [`GraphObject`](GraphObject.md) \| [`ValueObject`](../type-aliases/ValueObject.md) \| [`ListObject`](ListObject.md) \| [`SetObject`](SetObject.md)\> \| [`LanguageMap`](LanguageMap.md) \| [`IndexMap`](IndexMap.md) \| [`IncludedBlock`](../type-aliases/IncludedBlock.md) \| [`IdMap`](IdMap.md) \| [`TypeMap`](TypeMap.md) \| [`NodeObject`](NodeObject.md)\[keyof [`NodeObject`](NodeObject.md)\]

## Properties

### @context?

> `optional` **@context**: `OrArray`\<`null` \| `string` \| [`ContextDefinition`](ContextDefinition.md)\>

***

### @id?

> `optional` **@id**: `OrArray`\<`string`\>

***

### @included?

> `optional` **@included**: [`IncludedBlock`](../type-aliases/IncludedBlock.md)

***

### @graph?

> `optional` **@graph**: `OrArray`\<[`NodeObject`](NodeObject.md)\>

***

### @nest?

> `optional` **@nest**: `OrArray`\<`JsonObject`\>

***

### @type?

> `optional` **@type**: `OrArray`\<`string`\>

***

### @reverse?

> `optional` **@reverse**: `object`

#### Index signature

 \[`key`: `string`\]: `Keyword`\[`"@reverse"`\]

***

### @index?

> `optional` **@index**: `string`
