# Type alias: IExpandedTermDefinition

> **IExpandedTermDefinition**: `object` & `object` \| `object`

An expanded term definition is used to describe the mapping between a term
and its expanded identifier, as well as other properties of the value
associated with the term when it is used as key in a node object.

## See

https://www.w3.org/TR/json-ld11/#expanded-term-definition

## Type declaration

### @type?

> `optional` **@type**: `"@id"` \| `"@json"` \| `"@none"` \| `"@vocab"` \| `string`

### @language?

> `optional` **@language**: [`Keyword`](Keyword.md)\[`"@language"`\]

### @index?

> `optional` **@index**: [`Keyword`](Keyword.md)\[`"@index"`\]

### @context?

> `optional` **@context**: [`IContextDefinition`](../interfaces/IContextDefinition.md)

### @prefix?

> `optional` **@prefix**: [`Keyword`](Keyword.md)\[`"@prefix"`\]

### @propagate?

> `optional` **@propagate**: [`Keyword`](Keyword.md)\[`"@propagate"`\]

### @protected?

> `optional` **@protected**: [`Keyword`](Keyword.md)\[`"@protected"`\]
