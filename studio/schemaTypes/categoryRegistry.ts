export default {
  name: 'categoryRegistry',
  title: 'Category Registry',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for this registry',
      initialValue: 'Category Registry'
    },
    {
      name: 'orderedCategories',
      title: 'Ordered Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
          validation: (Rule: any) => Rule.required()
        }
      ],
      description: 'Drag and drop to reorder categories. All categories will be included automatically.',
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this registry configuration is active',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      categoryCount: 'orderedCategories',
      isActive: 'isActive'
    },
    prepare(selection: any) {
      const { title, categoryCount, isActive } = selection
      return {
        title: title,
        subtitle: `${categoryCount?.length || 0} categories ${isActive ? '(Active)' : '(Inactive)'}`
      }
    }
  }
} 