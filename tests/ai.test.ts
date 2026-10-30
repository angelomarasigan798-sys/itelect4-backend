import jwt from 'jsonwebtoken';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../src/config/db', () => ({
  connectDB: vi.fn().mockResolvedValue(undefined),
}));

import { app } from '../src/app';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is required to sign the test token.');
  }
  return secret;
}

describe('POST /api/ai authentication', () => {
  it('returns 401 when no token is sent', async () => {
    const response = await request(app).post('/api/ai').send({});

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/No token/);
  });

  it('lets a valid token reach request validation without calling Gemini', async () => {
    const token = jwt.sign({ userId: 'gt6-test-user' }, getJwtSecret());
    const response = await request(app)
      .post('/api/ai')
      .set('Authorization', `Bearer ${token}`)
      .send({ prompt: 'short' });

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain(
      'Describe your project in at least 20 characters.',
    );
  });
});
