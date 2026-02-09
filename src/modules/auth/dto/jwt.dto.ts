export class JwtDto {
  id: number;
  email: string;
}

export class RequestUserDto extends JwtDto { }
