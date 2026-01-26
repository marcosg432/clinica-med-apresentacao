import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3006

// Middleware para compressão (opcional, mas recomendado)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir arquivos estáticos da build
const distPath = join(__dirname, 'dist')
if (existsSync(distPath)) {
  app.use(express.static(distPath))
} else {
  console.error('❌ Pasta dist não encontrada! Execute "npm run build" primeiro.')
  process.exit(1)
}

// SPA fallback - todas as rotas retornam index.html
app.get('*', (req, res) => {
  try {
    const indexPath = join(distPath, 'index.html')
    if (existsSync(indexPath)) {
      const indexHtml = readFileSync(indexPath, 'utf-8')
      res.setHeader('Content-Type', 'text/html')
      res.send(indexHtml)
    } else {
      res.status(404).send('Arquivo index.html não encontrado')
    }
  } catch (error) {
    console.error('Erro ao servir index.html:', error)
    res.status(500).send('Erro ao carregar aplicação')
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ClínicaMed rodando na porta ${PORT}`)
  console.log(`📱 Acesse: http://localhost:${PORT}`)
  console.log(`🌐 Ambiente: ${process.env.NODE_ENV || 'production'}`)
})

