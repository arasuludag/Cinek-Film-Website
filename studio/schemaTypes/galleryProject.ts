export default {
  name: 'galleryProject',
  title: 'Galeri Projesi',
  type: 'document',
  description: 'Bir film/çekim projesine ait kamera arkası ve set fotoğrafları.',
  fields: [
    {
      name: 'title',
      title: 'Proje Başlığı',
      type: 'string',
      description: 'Galeride bu grubun üstünde görünen başlık.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'film',
      title: 'İlgili Film (opsiyonel)',
      type: 'reference',
      to: [{ type: 'film' }],
      description: 'Bu galeri bir filme aitse seçin. Başlık boşsa filmin adı kullanılabilir.'
    },
    {
      name: 'date',
      title: 'Tarih (opsiyonel)',
      type: 'date'
    },
    {
      name: 'description',
      title: 'Açıklama (opsiyonel)',
      type: 'text',
      rows: 3,
      description: 'Başlığın altında görünen kısa açıklama.'
    },
    {
      name: 'images',
      title: 'Fotoğraflar',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alternatif Metin (erişilebilirlik)',
              type: 'string'
            },
            {
              name: 'caption',
              title: 'Açıklama / Başlık (opsiyonel)',
              type: 'string'
            }
          ]
        }
      ],
      options: { layout: 'grid' },
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      description: 'Galerideki sıra (1 = ilk). Boşsa tarihe göre sıralanır.'
    },
    {
      name: 'isActive',
      title: 'Aktif',
      type: 'boolean',
      description: 'Bu projenin sitede gösterilip gösterilmeyeceği.',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      filmTitle: 'film.title',
      images: 'images',
      media: 'images.0',
      isActive: 'isActive'
    },
    prepare(selection: any) {
      const { title, filmTitle, images, media, isActive } = selection
      const count = images?.length || 0
      return {
        title: title || filmTitle || 'Galeri Projesi',
        subtitle: `${count} fotoğraf ${isActive ? '(Aktif)' : '(Pasif)'}`,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Sıralama',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'date', direction: 'desc' }
      ]
    }
  ]
}
