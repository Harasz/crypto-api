import { JwtModule } from '@nestjs/jwt';

import { JwtConfig } from './jwt.config';

export const AppJwtModule = JwtModule.registerAsync({
  useClass: JwtConfig,
});
