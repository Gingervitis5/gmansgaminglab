import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './categoryType'
import { themeType } from './themeType'
import { addressType } from './addressType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, themeType, addressType],
}
