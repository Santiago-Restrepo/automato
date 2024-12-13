import { JWT, OAuth2Client } from 'google-auth-library';

export interface GoogleClientOptions {
  scopes?: string[];
}

export interface GoogleCredentials {
  clientEmail?: string;
  privateKey?: string;
}

class GoogleClient {
  private scopes: string[];
  private credentials: GoogleCredentials;

  constructor(
    options: GoogleClientOptions = {},
    credentials: Partial<GoogleCredentials>,
  ) {
    this.scopes = options.scopes || [];
    if (!credentials.clientEmail || !credentials.privateKey) {
      throw new Error(
        'Missing required credentials: clientEmail and privateKey',
      );
    }

    this.credentials = {
      clientEmail: credentials.clientEmail,
      privateKey: credentials.privateKey,
    };
  }

  /**
   * Authorizes the client using the provided credentials.
   * @return Authenticated Google OAuth client.
   */
  async authorize(): Promise<OAuth2Client> {
    try {
      const client = new JWT({
        email: this.credentials.clientEmail,
        key: this.credentials.privateKey,
        scopes: this.scopes,
      });
      return client;
    } catch (error) {
      throw new Error(`Authorization failed: ${error.message}`);
    }
  }
}

export default GoogleClient;
