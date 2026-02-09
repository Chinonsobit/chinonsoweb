export default {
    name: 'publication',
    title: 'Publication',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required()
        },
        {
            name: 'publicationType',
            title: 'Publication Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Journal Article', value: 'journal' },
                    { title: 'Policy Brief', value: 'policy' },
                    { title: 'Research Paper', value: 'research' },
                    { title: 'Working Paper', value: 'working' },
                    { title: 'Other', value: 'other' }
                ]
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'link',
            title: 'Link/URL',
            type: 'url',
            description: 'External link to the publication'
        },
        {
            name: 'file',
            title: 'PDF File',
            type: 'file',
            description: 'Upload PDF if not linking externally',
            options: {
                accept: '.pdf'
            }
        },
        {
            name: 'publishDate',
            title: 'Publication Date',
            type: 'date'
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Lucide icon name (e.g., file-text, briefcase)',
            initialValue: 'file-text'
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
            validation: Rule => Rule.required().min(0)
        }
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [
                { field: 'order', direction: 'asc' }
            ]
        },
        {
            title: 'Publication Date, Newest',
            name: 'dateDesc',
            by: [
                { field: 'publishDate', direction: 'desc' }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'publicationType',
            order: 'order'
        },
        prepare(selection) {
            const { title, subtitle, order } = selection
            return {
                title: title,
                subtitle: `${subtitle} (Order: ${order})`
            }
        }
    }
}
