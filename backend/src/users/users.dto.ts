import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password_confirmation: string;
}

export class LoginUserDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class UpdateProfileDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password_confirmation: string;
}
