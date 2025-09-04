import { Context } from "koa";

export default {
    async hello(ctx: Context) {
        console.log('=== DEBUG INFO ===');
        console.log('Authorization header:', ctx.request.header.authorization);
        console.log('User authenticated:', !!ctx.state.user);
        console.log('User object:', ctx.state.user);
        console.log('Auth strategy:', ctx.state.auth);
        console.log('Route info:', ctx.state.route);
        console.log('==================');

        try {
            ctx.body = {
                message: 'Hello from custom endpoint!',
                timestamp: new Date().toISOString(),
                user: ctx.state.user ? {
                    id: ctx.state.user.id,
                    username: ctx.state.user.username
                } : null,
                debug: {
                    hasAuth: !!ctx.request.header.authorization,
                    isAuthenticated: !!ctx.state.user
                }
            };
        } catch (error) {
            console.error('Error in custom endpoint:', error);
            ctx.status = 500;
            ctx.body = { error: 'Something went wrong' };
        }
    }
};
