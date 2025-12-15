// Servicio de Notificaciones por Email
// Este servicio maneja el envío de emails cuando el admin interactúa con usuarios

interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  userName?: string;
}

// Simulación de envío de email (en producción sería con Supabase o Nodemailer)
export const sendEmail = async (template: EmailTemplate): Promise<boolean> => {
  try {
    console.log('📧 Email a enviar:', {
      to: template.to,
      subject: template.subject,
      preview: template.html.substring(0, 100) + '...'
    });

    // En producción, aquí iría:
    // const response = await supabase.functions.invoke('send-email', { body: template });
    
    // Por ahora, simulamos el envío
    return true;
  } catch (error) {
    console.error('Error al enviar email:', error);
    return false;
  }
};

// Email cuando admin responde a una solicitud de devolución
export const sendReturnResponseEmail = (userName: string, userEmail: string, returnData: any) => {
  const isApproved = returnData.approved;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0;">Actualización de tu Solicitud de Devolución</h1>
      </div>
      
      <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
        <p style="color: #2d3748; margin: 0 0 20px 0;">Hola <strong>${userName}</strong>,</p>
        
        <p style="color: #2d3748; margin: 0 0 20px 0;">
          ${isApproved 
            ? '¡Buenas noticias! Tu solicitud de devolución ha sido <strong style="color: #10b981;">APROBADA</strong>.' 
            : 'Lamentablemente, tu solicitud de devolución ha sido <strong style="color: #ef4444;">RECHAZADA</strong>.'}
        </p>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${isApproved ? '#10b981' : '#ef4444'};">
          <h3 style="color: #2d3748; margin: 0 0 15px 0;">Detalles:</h3>
          
          ${isApproved ? `
            <p style="color: #2d3748; margin: 8px 0;"><strong>Producto Alternativo:</strong> ${returnData.alternativeProduct || 'Se coordinará contigo'}</p>
          ` : `
            <p style="color: #2d3748; margin: 8px 0;"><strong>Motivo:</strong> ${returnData.reason || 'Ver política de devoluciones'}</p>
          `}
          
          ${returnData.message ? `
            <p style="color: #2d3748; margin: 12px 0;"><strong>Mensaje:</strong></p>
            <p style="color: #4b5563; margin: 0; font-style: italic;">"${returnData.message}"</p>
          ` : ''}
        </div>

        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
          <p style="color: #92400e; margin: 0;"><strong>ℹ️ Próximos pasos:</strong></p>
          <p style="color: #92400e; margin: 8px 0; font-size: 14px;">
            ${isApproved 
              ? 'Te contactaremos en las próximas 24 horas para coordinar el envío del producto alternativo o el reembolso.' 
              : 'Si tienes dudas, contáctanos en support@nudostudio.com'}
          </p>
        </div>

        <p style="color: #4b5563; margin: 20px 0; font-size: 14px;">
          Gracias por tu comprensión y por ser parte de Nudo Studio.
        </p>
      </div>

      <div style="background: #2d3748; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
        <p style="margin: 0;">Nudo Studio © 2024 | info@nudostudio.com</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: userEmail,
    subject: isApproved ? '✅ Tu devolución ha sido aprobada' : '❌ Tu devolución ha sido rechazada',
    html,
    userName
  });
};

