export default {
  name: 'hero',
  title: 'Hero Images',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for this hero image'
    },
    {
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this image should appear (1 = first)',
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this hero image should be displayed',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      order: 'order'
    },
    prepare(selection: any) {
      const { title, media, order } = selection
      return {
        title: title || `Hero Image ${order}`,
        subtitle: `Order: ${order}`,
        media: media
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
} 