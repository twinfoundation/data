# Type alias: ExpandedTermDefinition

> **ExpandedTermDefinition**: `object` & `object` \| `object`

An expanded term definition is used to describe the mapping between a term
and its expanded identifier, as well as other properties of the value
associated with the term when it is used as key in a node object.

## See

https://www.w3.org/TR/json-ld11/#expanded-term-definition

## Type declaration

### @type?

> `optional` **@type**: `"@id"` \| `"@json"` \| `"@none"` \| `"@vocab"` \| `string`

### @language?

> `optional` **@language**: `Keyword`\[`"@language"`\]

### @index?

> `optional` **@index**: `Keyword`\[`"@index"`\]

### @context?

> `optional` **@context**: [`ContextDefinition`](../interfaces/ContextDefinition.md)

### @prefix?

> `optional` **@prefix**: `Keyword`\[`"@prefix"`\]

### @propagate?

> `optional` **@propagate**: `Keyword`\[`"@propagate"`\]

### @protected?

> `optional` **@protected**: `Keyword`\[`"@protected"`\]
