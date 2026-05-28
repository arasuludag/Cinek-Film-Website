export default {
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'href',
      title: 'YouTube Link',
      type: 'url',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      rows: 5,
      description: 'Popup içinde gösterilen film açıklaması. Boş bırakılırsa açıklama görünmez.'
    }
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'poster'
    },
    prepare(selection: any) {
      const { title, date, media } = selection
      return {
        title: title,
        subtitle: new Date(date).toLocaleDateString('tr-TR', {
          year: 'numeric',
          month: 'long'
        }),
        media: media
      }
    }
  }
} 