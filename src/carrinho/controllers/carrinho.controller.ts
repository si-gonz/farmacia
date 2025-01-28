import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CarrinhoService } from "../services/carrinho.service";
import { Carrinho } from "../entities/carrinho.entity";
import { Produto } from "../../produto/entities/produto.entity";

@Controller("/carrinho")
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}

  // Retorna todos os carrinhos
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Carrinho[]> {
    return this.carrinhoService.findAll();
  }

  // Retorna um carrinho pelo ID
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Carrinho> {
    return this.carrinhoService.findById(id);
  }

  // Cria um novo carrinho
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() carrinho: Carrinho): Promise<Carrinho> {
    return this.carrinhoService.create(carrinho);
  }

  // Atualiza um carrinho existente
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,  // ID da URL
    @Body() carrinho: Carrinho  // Objeto carrinho do corpo da requisição
  ): Promise<Carrinho> {
    return this.carrinhoService.update(id, carrinho);  // Passando os dois parâmetros
  }

  // Deleta um carrinho pelo ID
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> { // Alterado para Promise<void>
    await this.carrinhoService.delete(id);
  }

  // Adiciona um produto ao carrinho
  @Post('/:id/produto')
  @HttpCode(HttpStatus.CREATED)
  addProduto(
    @Param('id', ParseIntPipe) id: number,
    @Body() produto: Produto
  ): Promise<Carrinho> {
    return this.carrinhoService.addProduto(id, produto);
  }

  // Remove um produto do carrinho
  @Delete('/:id/produto/:produtoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeProduto(
    @Param('id', ParseIntPipe) id: number,
    @Param('produtoId', ParseIntPipe) produtoId: number
  ): Promise<Carrinho> {
    return this.carrinhoService.removeProduto(id, produtoId);
  }
}