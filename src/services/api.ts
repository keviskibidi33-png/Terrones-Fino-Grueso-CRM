import axios from 'axios'
import type { EnsayoDetail, GenericPayload, SaveResponse } from '@/types'

const API_URL = import.meta.env.VITE_API_URL || 'https://api.geofal.com.pe'

const api = axios.create({
    baseURL: API_URL,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new CustomEvent('session-expired'))
        }
        return Promise.reject(error)
    },
)

const extractFilename = (contentDisposition?: string): string | undefined => {
    const match = typeof contentDisposition === 'string' ? contentDisposition.match(/filename="?([^";]+)"?/i) : null
    return match?.[1]
}

export async function saveEnsayo(moduleSlug: string, payload: GenericPayload, ensayoId?: number): Promise<SaveResponse> {
    const { data } = await api.post<SaveResponse>(`/api/${moduleSlug}/excel`, payload, {
        params: {
            download: false,
            ensayo_id: ensayoId,
        },
    })
    return data
}

export async function saveAndDownload(
    moduleSlug: string,
    payload: GenericPayload,
    ensayoId?: number,
): Promise<{ blob: Blob; filename?: string }> {
    const response = await api.post(`/api/${moduleSlug}/excel`, payload, {
        params: {
            download: true,
            ensayo_id: ensayoId,
        },
        responseType: 'blob',
    })
    return {
        blob: response.data,
        filename: extractFilename(response.headers['content-disposition']),
    }
}

export async function getEnsayoDetail(moduleSlug: string, ensayoId: number): Promise<EnsayoDetail> {
    const { data } = await api.get<EnsayoDetail>(`/api/${moduleSlug}/${ensayoId}`)
    return data
}

export default api
