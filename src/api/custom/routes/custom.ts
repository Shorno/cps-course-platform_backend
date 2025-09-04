export default {
    routes: [
        {
            method: 'GET',
            path: '/custom',
            handler: 'custom.hello',
            config: {
                auth: {
                     // or specify specific roles
                },
                // Alternative: if you want no authentication
                // auth: false,
            },
        }
    ]
};
