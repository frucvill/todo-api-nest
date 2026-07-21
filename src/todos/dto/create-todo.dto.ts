import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'My first todo',
  })
  @IsString()
  @IsNotEmpty()
  readonly title!: string;
}
