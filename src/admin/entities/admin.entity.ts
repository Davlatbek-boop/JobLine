import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum AdminRole {
  SUPPERADMIN = 'supperadmin',
  ADMIN = 'admin',
}

@Entity()
export class Admin {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ali Valiyev' })
  @Column()
  first_name: string;

  @ApiProperty({ example: 'ali123' })
  @Column()
  last_name: string;

  @ApiProperty({ example: 'ali@example.com' })
  @Column()
  email: string;

  @ApiProperty({ example: '$2b$10$hashedPasswordString' })
  @Column()
  password_hash: string;

  @ApiProperty({ example: 'false' })
  @Column({ default: false })
  is_creator: string;

  @ApiProperty({
    example: 'true',
    description: 'Faqat "true" yoki "false" bo‘lishi mumkin',
  })
  @Column({ nullable: true, default: 'true' }) // Bazada default 'true'
  is_active: string;

  // @ApiProperty({ example: 'some-refresh-token', required: false })
  // @Column()
  // admin_refresh_token: string;

  @ApiProperty({
    example: '$2b$10$refresh...',
    description: 'Hashlangan refresh token',
    nullable: true,
    writeOnly: true,
  })
  @Column({ nullable: true })
  hashed_refresh_token: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'some-uuid-activation-link',
    description: 'Activation link',
    required: false,
  })
  active_link?: string;
}
