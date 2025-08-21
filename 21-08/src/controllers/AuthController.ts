import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

const service = new UserService()

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await service.create(req.body)
      res.status(201).json(user)
    } catch (e: any) {
      res.status(400).json({ message: e.message })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await service.findByEmail(email)
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' })

      const valid = await user.validatePassword(password)
      if (!valid) return res.status(401).json({ message: 'Senha inválida' })

      const safe: any = { ...user }
      delete safe.password

      res.json({ user: safe })
    } catch (e: any) {
      res.status(400).json({ message: e.message })
    }
  }
}