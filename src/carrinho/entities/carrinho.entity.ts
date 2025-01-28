import { IsNotEmpty, IsPositive } from "class-validator"
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Produto } from "../../produto/entities/produto.entity"

@Entity({ name: "tb_carrinho" })
export class Carrinho {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string; // Nome do cliente

  @IsPositive()
  @Column({ type: "int", default: 0 })
  quantidadeTotal: number; // Quantidade total de itens no carrinho


  @OneToMany(() => Produto, (produto) => produto.carrinho, { cascade: true })
  produtos: Produto[];

  get valorTotal(): number {
    return this.produtos.reduce((total, produto) => total + produto.preco, 0);
  }
}