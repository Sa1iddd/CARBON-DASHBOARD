import {SessionRepository} from '../../domain/port/SessionRepository';
import {TokenService} from '../../domain/port/TokenService';
import {AppError} from '@/lib/common/errors/AppError';

export class RefreshTokenUseCase {
  constructor(private sessionRepo: SessionRepository, private tokenService: TokenService) {}

  async execute(refreshToken: string) {
    // verify signature
    try {
      const payload = this.tokenService.verify<{ userId: string }>(refreshToken);
      const session = await this.sessionRepo.findByRefreshToken(refreshToken);
      if (!session) throw new AppError('Invalid refresh token', 401);
      if (payload.userId !== session.userId) {
        throw new AppError('Token does not match session', 401);
      }

      if (new Date() > session.expiresAt) throw new AppError('Refresh token expired', 401);

      const accessToken = this.tokenService.sign({ userId: session.userId }, { expiresIn: '15m' });
      return { accessToken };
    } catch (err) {
      throw new AppError('Invalid refresh token', 401);
    }
  }
}
