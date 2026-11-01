import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  const secretToken = process.env.ETL_REVALIDATE_SECRET

  if (authHeader !== `Bearer ${secretToken}`) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    revalidateTag('quadrimestre-atual', "max")

    return NextResponse.json({ 
      success: true, 
      message: 'Cache do quadrimestre atual invalidado com sucesso!',
      timestamp: new Date().toISOString() 
    })
  } catch (error) {
    console.error("Erro interno na revalidação:", error)
    return NextResponse.json(
      { message: 'Erro ao revalidar o cache' }, 
      { status: 500 }
    )
  }
}