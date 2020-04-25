import moment from 'moment'
import { IApiContext } from '../types/AppContext'

export async function getTasks(ctx: IApiContext): Promise<void> {
  try {
    const { db } = ctx
    const { user } = ctx.state
    const { date = moment().endOf('day').toDate() } = ctx.request.query

    const data = await db('tasks')
      .where({ id: user.id })
      .where('estimated_at', '<=', date)
      .orderBy('estimated_at')

    ctx.status = 200
    ctx.body = { data }
  } catch (err) {
    throw err
  }
}

export async function createTask(ctx: IApiContext): Promise<void> {
  try {
    const { db } = ctx
    const { user } = ctx.state
    const { desc = '', doneAt, estimatedAt } = ctx.request.body

    if (!desc.trim()) {
      ctx.throw(400, 'Descrição é obrigatória!')
    }

    const [newTask] = await db('tasks')
      .insert({
        desc,
        done_at: doneAt,
        estimated_at: estimatedAt,
        user_id: user.id
      })
      .returning('id')

    ctx.status = 201
    ctx.body = {
      data: {
        id: newTask,
        desc,
        doneAt,
        estimatedAt
      }
    }
  } catch (err) {
    throw err
  }
}

export async function removeTask(ctx: IApiContext): Promise<void> {
  try {
    const { db } = ctx
    const { user } = ctx.state
    const { id } = ctx.request.params

    const rowsDeleted: number = await db('tasks')
      .where({ id, user_id: user.id })
      .del()

    if (rowsDeleted > 0) {
      ctx.status = 204
      return
    }

    ctx.throw(400, `Não foi encontrada nenhuma task com o id ${id}.`)
  } catch (err) {
    throw err
  }
}

export async function updateTask(ctx: IApiContext): Promise<void> {
  try {
    const { db } = ctx
    const { user } = ctx.state
    const { id } = ctx.request.params
    const {
      desc,
      doneAt: done_at,
      estimatedAt: estimated_at
    } = ctx.request.body

    const updateResult = await db('tasks')
      .update({ desc, done_at, estimated_at })
      .where({ id, user_id: user.id })
  } catch (err) {
    throw err
  }
}
