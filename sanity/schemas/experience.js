export default {
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
        {
            name: 'company',
            title: 'Company/Organization',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'role',
            title: 'Role/Position',
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
            name: 'startDate',
            title: 'Start Date',
            type: 'date'
        },
        {
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            description: 'Leave empty if current position'
        },
        {
            name: 'current',
            title: 'Current Position',
            type: 'boolean',
            initialValue: false
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
        }
    ],
    preview: {
        select: {
            title: 'company',
            subtitle: 'role',
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
