export default {
  name: 'aboutSection',
  title: 'Hakkında',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Başlık',
      type: 'string',
      initialValue: 'HAKKINDA',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'body',
      title: 'İçerik',
      type: 'text',
      rows: 8,
      description: 'Sitede HAKKINDA bölümünde gösterilen metin. Yeni satırlar paragraf olarak görüntülenir.'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'body'
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: subtitle ? subtitle.slice(0, 80) : ''
      }
    }
  }
}
