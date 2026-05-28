export default {
  name: 'teamMember',
  title: 'Ekip Üyesi',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Ad',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'role',
      title: 'Görev',
      type: 'string',
      description: 'Örn: Yönetmen/Oyuncu, Animasyon/VFX'
    },
    {
      name: 'photo',
      title: 'Fotoğraf',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'bio',
      title: 'Biyografi',
      type: 'text',
      rows: 12,
      description: '"Daha Fazla" tıklandığında açılan pencerede gösterilen metin. Yeni satırlar paragraf olarak görüntülenir.'
    },
    {
      name: 'order',
      title: 'Sıra',
      type: 'number',
      description: 'Listelenme sırası (1 = ilk)'
    }
  ],
  orderings: [
    {
      title: 'Sıraya göre',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo'
    }
  }
}
