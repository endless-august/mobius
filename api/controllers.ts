import { Controller } from './common/server';
import { LoginService } from './service/login';

export const controllers: Controller[] = [{ path: '/web/login', service: new LoginService() }];
