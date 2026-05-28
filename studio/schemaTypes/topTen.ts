export default {
  name: 'topTen',
  title: 'Top 10 (En Çok İzlenenler)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Başlık',
      type: 'string',
      description: 'Carousel\'in üstünde görünen başlık',
      initialValue: 'En Çok İzlenenler'
    },
    {
      name: 'films',
      title: 'Filmler (Sıralı)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'film' }],
          validation: (Rule: any) => Rule.required()
        }
      ],
      description: 'Sıralamak için sürükle-bırak. İlk film 1 numara olarak gösterilir.',
      validation: (Rule: any) => Rule.required().min(1).max(10)
    },
    {
      name: 'isActive',
      title: 'Aktif',
      type: 'boolean',
      description: 'Bu listenin sitede gösterilip gösterilmeyeceği',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      films: 'films',
      isActive: 'isActive'
    },
    prepare(selection: any) {
      const { title, films, isActive } = selection
      return {
        title: title || 'En Çok İzlenenler',
        subtitle: `${films?.length || 0} film ${isActive ? '(Aktif)' : '(Pasif)'}`
      }
    }
  }
}