// Email cuando admin responde a una orden
export const sendOrderResponseEmail = (userName: string, userEmail: string, orderData: any) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0;">Actualización de tu Orden</h1>
      </div>
      
      <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
        <p style="color: #2d3748; margin: 0 0 20px 0;">Hola <strong>${userName}</strong>,</p>
        
        <p style="color: #2d3748; margin: 0 0 20px 0;">
          Tu orden ha sido actualizada. Aquí están los detalles:
        </p>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
          <h3 style="color: #2d3748; margin: 0 0 15px 0;">Información de la Orden:</h3>
          <p style="color: #2d3748; margin: 8px 0;"><strong>Número de Orden:</strong> ${orderData.orderNumber || 'Pendiente'}</p>
          <p style="color: #2d3748; margin: 8px 0;"><strong>Estado:</strong> ${orderData.status || 'Procesándose'}</p>
          <p style="color: #2d3748; margin: 8px 0;"><strong>Total:</strong> $${orderData.total?.toLocaleString() || '0'}</p>
          
          ${orderData.message ? `
            <p style="color: #2d3748; margin: 12px 0;"><strong>Mensaje:</strong></p>
            <p style="color: #4b5563; margin: 0; font-style: italic;">"${orderData.message}"</p>
          ` : ''}
        </div>

        <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
          <p style="color: #1e40af; margin: 0;"><strong>📦 Seguimiento:</strong></p>
          <p style="color: #1e40af; margin: 8px 0; font-size: 14px;">
            Puedes ver el estado de tu orden en tu perfil en el área de "Mis Órdenes".
          </p>
        </div>

        <p style="color: #4b5563; margin: 20px 0; font-size: 14px;">
          Si tienes preguntas, no dudes en contactarnos.
        </p>
      </div>

      <div style="background: #2d3748; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
        <p style="margin: 0;">Nudo Studio © 2024 | info@nudostudio.com</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: userEmail,
    subject: '📦 Tu orden ha sido actualizada',
    html,
    userName
  });
};

// Email cuando admin responde a una cotización
export const sendQuoteResponseEmail = (userName: string, userEmail: string, quoteData: any) => {
  const isApproved = quoteData.approved;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0;">Respuesta a tu Cotización</h1>
      </div>
      
      <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
        <p style="color: #2d3748; margin: 0 0 20px 0;">Hola <strong>${userName}</strong>,</p>
        
        <p style="color: #2d3748; margin: 0 0 20px 0;">
          ${isApproved 
            ? '¡Excelente! Tu cotización ha sido <strong style="color: #10b981;">APROBADA</strong>.' 
            : 'Hemos revisado tu cotización. Aquí está nuestra respuesta:'}
        </p>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${isApproved ? '#10b981' : '#f59e0b'};">
          <h3 style="color: #2d3748; margin: 0 0 15px 0;">Detalles de la Cotización:</h3>
          <p style="color: #2d3748; margin: 8px 0;"><strong>Proyecto:</strong> ${quoteData.projectName || 'Sin especificar'}</p>
          <p style="color: #2d3748; margin: 8px 0;"><strong>Presupuesto:</strong> $${quoteData.amount?.toLocaleString() || '0'}</p>
          
          ${quoteData.estimatedDate ? `
            <p style="color: #2d3748; margin: 8px 0;"><strong>Fecha Estimada:</strong> ${quoteData.estimatedDate}</p>
          ` : ''}
          
          ${quoteData.message ? `
            <p style="color: #2d3748; margin: 12px 0;"><strong>Comentarios:</strong></p>
            <p style="color: #4b5563; margin: 0; font-style: italic;">"${quoteData.message}"</p>
          ` : ''}
        </div>

        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
          <p style="color: #92400e; margin: 0;"><strong>ℹ️ Próximos pasos:</strong></p>
          <p style="color: #92400e; margin: 8px 0; font-size: 14px;">
            ${isApproved 
              ? 'Te contactaremos en las próximas 24 horas para confirmar y coordinar los detalles del proyecto.' 
              : 'Puedes responder a este email con cualquier pregunta o modificación.'}
          </p>
        </div>

        <p style="color: #4b5563; margin: 20px 0; font-size: 14px;">
          Gracias por tu interés en nuestros servicios.
        </p>
      </div>

      <div style="background: #2d3748; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
        <p style="margin: 0;">Nudo Studio © 2024 | info@nudostudio.com</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: userEmail,
    subject: isApproved ? '✅ Tu cotización ha sido aprobada' : '📝 Respuesta a tu cotización',
    html,
    userName
  });
};

