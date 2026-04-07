// ============================================
// API ROUTE: Guardar Cuestionario
// ============================================
// Ubicación: app/api/cuestionario/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { CuestionarioCompleto } from '@/lib/cuestionario/types';

/**
 * POST /api/cuestionario
 * Guarda el resultado completo del cuestionario
 */
export async function POST(request: NextRequest) {
  try {
    const resultado: CuestionarioCompleto = await request.json();
    
    // Validar que tengamos los datos necesarios
    if (!resultado.user_id || !resultado.perfil_demografico) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      );
    }
    
    // ===========================================
    // OPCIÓN 1: Guardar en PostgreSQL/Supabase
    // ===========================================
    /*
    import { createClient } from '@supabase/supabase-js';
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
    
    const { data, error } = await supabase
      .from('cuestionarios')
      .insert([{
        user_id: resultado.user_id,
        nombre: resultado.perfil_demografico.nombre,
        edad: resultado.perfil_demografico.edad,
        grado: resultado.perfil_demografico.grado,
        estilo_dominante: resultado.estilo_aprendizaje.dominante,
        intereses_principales: resultado.intereses.principales,
        datos_completos: resultado
      }])
      .select();
    
    if (error) throw error;
    */
    
    // ===========================================
    // OPCIÓN 2: Guardar en MongoDB
    // ===========================================
    /*
    import { MongoClient } from 'mongodb';
    
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    
    const db = client.db('cognitiva');
    const collection = db.collection('cuestionarios');
    
    const insertResult = await collection.insertOne({
      ...resultado,
      createdAt: new Date()
    });
    
    await client.close();
    */
    
    // ===========================================
    // OPCIÓN 3: Guardar en Prisma
    // ===========================================
    /*
    import { prisma } from '@/lib/prisma';
    
    const cuestionario = await prisma.cuestionario.create({
      data: {
        userId: resultado.user_id,
        nombre: resultado.perfil_demografico.nombre,
        edad: resultado.perfil_demografico.edad,
        grado: resultado.perfil_demografico.grado,
        estiloDominante: resultado.estilo_aprendizaje.dominante,
        interesesPrincipales: resultado.intereses.principales,
        datosCompletos: resultado as any,
      }
    });
    */
    
    // ===========================================
    // POR AHORA: Solo log (para desarrollo)
    // ===========================================
    console.log('='.repeat(50));
    console.log('📋 CUESTIONARIO COMPLETADO');
    console.log('='.repeat(50));
    console.log(`👤 Estudiante: ${resultado.perfil_demografico.nombre}`);
    console.log(`🎂 Edad: ${resultado.perfil_demografico.edad} años`);
    console.log(`📚 Grado: ${resultado.perfil_demografico.grado}`);
    console.log(`🎨 Estilo: ${resultado.estilo_aprendizaje.dominante}`);
    console.log(`⭐ Intereses: ${resultado.intereses.principales.join(', ')}`);
    console.log(`⏱️  Tiempo: ${resultado.tiempo_completado_segundos}s`);
    console.log('='.repeat(50));
    
    // Enviar email de notificación (opcional)
    /*
    import { sendEmail } from '@/lib/email';
    
    await sendEmail({
      to: 'admin@cognitiva.com',
      subject: `Nuevo cuestionario: ${resultado.perfil_demografico.nombre}`,
      html: `
        <h2>Nuevo estudiante registrado</h2>
        <p><strong>Nombre:</strong> ${resultado.perfil_demografico.nombre}</p>
        <p><strong>Estilo:</strong> ${resultado.estilo_aprendizaje.dominante}</p>
        <p><strong>Intereses:</strong> ${resultado.intereses.principales.join(', ')}</p>
      `
    });
    */
    
    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Cuestionario guardado exitosamente',
      data: {
        userId: resultado.user_id,
        estilo: resultado.estilo_aprendizaje.dominante,
        intereses: resultado.intereses.principales
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error guardando cuestionario:', error);
    
    return NextResponse.json(
      { 
        error: 'Error al guardar el cuestionario',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/cuestionario?userId=xxx
 * Obtiene el cuestionario de un usuario
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'userId es requerido' },
        { status: 400 }
      );
    }
    
    // TODO: Buscar en base de datos
    /*
    const cuestionario = await prisma.cuestionario.findUnique({
      where: { userId }
    });
    
    if (!cuestionario) {
      return NextResponse.json(
        { error: 'Cuestionario no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(cuestionario);
    */
    
    // Por ahora, respuesta de ejemplo
    return NextResponse.json({
      message: 'Endpoint GET aún no implementado',
      userId
    });
    
  } catch (error) {
    console.error('Error obteniendo cuestionario:', error);
    
    return NextResponse.json(
      { error: 'Error al obtener el cuestionario' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cuestionario?userId=xxx
 * Elimina el cuestionario de un usuario (derecho al olvido)
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'userId es requerido' },
        { status: 400 }
      );
    }
    
    // TODO: Eliminar de base de datos
    /*
    await prisma.cuestionario.delete({
      where: { userId }
    });
    */
    
    console.log(`🗑️ Cuestionario eliminado para usuario: ${userId}`);
    
    return NextResponse.json({
      success: true,
      message: 'Cuestionario eliminado exitosamente'
    });
    
  } catch (error) {
    console.error('Error eliminando cuestionario:', error);
    
    return NextResponse.json(
      { error: 'Error al eliminar el cuestionario' },
      { status: 500 }
    );
  }
}
