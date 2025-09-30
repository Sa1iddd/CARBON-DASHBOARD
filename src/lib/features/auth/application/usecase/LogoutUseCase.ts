import {SessionRepository} from '../../domain/port/SessionRepository';

export class LogoutUseCase {
  constructor(private sessionRepo: SessionRepository) {}

  async execute(refreshToken: string) {
    await this.sessionRepo.revokeByToken(refreshToken);
  }
}
