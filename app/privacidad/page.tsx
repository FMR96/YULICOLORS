import type { Metadata } from "next"
import {
  LegalLayout,
  LegalSection,
  LegalSubsection,
  LegalList,
  InfoBox,
} from "@/components/legal-layout"

export const metadata: Metadata = {
  title: "Política de Privacidad | YULI COLORS",
  description:
    "Política de privacidad de YULI COLORS conforme al Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD).",
  robots: { index: false, follow: true },
}

export default function PrivacidadPage() {
  return (
    <LegalLayout
      badge="Privacidad"
      title="Política de Privacidad"
      lastUpdated="2024-01-15"
    >
      <InfoBox>
        En YULI COLORS nos comprometemos a proteger tu privacidad de acuerdo con
        el{" "}
        <strong>
          Reglamento (UE) 2016/679 General de Protección de Datos (RGPD)
        </strong>{" "}
        y la{" "}
        <strong>
          Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos
          Personales y garantía de los derechos digitales (LOPDGDD)
        </strong>
        .
      </InfoBox>

      <LegalSection title="1. Responsable del tratamiento">
        <LegalList
          items={[
            "Identidad: YULI COLORS, S.L.",
            "CIF/NIF: B-XXXXXXXX",
            "Domicilio: Calle Elegancia 123, 28001 Madrid, España",
            "Teléfono: +34 912 345 678",
            "Email de contacto: privacidad@yulicolors.com",
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Datos que recopilamos">
        <LegalSubsection title="2.1 Datos que nos proporcionas directamente">
          <p>
            Cuando utilizas nuestro formulario de contacto o reservas una cita,
            recopilamos:
          </p>
          <LegalList
            items={[
              "Nombre y apellidos",
              "Dirección de correo electrónico",
              "Número de teléfono",
              "Mensaje o consulta",
              "Tipo de tratamiento de interés",
            ]}
          />
        </LegalSubsection>
        <LegalSubsection title="2.2 Datos recopilados automáticamente">
          <p>
            Al navegar por nuestro sitio web, podemos recopilar automáticamente:
          </p>
          <LegalList
            items={[
              "Dirección IP",
              "Tipo de navegador y sistema operativo",
              "Páginas visitadas y tiempo de permanencia",
              "Fuente de acceso (referrer)",
              "Datos de cookies (según tus preferencias)",
            ]}
          />
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="3. Finalidades y bases legales del tratamiento">
        <LegalSubsection title="3.1 Gestión de citas y consultas">
          <p>
            <strong>Finalidad:</strong> Atender tu consulta y gestionar la
            reserva de tu cita.
          </p>
          <p>
            <strong>Base legal:</strong> Ejecución de un contrato o aplicación
            de medidas precontractuales (art. 6.1.b RGPD).
          </p>
          <p>
            <strong>Conservación:</strong> Mientras dure la relación
            comercial y, posteriormente, durante los plazos legales de
            conservación aplicables.
          </p>
        </LegalSubsection>
        <LegalSubsection title="3.2 Comunicaciones comerciales">
          <p>
            <strong>Finalidad:</strong> Enviarte información sobre nuestros
            servicios, promociones y novedades cuando hayas dado tu
            consentimiento expreso.
          </p>
          <p>
            <strong>Base legal:</strong> Consentimiento del interesado (art.
            6.1.a RGPD).
          </p>
          <p>
            <strong>Conservación:</strong> Hasta que retires tu consentimiento.
          </p>
        </LegalSubsection>
        <LegalSubsection title="3.3 Analítica web">
          <p>
            <strong>Finalidad:</strong> Analizar el uso de nuestro sitio web
            para mejorar su funcionamiento y contenidos.
          </p>
          <p>
            <strong>Base legal:</strong> Interés legítimo (art. 6.1.f RGPD) o
            consentimiento según tus preferencias de cookies.
          </p>
          <p>
            <strong>Conservación:</strong> Según el período de retención de
            Google Analytics (máximo 14 meses).
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="4. Destinatarios de los datos">
        <p>
          No cedemos tus datos personales a terceros salvo obligación legal o en
          los siguientes casos:
        </p>
        <LegalList
          items={[
            "Google LLC — analítica web (Google Analytics), con transferencia a EE.UU. bajo cláusulas contractuales tipo.",
            "Proveedor de hosting — almacenamiento del sitio web, dentro del Espacio Económico Europeo.",
            "Plataforma de email marketing — solo si has dado consentimiento para comunicaciones comerciales.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Tus derechos">
        <p>
          Puedes ejercer los siguientes derechos enviando un escrito a{" "}
          <strong>privacidad@yulicolors.com</strong>, adjuntando copia de tu DNI
          u otro documento identificativo:
        </p>
        <LegalList
          items={[
            "Acceso — conocer qué datos tuyos tratamos.",
            "Rectificación — corregir datos inexactos o incompletos.",
            "Supresión — solicitar el borrado de tus datos («derecho al olvido»).",
            "Oposición — oponerte al tratamiento de tus datos.",
            "Limitación — solicitar que suspendamos el tratamiento de tus datos.",
            "Portabilidad — recibir tus datos en formato estructurado y de uso común.",
            "Retirar el consentimiento — en cualquier momento y sin efecto retroactivo.",
          ]}
        />
        <p>
          Si consideras que el tratamiento de tus datos no es conforme a la
          normativa, puedes presentar una reclamación ante la Agencia Española
          de Protección de Datos (AEPD) en{" "}
          <strong>www.aepd.es</strong>.
        </p>
      </LegalSection>

      <LegalSection title="6. Seguridad de los datos">
        <p>
          YULI COLORS ha adoptado las medidas técnicas y organizativas
          necesarias para garantizar la seguridad y confidencialidad de los
          datos personales, incluidas medidas para evitar su alteración,
          pérdida, tratamiento o acceso no autorizados.
        </p>
      </LegalSection>

      <LegalSection title="7. Menores de edad">
        <p>
          Nuestro sitio web no está dirigido a menores de 14 años. No
          recopilamos conscientemente datos personales de menores. Si tienes
          conocimiento de que un menor nos ha facilitado datos sin consentimiento
          parental, contáctanos para proceder a su eliminación.
        </p>
      </LegalSection>

      <LegalSection title="8. Cambios en la política de privacidad">
        <p>
          Podemos actualizar esta política periódicamente para reflejar cambios
          en nuestras prácticas o en la normativa aplicable. Te notificaremos
          cualquier cambio material publicando la nueva política en esta página
          con la fecha de actualización.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
