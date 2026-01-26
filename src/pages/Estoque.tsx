import { useState } from 'react'
import { Plus, Package, AlertTriangle, Search, Edit, Trash2 } from 'lucide-react'
import { useDataStore } from '../store/dataStore'

export default function Estoque() {
  const { estoque, addItemEstoque, updateItemEstoque, deleteItemEstoque } = useDataStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  const filteredEstoque = estoque.filter(
    (item) =>
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const itensEstoqueBaixo = estoque.filter(
    (item) => item.quantidade <= item.quantidadeMinima
  )

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      deleteItemEstoque(id)
    }
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setShowModal(true)
  }

  const handleNew = () => {
    setEditingItem(null)
    setShowModal(true)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      nome: formData.get('nome') as string,
      tipo: formData.get('tipo') as 'insumo' | 'produto',
      quantidade: parseFloat(formData.get('quantidade') as string),
      quantidadeMinima: parseFloat(formData.get('quantidadeMinima') as string),
      unidade: formData.get('unidade') as string,
      fornecedor: formData.get('fornecedor') as string,
      preco: parseFloat(formData.get('preco') as string),
    }

    if (editingItem) {
      updateItemEstoque(editingItem.id, data)
    } else {
      addItemEstoque(data)
    }
    setShowModal(false)
    e.currentTarget.reset()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Estoque</h1>
          <p className="text-gray-600 mt-1">
            Controle de insumos e produtos
          </p>
        </div>
        <button onClick={handleNew} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Novo Item
        </button>
      </div>

      {/* Alertas de Estoque Baixo */}
      {itensEstoqueBaixo.length > 0 && (
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-yellow-900">
                Atenção: {itensEstoqueBaixo.length} item(ns) com estoque baixo
              </h3>
              <p className="text-sm text-yellow-700">
                Alguns itens estão abaixo da quantidade mínima recomendada
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Item
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Tipo
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Quantidade
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Mínimo
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Unidade
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Fornecedor
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Preço Unit.
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEstoque.map((item) => {
                const estoqueBaixo = item.quantidade <= item.quantidadeMinima
                return (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{item.nome}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 capitalize">
                      {item.tipo}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {item.quantidade}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {item.quantidadeMinima}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{item.unidade}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {item.fornecedor}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      R$ {item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          estoqueBaixo
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {estoqueBaixo ? 'Estoque Baixo' : 'OK'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredEstoque.length === 0 && (
        <div className="card text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {searchTerm
              ? 'Nenhum item encontrado com os filtros aplicados.'
              : 'Nenhum item cadastrado ainda.'}
          </p>
        </div>
      )}

      {/* Modal de Cadastro/Edição */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingItem ? 'Editar Item' : 'Novo Item'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Item
                </label>
                <input
                  type="text"
                  name="nome"
                  defaultValue={editingItem?.nome || ''}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  name="tipo"
                  defaultValue={editingItem?.tipo || 'insumo'}
                  className="input-field"
                  required
                >
                  <option value="insumo">Insumo</option>
                  <option value="produto">Produto</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    name="quantidade"
                    min="0"
                    step="0.01"
                    defaultValue={editingItem?.quantidade || 0}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade Mínima
                  </label>
                  <input
                    type="number"
                    name="quantidadeMinima"
                    min="0"
                    step="0.01"
                    defaultValue={editingItem?.quantidadeMinima || 0}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unidade
                </label>
                <input
                  type="text"
                  name="unidade"
                  defaultValue={editingItem?.unidade || ''}
                  placeholder="Ex: un, kg, litro"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fornecedor
                </label>
                <input
                  type="text"
                  name="fornecedor"
                  defaultValue={editingItem?.fornecedor || ''}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço Unitário
                </label>
                <input
                  type="number"
                  name="preco"
                  min="0"
                  step="0.01"
                  defaultValue={editingItem?.preco || 0}
                  className="input-field"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