// Email cuando usuario se inscribe en un taller
export const sendWorkshopEnrollmentEmail = (userName: string, userEmail: string, workshopData: any) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0;">¡Inscripción Confirmada!</h1>
      </div>
      
      <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
        <p style="color: #2d3748; margin: 0 0 20px 0;">¡Hola <strong>${userName}</strong>!</p>
        
        <p style="color: #2d3748; margin: 0 0 20px 0;">
          Te has inscrito exitosamente en el siguiente taller:
        </p>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #B8860B;">
          <h3 style="color: #B8860B; margin: 0 0 15px 0;">${workshopData.name}</h3>
          
          <p style="color: #2d3748; margin: 8px 0;"><strong>📅 Fecha:</strong> ${new Date(workshopData.date).toLocaleDateString('es-ES')}</p>
          <p style="color: #2d3748; margin: 8px 0;"><strong>⏰ Hora:</strong> ${workshopData.time}</p>
          <p style="color: #2d3748; margin: 8px 0;"><strong>👨‍🏫 Instructor:</strong> ${workshopData.instructor}</p>
          <p style="color: #2d3748; margin: 8px 0;"><strong>💰 Precio:</strong> $${workshopData.price?.toLocaleString() || '0'}</p>
          
          ${workshopData.description ? `
            <p style="color: #2d3748; margin: 12px 0;"><strong>Descripción:</strong></p>
            <p style="color: #4b5563; margin: 0;">${workshopData.description}</p>
          ` : ''}
        </div>

        <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
          <p style="color: #166534; margin: 0;"><strong>✓ Tu inscripción está confirmada</strong></p>
          <p style="color: #166534; margin: 8px 0; font-size: 14px;">
            Recibirás un email recordatorio 24 horas antes del taller.
          </p>
        </div>

        <p style="color: #4b5563; margin: 20px 0; font-size: 14px;">
          Si tienes preguntas, contáctanos en support@nudostudio.com
        </p>
      </div>

      <div style="background: #2d3748; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
        <p style="margin: 0;">Nudo Studio © 2024 | info@nudostudio.com</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: userEmail,
    subject: `✅ Inscripción confirmada: ${workshopData.name}`,
    html,
    userName
  });
};

// Email para notificar cambios en talleres
export const sendWorkshopUpdateEmail = (userEmail: string, workshopData: any, changeType: string) => {
  const changeMessages = {
    created: 'Se ha agregado un nuevo taller',
    updated: 'Se ha actualizado un taller',
    cancelled: 'Un taller ha sido cancelado',
    postponed: 'Se ha pospuesto un taller'
  };

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0;">Actualización de Talleres</h1>
      </div>
      
      <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
        <p style="color: #2d3748; margin: 0 0 20px 0;">¡Hola!</p>
        
        <p style="color: #2d3748; margin: 0 0 20px 0;">
          ${changeMessages[changeType as keyof typeof changeMessages] || 'Se ha actualizado información de talleres'}:
        </p>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #B8860B;">
          <h3 style="color: #B8860B; margin: 0 0 15px 0;">${workshopData.name}</h3>
          
          <p style="color: #2d3748; margin: 8px 0;"><strong>📅 Fecha:</strong> ${new Date(workshopData.date).toLocaleDateString('es-ES')}</p>
          <p style="color: #2d3748; margin: 8px 0;"><strong>⏰ Hora:</strong> ${workshopData.time}</p>
          <p style="color: #2d3748; margin: 8px 0;"><strong>👨‍🏫 Instructor:</strong> ${workshopData.instructor}</p>
        </div>

        <p style="color: #4b5563; margin: 20px 0; font-size: 14px;">
          Visita nuestra página de talleres para más información.
        </p>
      </div>

      <div style="background: #2d3748; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
        <p style="margin: 0;">Nudo Studio © 2024 | info@nudostudio.com</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: userEmail,
    subject: `📢 Actualización de Talleres`,
    html
  });
};
