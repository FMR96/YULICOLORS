import type { Metadata } from "next"
import {
  LegalLayout,
  LegalSection,
  LegalSubsection,
  LegalList,
  LegalTable,
  InfoBox,
} from "@/components/legal-layout"

export const metadata: Metadata = {
  title: "Política de Cookies | YULI COLORS",
  description:
    "Información sobre las cookies utilizadas en el sitio web de YULI COLORS conforme a la normativa europea ePrivacy y el RGPD.",
  robots: { index: false, follow: true },
}

export default function CookiesPage() {
  return (
    <LegalLayout
      badge="Cookies"
      title="Política de Cookies"
      lastUpdated="2024-01-15"
    >
      <InfoBox>
        Esta Política de Cookies explica qué son las cookies, cuáles utilizamos
        en <strong>www.yulicolors.com</strong> y cómo puedes gestionar tus
        preferencias, de conformidad con la Directiva ePrivacy (Directiva
        2002/58/CE) y el Reglamento (UE) 2016/679 (RGPD).
      </InfoBox>

      <LegalSection title="1. ¿Qué son las cookies?">
        <p>
          Las cookies son pequeños archivos de texto que los sitios web colocan
          en tu dispositivo cuando los visitas. Se utilizan ampliamente para
          hacer que los sitios funcionen de manera más eficiente, proporcionar
          información a los propietarios del sitio y personalizar la experiencia
          del usuario.
        </p>
        <p>
          Las cookies no contienen virus ni pueden acceder a la información
          almacenada en tu dispositivo. Podemos usar cookies propias (establecidas
          por nosotros) y cookies de terceros (establecidas por dominios externos).
        </p>
      </LegalSection>

      <LegalSection title="2. Tipos de cookies por duración">
        <LegalSubsection title="Cookies de sesión">
          <p>
            Se eliminan automáticamente cuando cierras el navegador. Se utilizan
            para mantener tu sesión activa mientras navegas por el sitio.
          </p>
        </LegalSubsection>
        <LegalSubsection title="Cookies persistentes">
          <p>
            Permanecen en tu dispositivo durante un período determinado (días,
            meses o años). Se utilizan para recordar tus preferencias o para
            análisis a largo plazo.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="3. Cookies que utilizamos">
        <LegalSubsection title="3.1 Cookies esenciales">
          <p>
            Necesarias para el funcionamiento básico del sitio. No requieren
            consentimiento.
          </p>
          <LegalTable
            headers={["Nombre", "Proveedor", "Duración", "Finalidad"]}
            rows={[
              [
                "yuli_cookie_consent",
                "yulicolors.com",
                "1 año",
                "Almacena tus preferencias de consentimiento de cookies.",
              ],
              [
                "__session",
                "yulicolors.com",
                "Sesión",
                "Mantiene la sesión del usuario activa durante la navegación.",
              ],
            ]}
          />
        </LegalSubsection>

        <LegalSubsection title="3.2 Cookies analíticas">
          <p>
            Nos ayudan a entender cómo los usuarios interactúan con el sitio
            web. Requieren tu consentimiento.
          </p>
          <LegalTable
            headers={["Nombre", "Proveedor", "Duración", "Finalidad"]}
            rows={[
              [
                "_ga",
                "Google Analytics",
                "2 años",
                "Distingue usuarios únicos asignando un número generado aleatoriamente.",
              ],
              [
                "_ga_XXXXXXXX",
                "Google Analytics",
                "2 años",
                "Mantiene el estado de la sesión de Google Analytics.",
              ],
              [
                "_gid",
                "Google Analytics",
                "24 horas",
                "Distingue usuarios. Se renueva cada 24 horas.",
              ],
              [
                "_gat",
                "Google Analytics",
                "1 minuto",
                "Limita la tasa de solicitudes a Google Analytics.",
              ],
            ]}
          />
        </LegalSubsection>

        <LegalSubsection title="3.3 Cookies de marketing">
          <p>
            Utilizadas para rastrear a los visitantes en los sitios web con el
            fin de mostrar anuncios relevantes y atractivos. Requieren tu
            consentimiento.
          </p>
          <LegalTable
            headers={["Nombre", "Proveedor", "Duración", "Finalidad"]}
            rows={[
              [
                "_fbp",
                "Meta (Facebook)",
                "3 meses",
                "Utilizado por Facebook para ofrecer una serie de productos publicitarios.",
              ],
              [
                "fr",
                "Meta (Facebook)",
                "3 meses",
                "Entrega, mide y mejora la relevancia de los anuncios de Facebook.",
              ],
            ]}
          />
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="4. Cómo gestionar las cookies">
        <LegalSubsection title="4.1 Panel de preferencias de YULI COLORS">
          <p>
            Puedes modificar tus preferencias de cookies en cualquier momento
            mediante el panel de consentimiento que aparece al pie de la página.
            También puedes eliminarlo borrando las cookies almacenadas en tu
            navegador (clave: <strong>yuli_cookie_consent</strong>), lo que
            mostrará de nuevo el banner la próxima vez que visites el sitio.
          </p>
        </LegalSubsection>
        <LegalSubsection title="4.2 Configuración del navegador">
          <p>
            Puedes configurar tu navegador para bloquear o eliminar cookies.
            Ten en cuenta que esto puede afectar a la funcionalidad del sitio:
          </p>
          <LegalList
            items={[
              "Chrome: Ajustes → Privacidad y seguridad → Cookies y otros datos de sitios",
              "Firefox: Opciones → Privacidad y seguridad → Cookies y datos del sitio",
              "Safari: Preferencias → Privacidad → Gestionar datos del sitio web",
              "Edge: Configuración → Privacidad, búsqueda y servicios → Cookies",
            ]}
          />
        </LegalSubsection>
        <LegalSubsection title="4.3 Opt-out de Google Analytics">
          <p>
            Puedes desactivar el seguimiento de Google Analytics en todos los
            sitios web instalando el complemento de inhabilitación disponible
            en <strong>tools.google.com/dlpage/gaoptout</strong>.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="5. Transferencias internacionales">
        <p>
          Algunas cookies de terceros (Google, Meta) implican transferencias de
          datos a países fuera del Espacio Económico Europeo, principalmente a
          Estados Unidos. Estas transferencias se realizan con las garantías
          adecuadas: cláusulas contractuales tipo aprobadas por la Comisión
          Europea y/o adhesión al Marco de Privacidad de Datos UE-EE.UU.
        </p>
      </LegalSection>

      <LegalSection title="6. Más información">
        <p>
          Para más información sobre el tratamiento de datos personales derivado
          del uso de cookies, consulta nuestra{" "}
          <strong>Política de Privacidad</strong>. Si tienes alguna duda,
          contáctanos en <strong>privacidad@yulicolors.com</strong>.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
