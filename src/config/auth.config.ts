import configuration from './configuration';

export const setupAuth = () => {
  return {
    secret: configuration().auth.secret,
    signOptions: { expiresIn: '1h' },
  };
};
