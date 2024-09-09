# Interface: INodeObject

A node object represents zero or more properties of a node
in the graph serialized by the JSON-LD document.

## See

https://www.w3.org/TR/json-ld11/#node-objects

## Indexable

 \[`key`: `string`\]: [`INodePrimitive`](../type-aliases/INodePrimitive.md) \| [`INodePrimitive`](../type-aliases/INodePrimitive.md)[] \| [`ILanguageMap`](ILanguageMap.md) \| [`IIndexMap`](IIndexMap.md) \| [`IIncludedBlock`](../type-aliases/IIncludedBlock.md) \| [`IIdMap`](IIdMap.md) \| [`ITypeMap`](ITypeMap.md) \| [`INodeObject`](INodeObject.md)\[keyof [`INodeObject`](INodeObject.md)\]

## Properties

### @context?

> `optional` **@context**: `null` \| `string` \| [`IContextDefinition`](IContextDefinition.md) \| (`null` \| `string` \| [`IContextDefinition`](IContextDefinition.md))[]

***

### @id?

> `optional` **@id**: `string` \| `string`[]

***

### @included?

> `optional` **@included**: [`IIncludedBlock`](../type-aliases/IIncludedBlock.md)

***

### @graph?

> `optional` **@graph**: [`INodeObject`](INodeObject.md) \| [`INodeObject`](INodeObject.md)[]

***

### @nest?

> `optional` **@nest**: [`IJsonObject`](IJsonObject.md) \| [`IJsonObject`](IJsonObject.md)[]

***

### @type?

> `optional` **@type**: `string` \| `string`[]

***

### @reverse?

> `optional` **@reverse**: `object`

#### Index signature

 \[`key`: `string`\]: [`Keyword`](../type-aliases/Keyword.md)\[`"@reverse"`\]

***

### @index?

> `optional` **@index**: `string`
