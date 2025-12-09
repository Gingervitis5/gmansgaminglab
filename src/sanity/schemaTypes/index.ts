import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './categoryType'
import { themeType } from './themeType'
import { addressType } from './addressType'
import { authorType } from './authorType'
import { blockContentType } from './blockContentType'
import { blogCategoryType } from './blogCategoryType'
import { blogType } from './blogType'
import { productType } from './productType'
import { orderType } from './orderType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [addressType, authorType, blockContentType, blogCategoryType, blogType, categoryType, orderType, productType, themeType],
}
