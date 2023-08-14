import cardapio from './dados/cardapio.js'

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        if (itens && itens.length === 0) {
            return 'Não há itens no carrinho de compra!'

        } else if (metodoDePagamento !== "dinheiro" &&  metodoDePagamento !== "debito" && metodoDePagamento !== "credito"){
            return 'Forma de pagamento inválida!'

        }

        let valorTotal = 0;
        let itemNaoEncontado = false
        let pedidosFeitos = []

        if (itens) {
                
            for (const item of itens) {
                const [codigoDoItem, quantidadeDoItem] = item.split(',')
                const itemCardapio = cardapio.find(item => item.codigo === codigoDoItem)

                pedidosFeitos.push(codigoDoItem)

                if (quantidadeDoItem === '0') {
                    return 'Quantidade inválida!'

                } if (!quantidadeDoItem || !codigoDoItem || !itemCardapio) {
                        itemNaoEncontado = true
                        return  ('Item inválido!')

                } if (itemCardapio) {
                    valorTotal += quantidadeDoItem * itemCardapio.valor
                } 
            }
        }

        if (pedidosFeitos.includes('queijo') && !pedidosFeitos.includes('sanduiche') || pedidosFeitos.includes('chantily') && !pedidosFeitos.includes('cafe')){
            return 'Item extra não pode ser pedido sem o principal'
        }
            
        if (metodoDePagamento === "dinheiro") {
            valorTotal -= valorTotal * 0.05;
        } else if (metodoDePagamento === "credito") {
            valorTotal += valorTotal * 0.03;
        }
        return  (`R$ ${valorTotal.toFixed(2).replace('.', ',')}`)      
    }
}   
 
export { CaixaDaLanchonete }

new CaixaDaLanchonete()
  .calcularValorDaCompra('debito', ['cafe,1', 'sanduiche,1', 'queijo,1']);