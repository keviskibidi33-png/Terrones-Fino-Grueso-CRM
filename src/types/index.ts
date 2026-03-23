export type GenericPayload = {
    muestra: string
    numero_ot: string
    fecha_ensayo: string
    realizado_por?: string
    cliente?: string
    observaciones?: string
    [key: string]: unknown
}

export type EnsayoDetail = {
    id: number
    numero_ensayo?: string | null
    numero_ot?: string | null
    cliente?: string | null
    muestra?: string | null
    fecha_documento?: string | null
    estado?: string | null
    payload?: GenericPayload | null
}

export type SaveResponse = {
    id: number
    numero_ensayo: string
    numero_ot: string
    estado: string
}
