export default {
    name: 'award',
    title: 'Award/Certification',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Training', value: 'training' },
                    { title: 'Award', value: 'award' },
                    { title: 'Certification', value: 'certification' }
                ]
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required()
        },
        {
            name: 'issuer',
            title: 'Issuing Organization',
            type: 'string',
            description: 'Organization that issued the award/certification'
        },
        {
            name: 'date',
            title: 'Date Received',
            type: 'date'
        },
        {
            name: 'certificateFile',
            title: 'Certificate/Document',
            type: 'file',
            description: 'Upload certificate PDF or image',
            options: {
                accept: '.pdf,.jpg,.jpeg,.png'
            }
        },
        {
            name: 'credentialUrl',
            title: 'Credential URL',
            type: 'url',
            description: 'Link to verify credential online'
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order within type (lower numbers appear first)',
            validation: Rule => Rule.required().min(0)
        }
    ],
    orderings: [
        {
            title: 'Type, then Order',
            name: 'typeOrder',
            by: [
                { field: 'type', direction: 'asc' },
                { field: 'order', direction: 'asc' }
            ]
        },
        {
            title: 'Date, Newest',
            name: 'dateDesc',
            by: [
                { field: 'date', direction: 'desc' }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'type',
            issuer: 'issuer',
            order: 'order'
        },
        prepare(selection) {
            const { title, subtitle, issuer, order } = selection
            return {
                title: title,
                subtitle: `${subtitle}${issuer ? ' - ' + issuer : ''} (Order: ${order})`
            }
        }
    }
}
