import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

// Can be used in bot main.ts and the appropriate e2e test file
// Not the "nest way", do to this, but it works

export const setupApp = (app: any) => {
    app.use(
        cookieSession({
            keys: ['asdfasdf']
        }),
    );
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
};