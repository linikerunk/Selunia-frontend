import { useCartStore } from '@store/cartStore'

export function CartPage() {
  const { items, totalQuantity, totalPrice, removeItem, updateQuantity, clear } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container">
        <h1>Seu carrinho</h1>
        <p>Seu carrinho está vazio. Explore nossos produtos com carinho.</p>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Seu carrinho</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Qtd.</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.product.id}>
              <td className="cart-product">
                <img src={item.product.images[0]} alt={item.product.name} />
                <span>{item.product.name}</span>
              </td>
              <td>{item.product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                />
              </td>
              <td>{(item.product.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>
                <button className="link" onClick={() => removeItem(item.product.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <div>
          <strong>Itens:</strong> {totalQuantity}
        </div>
        <div>
          <strong>Total:</strong> {totalPrice().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>
      </div>

      <div className="cart-actions">
        <button className="btn btn-secondary" onClick={clear}>Esvaziar</button>
        <button className="btn">Finalizar compra</button>
      </div>
    </div>
  )
}


