import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::course.course', ({ strapi }) => ({
    async find(ctx) {
        const query = {
            fields: ['id', 'title', 'slug', 'overview', 'totalClasses', 'totalProblems'],
            populate: {
                thumbnail: true,
                modules: {
                    fields: ['id', 'title']
                }
            },
            filters: {
                publishedAt: { $notNull: true }
            },
        } as any;

        const { results, pagination } = await strapi.entityService.findPage('api::course.course', query);

        return this.transformResponse(results, { pagination });
    },

    async findOne(ctx) {
        const { id } = ctx.params;

        if (!id) {
            return ctx.badRequest('Document ID is required');
        }

        const populate = {
            thumbnail: true,
            modules: {
                populate: {
                    topics: true,
                },
            },
        };

        const course = await strapi.entityService.findMany('api::course.course', {
            filters: { documentId: { $eq: id } } as any,
            populate,
        });

        if (!course || course.length === 0) {
            return ctx.notFound('Course not found');
        }

        return this.transformResponse(course[0]);
    },




}));