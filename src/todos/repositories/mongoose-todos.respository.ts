import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { ITodosRepository } from '../interfaces/todos-repository.interface';
import type { ITodo } from '../interfaces/todo.interface';
import { TodoDocument, Todo } from '../schemas/todo.schema';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class MongooseTodosRepository implements ITodosRepository {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}
  async findAll(): Promise<ITodo[]> {
    return this.todoModel.find().exec();
  }
  async findById(id: string): Promise<ITodo | null> {
    return this.todoModel.findById(id).exec();
  }
  async create(createTodoDto: CreateTodoDto): Promise<ITodo> {
    const newTodo = new this.todoModel(createTodoDto);
    return newTodo.save();
  }
  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<ITodo | null> {
    return this.todoModel
      .findByIdAndUpdate(id, updateTodoDto, { new: true })
      .exec();
  }
  async delete(id: string): Promise<ITodo | null> {
    const result = await this.todoModel.findByIdAndDelete(id).exec();
    return result;
  }
}
