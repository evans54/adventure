export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Image Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'destination',
      title: 'Destination',
      type: 'string',
      description: 'The city or country this image belongs to',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Nature', value: 'nature' },
          { title: 'Architecture', value: 'architecture' },
          { title: 'Culture', value: 'culture' },
          { title: 'Food', value: 'food' },
          { title: 'Adventure', value: 'adventure' },
        ],
      },
    },
  ],
}
