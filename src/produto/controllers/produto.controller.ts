import { Delete,Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, ParseFloatPipe } from "@nestjs/common";
import { Produto } from "../entities/produto.entity"; 
import { ProdutoService } from "../services/produto.service"; 
import { ManyToOne, OneToMany } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Controller("/produto")
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findByNome(nome);
  }

  @Get('/preco/maior/:maior')
  @HttpCode(HttpStatus.OK)
  findMaiorPreco(@Param('maior', ParseFloatPipe) maior: number): Promise<Produto[]> {
      return this.produtoService.findMaiorPreco(maior);
  }

  @Get('/preco/menor/:menor')
  @HttpCode(HttpStatus.OK)
  findMenorPreco(@Param('menor', ParseFloatPipe) menor: number): Promise<Produto[]> {
      return this.produtoService.findMenorPreco(menor);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.produtoService.delete(id);
  }
}