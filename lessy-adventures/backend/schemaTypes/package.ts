export default {
  name: 'package',
  title: 'Tour Package',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Package Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Beach Packages', value: 'beach' },
          { title: 'Hiking Packages', value: 'hiking' },
          { title: 'Weekend Getaways', value: 'weekend' },
          { title: 'Group Tours', value: 'group' },
          { title: 'Corporate Retreats', value: 'corporate' },
          { title: 'International Trips', value: 'international' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Starting Price',
      type: 'number',
    },
    {
      name: 'duration',
      title: 'Duration (e.g. 3 Days, 2 Nights)',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
}
