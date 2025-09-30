import {NextApiRequest, NextApiResponse} from 'next';
import {JwtTokenService} from '@/lib/features/auth/infrastructure/adapter/TokenServiceJwt';
import {mapError} from '@/lib/common/errors/errorMapper';

const tokenService = new JwtTokenService();

export async function requireAuth(req: NextApiRequest, res: NextApiResponse) {
  try {
    const auth = req.headers.authorization?.replace('Bearer ', '');
    if (!auth) {
      res.status(401).json({ error: 'Unauthorized' });
      return null;
    }
    return tokenService.verify<{ userId: string }>(auth);
  } catch (err) {
    const mapped = mapError(err);
    res.status(mapped.statusCode).json({ error: mapped.message });
    return null;
  }
}
