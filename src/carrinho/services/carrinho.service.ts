import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Carrinho } from "../entities/carrinho.entity";
import { Produto } from "../../produto/entities/produto.entity";

@Injectable()
export class CarrinhoService {
  constructor(
    @InjectRepository(Carrinho)
    private readonly carrinhoRepository: Repository<Carrinho>
  ) {}

  findAll(): Promise<Carrinho[]> {
    return this.carrinhoRepository.find({ relations: ["produtos"] });
  }

  async findById(id: number): Promise<Carrinho> {
    const carrinho = await this.carrinhoRepository.findOne({
      where: { id },
      relations: ["produtos"], // Carregar os produtos relacionados
    });
  
    if (!carrinho) {
      throw new NotFoundException(`Carrinho com ID ${id} não encontrado.`);
    }
  
    return carrinho;
  }

  async create(carrinho: Carrinho): Promise<Carrinho> {
    return this.carrinhoRepository.save(carrinho);
  }

  async update(id: number, carrinho: Carrinho): Promise<Carrinho> {
    const existingCarrinho = await this.findById(id);
    if (!existingCarrinho) {
      throw new NotFoundException(`Carrinho com ID ${id} não encontrado.`);
    }
    return this.carrinhoRepository.save({ ...existingCarrinho, ...carrinho });
  }

  async delete(id: number): Promise<void> {
    const result = await this.carrinhoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Carrinho com ID ${id} não encontrado.`);
    }
  }

  async addProduto(id: number, produto: Produto): Promise<Carrinho> {
    const carrinho = await this.findById(id);
    if (!carrinho) {
      throw new NotFoundException(`Carrinho com ID ${id} não encontrado.`);
    }
    carrinho.produtos.push(produto);
    return this.carrinhoRepository.save(carrinho);
  }

  async removeProduto(id: number, produtoId: number): Promise<Carrinho> {
    const carrinho = await this.findById(id);
    if (!carrinho) {
      throw new NotFoundException(`Carrinho com ID ${id} não encontrado.`);
    }
    carrinho.produtos = carrinho.produtos.filter(
      (produto) => produto.id !== produtoId
    );
    return this.carrinhoRepository.save(carrinho);
  }
}