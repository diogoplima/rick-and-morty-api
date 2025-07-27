import { api } from '@/lib/api'
import { ApiResponseGetCharacters } from '@/types/apiResponses'
import { Character } from '@/types/character';

export const characterService = {
  async getCharacters(queryParams?: string): Promise<ApiResponseGetCharacters> {
    const res = await api.get('/character' + `${queryParams ? '/?' + queryParams : ''}`)
    return res.data
  },

  async getCharacter(id: number): Promise<Character> {
    const res = await api.get(`/character/${id}`)
    return res.data
  },

  async getMultipleCharacters(ids: number[]): Promise<Character[]> {
    const res = await api.get(`/character/${ids.join(',')}`)
    return res.data
  }
}
