import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

//bcrypt
@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}

  async login(username: string, password: string) {
    console.log(username, password);
    const { data } = await firstValueFrom(
      this.http.post(
        'http://localhost:8086/auth/realms/dicenter/protocol/openid-connect/token',
        new URLSearchParams({
          client_id: 'nest',
          client_secret: process.env.KEYCLOAK_SECRET,
          grant_type: 'password',
          username,
          password,
        }),
      ),
    );
    return data;
  }
}
