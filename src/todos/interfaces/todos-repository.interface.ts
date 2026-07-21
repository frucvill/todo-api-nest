import { ITodo } from './todo.interface';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

export interface ITodosRepository {
  findAll(): Promise<ITodo[]>;
  findById(id: string): Promise<ITodo | null>;
  create(createTodoDto: CreateTodoDto): Promise<ITodo>;
  update(id: string, updateTodoDto: UpdateTodoDto): Promise<ITodo | null>;
  delete(id: string): Promise<ITodo | null>;
}

export const TODOS_REPOSITORY = 'TODOS_REPOSITORY';
