# Type alias: Keyword

> **Keyword**: `object`

A list of keywords and their types.
Only used for internal reference; not an actual interface.
Not for export.

## See

https://www.w3.org/TR/json-ld/#keywords

## Type declaration

### @base

> **@base**: `string` \| `null`

### @container

> **@container**: `"@list"` \| `"@set"` \| [`ContainerType`](ContainerType.md) \| (`"@list"` \| `"@set"` \| [`ContainerType`](ContainerType.md))[] \| [`ContainerTypeArray`](ContainerTypeArray.md) \| `null`

### @context

> **@context**: `null` \| `string` \| [`IContextDefinition`](../interfaces/IContextDefinition.md) \| (`null` \| `string` \| [`IContextDefinition`](../interfaces/IContextDefinition.md))[]

### @direction

> **@direction**: `"ltr"` \| `"rtl"` \| `null`

### @graph

> **@graph**: [`IValueObject`](IValueObject.md) \| [`INodeObject`](../interfaces/INodeObject.md) \| ([`IValueObject`](IValueObject.md) \| [`INodeObject`](../interfaces/INodeObject.md))[]

### @id

> **@id**: `string` \| `string`[]

### @import

> **@import**: `string`

### @included

> **@included**: [`IIncludedBlock`](IIncludedBlock.md)

### @index

> **@index**: `string`

### @json

> **@json**: `"@json"`

### @language

> **@language**: `string`

### @list

> **@list**: [`ListOrSetItem`](ListOrSetItem.md) \| [`ListOrSetItem`](ListOrSetItem.md)[]

### @nest

> **@nest**: `object`

### @none

> **@none**: `"@none"`

### @prefix

> **@prefix**: `boolean`

### @propagate

> **@propagate**: `boolean`

### @protected

> **@protected**: `boolean`

### @reverse

> **@reverse**: `string`

### @set

> **@set**: [`ListOrSetItem`](ListOrSetItem.md) \| [`ListOrSetItem`](ListOrSetItem.md)[]

### @type

> **@type**: `string`

### @value

> **@value**: `null` \| `boolean` \| `number` \| `string`

### @version

> **@version**: `"1.1"`

### @vocab

> **@vocab**: `string` \| `null`
