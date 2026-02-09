export default {
    name: 'about',
    title: 'About Section',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'About Me',
            validation: Rule => Rule.required()
        },
        {
            name: 'paragraphs',
            title: 'Content Paragraphs',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'text',
                            title: 'Paragraph Text',
                            type: 'text',
                            validation: Rule => Rule.required()
                        },
                        {
                            name: 'order',
                            title: 'Order',
                            type: 'number',
                            validation: Rule => Rule.required().min(0)
                        }
                    ],
                    preview: {
                        select: {
                            title: 'text',
                            order: 'order'
                        },
                        prepare(selection) {
                            const { title, order } = selection
                            return {
                                title: title.substring(0, 60) + '...',
                                subtitle: `Paragraph ${order + 1}`
                            }
                        }
                    }
                }
            ],
            validation: Rule => Rule.required().min(1)
        },
        {
            name: 'lastUpdated',
            title: 'Last Updated',
            type: 'datetime',
            readOnly: true
        }
    ],
    preview: {
        select: {
            title: 'title'
        },
        prepare(selection) {
            return {
                title: selection.title,
                subtitle: 'About Section Content'
            }
        }
    }
}
