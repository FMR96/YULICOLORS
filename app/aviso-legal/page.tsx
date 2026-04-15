import type { Metadata } from "next"
import {
  LegalLayout,
  LegalSection,
  LegalSubsection,
  LegalList,
  InfoBox,
} from "@/components/legal-layout"

export const metadata: Metadata = {
  title: "Aviso Legal | YULI COLORS",
  description:
    "Información legal sobre YULI COLORS conforme a la Ley 34/2002 de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE).",
  robots: { index: false, follow: true },
}

export default function AvisoLegalPage() {
  return (
    <LegalLayout
      badge="Legal"
      title="Aviso Legal"
      lastUpdated="2024-01-15"
    >
      <InfoBox>
        El presente Aviso Legal regula el uso del sitio web{" "}
        <strong>www.yulicolors.com</strong> conforme a la Ley 34/2002, de 11 de
        julio, de Servicios de la Sociedad de la Información y del Comercio
        Electrónico (LSSI-CE).
      </InfoBox>

      <LegalSection title="1. Datos identificativos">
        <p>
          En cumplimiento del artículo 10 de la LSSI-CE, se facilitan los
          siguientes datos del titular del sitio web:
        </p>
        <LegalList
          items={[
            "Denominación social: YULI COLORS, S.L.",
            "CIF/NIF: B-XXXXXXXX",
            "Domicilio social: Camas, Sevilla",
            "Teléfono: +34 622 886 878",
            "Correo electrónico: hola@yulicolors.es",
            "Sitio web: www.yulicolors.com",
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Objeto y ámbito de aplicación">
        <p>
          YULI COLORS pone a disposición de los usuarios el presente sitio web
          con el fin de informar sobre sus servicios de estética y belleza, y
          facilitar la comunicación y reserva de citas.
        </p>
        <p>
          El acceso y uso de este sitio web atribuye la condición de usuario e
          implica la aceptación plena y sin reservas de las presentes
          condiciones de uso en la versión publicada en el momento en que el
          usuario acceda al sitio web.
        </p>
      </LegalSection>

      <LegalSection title="3. Propiedad intelectual e industrial">
        <p>
          Todos los contenidos del sitio web —incluyendo textos, fotografías,
          gráficos, imágenes, tecnología, software, logotipos, marcas, nombres
          comerciales, sonidos, audio, vídeo, diseño gráfico y código fuente—
          son propiedad de YULI COLORS o de terceros que han autorizado su uso,
          y están protegidos por las leyes españolas e internacionales de
          propiedad intelectual e industrial.
        </p>
        <p>
          Queda expresamente prohibida la reproducción total o parcial, la
          distribución, la cesión o la comunicación pública de los contenidos de
          este sitio web sin la autorización previa y por escrito de YULI COLORS.
        </p>
      </LegalSection>

      <LegalSection title="4. Condiciones de uso">
        <LegalSubsection title="4.1 Uso permitido">
          <p>
            El usuario se compromete a utilizar el sitio web de conformidad con
            la ley, las presentes condiciones, la moral, las buenas costumbres y
            el orden público.
          </p>
        </LegalSubsection>
        <LegalSubsection title="4.2 Usos prohibidos">
          <p>Queda prohibido:</p>
          <LegalList
            items={[
              "Utilizar el sitio web con fines ilícitos o contrarios a las presentes condiciones.",
              "Introducir o difundir virus informáticos o cualquier otro sistema físico o lógico susceptible de provocar daños.",
              "Intentar acceder a cuentas de correo electrónico de otros usuarios o áreas restringidas.",
              "Vulnerar los derechos de propiedad intelectual o industrial de YULI COLORS.",
              "Reproducir, copiar, distribuir o explotar comercialmente los contenidos del sitio.",
            ]}
          />
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="5. Exclusión de garantías y responsabilidad">
        <p>
          YULI COLORS no garantiza la disponibilidad, continuidad ni
          infalibilidad del funcionamiento del sitio web y excluye cualquier
          responsabilidad por los daños y perjuicios de cualquier naturaleza que
          puedan deberse a la falta de disponibilidad o de continuidad del
          mismo.
        </p>
        <p>
          YULI COLORS no se responsabiliza de la veracidad, exactitud,
          exhaustividad o actualización de la información del sitio web, ni de
          los posibles daños o perjuicios derivados del uso de la información
          contenida en el mismo.
        </p>
        <p>
          Los enlaces a sitios web de terceros que pudieran contenerse en este
          sitio se ofrecen de buena fe, sin que YULI COLORS pueda hacerse
          responsable de los contenidos, informaciones o servicios que puedan
          aparecer en dichos sitios.
        </p>
      </LegalSection>

      <LegalSection title="6. Legislación aplicable y jurisdicción">
        <p>
          El presente Aviso Legal se rige en su totalidad por la legislación
          española. Para la resolución de cualquier controversia o conflicto
          derivado de la interpretación o cumplimiento de este Aviso Legal,
          las partes se someten a los Juzgados y Tribunales de Madrid (España),
          con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
        </p>
      </LegalSection>

      <LegalSection title="7. Modificaciones">
        <p>
          YULI COLORS se reserva el derecho de efectuar, en cualquier momento y
          sin previo aviso, modificaciones y actualizaciones de la información
          contenida en el sitio web o en su configuración. Se recomienda
          verificar periódicamente la fecha de última actualización de este
          documento.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
