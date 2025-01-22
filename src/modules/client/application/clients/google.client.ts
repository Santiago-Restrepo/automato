import { JWT, OAuth2Client } from 'google-auth-library';

export interface GoogleClientOptions {
  scopes?: string[];
}

export interface GoogleCredentials {
  client_email?: string;
  private_key?: string;
}

class GoogleClient {
  private scopes: string[];
  private credentials: GoogleCredentials;

  constructor(
    options: GoogleClientOptions = {},
    credentials: Partial<GoogleCredentials>,
  ) {
    this.scopes = options.scopes || [];
    const { client_email, private_key } = credentials;
    if (!client_email || !private_key) {
      throw new Error(
        'Missing required credentials: clientEmail and privateKey',
      );
    }

    this.credentials = {
      client_email,
      private_key,
    };
  }

  /**
   * Authorizes the client using the provided credentials.
   * @return Authenticated Google OAuth client.
   */
  async authorize(): Promise<OAuth2Client> {
    try {
      const client = new JWT({
        email: this.credentials.client_email,
        key: this.credentials.private_key,
        scopes: this.scopes,
      });
      return client;
    } catch (error) {
      throw new Error(`Authorization failed: ${error.message}`);
    }
  }
}

export default GoogleClient;
