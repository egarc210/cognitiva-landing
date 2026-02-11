// app/api/onboarding/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { OnboardingData } from '@/types/onboarding';

export async function POST(request: NextRequest) {
  try {
    const data: OnboardingData = await request.json();

    // Aquí integrarás con tu base de datos
    // Por ahora, solo validamos y devolvemos los datos

    // Validación básica
    if (!data.step1?.email || !data.step1?.password) {
      return NextResponse.json(
        { error: 'Datos de cuenta incompletos' },
        { status: 400 }
      );
    }

    if (!data.step3?.nombreEstudiante || !data.step3?.grado) {
      return NextResponse.json(
        { error: 'Datos del estudiante incompletos' },
        { status: 400 }
      );
    }

    // TODO: Integrar con tu base de datos
    // Ejemplo de lo que harías:
    /*
    const parent = await db.parents.create({
      data: {
        nombreCompleto: data.step1.nombreCompleto,
        email: data.step1.email,
        passwordHash: await hashPassword(data.step1.password),
        edadRango: data.step2.edad,
        estado: data.step2.estado,
        ciudad: data.step2.ciudad,
        nivelEducativo: data.step2.nivelEducativo,
        ocupacion: data.step2.ocupacion,
        numHijosPrimaria: data.step2.numHijosPrimaria,
        comoConocio: data.step1.comoConocio,
        subscriptionStatus: 'trial',
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 días
      },
    });

    const student = await db.students.create({
      data: {
        parentId: parent.id,
        nombre: data.step3.nombreEstudiante,
        edad: data.step3.edadEstudiante,
        grado: data.step3.grado,
        tipoEscuela: data.step3.tipoEscuela,
        turno: data.step3.turno,
        haRepetido: data.step3.haRepetido,
        necesidadesEspeciales: data.step3.necesidadesEspeciales,
        perfilCompleto: false,
      },
    });

    await db.onboardingResponses.create({
      data: {
        parentId: parent.id,
        studentId: student.id,
        motivos: data.step4.motivos,
        materiaApoyo: data.step4.materiaApoyo,
        tiempoDedicado: data.step4.tiempoDedicado,
        disfrutaTareas: data.step4.disfrutaTareas,
        familiaridadTecnologia: data.step4.familiaridadTecnologia,
        observaciones: data.step4.observacionesAdicionales,
      },
    });
    */

    // Respuesta de éxito
    return NextResponse.json(
      {
        success: true,
        message: 'Onboarding completado exitosamente',
        data: {
          userId: 'temp-user-id', // Reemplazar con ID real
          studentId: 'temp-student-id', // Reemplazar con ID real
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en onboarding:', error);
    return NextResponse.json(
      { error: 'Error al procesar el registro' },
      { status: 500 }
    );
  }
}

// GET para recuperar datos parciales si el usuario quiere continuar después
export async function GET(request: NextRequest) {
  try {
    // TODO: Implementar recuperación de datos parciales
    // basado en email o token de sesión
    
    return NextResponse.json(
      { error: 'No implementado aún' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error al recuperar datos:', error);
    return NextResponse.json(
      { error: 'Error al recuperar datos' },
      { status: 500 }
    );
  }
}
