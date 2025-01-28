import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Carrinho } from "./entities/carrinho.entity"; 
import { CarrinhoService } from "./services/carrinho.service";
import { CarrinhoController } from "./controllers/carrinho.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Carrinho])],
    providers: [CarrinhoService],
    controllers: [CarrinhoController],
    exports: [TypeOrmModule]
})
export class CarrinhoModule {}