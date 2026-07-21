import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { MongooseTodosRepository } from './repositories/mongoose-todos.respository';
import { TODOS_REPOSITORY } from './interfaces/todos-repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodosController],
  providers: [
    TodosService,
    {
      provide: TODOS_REPOSITORY,
      useClass: MongooseTodosRepository,
    },
  ],
})
export class TodosModule {}
