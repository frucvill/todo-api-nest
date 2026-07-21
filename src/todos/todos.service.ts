import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ITodo } from './interfaces/todo.interface';
import type { ITodosRepository } from './interfaces/todos-repository.interface';
import { TODOS_REPOSITORY } from './interfaces/todos-repository.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @Inject(TODOS_REPOSITORY)
    private readonly todosRepository: ITodosRepository,
  ) {}

  async findAll(): Promise<ITodo[]> {
    return this.todosRepository.findAll();
  }
  async findOne(id: string): Promise<ITodo> {
    const todo = await this.todosRepository.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ${id} not found`);
    }
    return todo;
  }
  async create(createTodoDto: CreateTodoDto): Promise<ITodo> {
    return this.todosRepository.create(createTodoDto);
  }
  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<ITodo> {
    const updatedTodo = await this.todosRepository.update(id, updateTodoDto);
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ${id} not found`);
    }
    return updatedTodo;
  }
  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.todosRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Todo with ${id} not found`);
    }
    return { message: `Todo with ${id} has been deleted` };
  }
}
