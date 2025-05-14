import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ModerateCommentDto {
  @ApiProperty({
    description: 'The new status of the comment',
    example: 'approved',
    enum: ['pending', 'approved', 'rejected', 'spam'],
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['pending', 'approved', 'rejected', 'spam'])
  status: string;
}
