"use client"

import { useState } from "react"
import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"

interface Service {
  name: string
  description: string
}

interface Category {
  id: string
  label: string
  tagline: string
  description: string
  services: Service[]
}

const WA_BASE =
  "https://wa.me/34622886878?text=Hola,%20me%20interesa%20el%20tratamiento%20de%20"

const categories: Category[] = [
  {
    id: "micropigmentacion",
    label: "Micropigmentación",
    tagline: "Arte y precisión para una belleza que perdura",
    description:
      "La micropigmentación es la técnica artística de mayor sofisticación en la estética facial. En YULI COLORS, cada sesión es un proceso completamente personalizado: analizamos tu anatomía, tono de piel y visión de belleza para diseñar un resultado que realce lo que ya eres, de forma natural y duradera.",
    services: [
      {
        name: "Micropigmentación de Cejas",
        description:
          "Pigmentación semipermanente que define y realza la forma natural de tus cejas. Técnica adaptada a tu morfología facial con resultados naturales que duran hasta dos años.",
      },
      {
        name: "Efecto Polvo",
        description:
          "Acabado suave y aterciopelado que recrea el look de unas cejas perfectamente maquilladas. Ideal para pieles mixtas y grasas con mayor durabilidad y un resultado más compacto.",
      },
      {
        name: "Microblading con Tebori y Máquina",
        description:
          "La técnica pelo a pelo más precisa del sector. Combinamos la maestría artesanal del tebori japonés con la consistencia digital para un efecto completamente hiperrealista.",
      },
      {
        name: "Cejas Mixtas",
        description:
          "La fusión perfecta entre efecto pelo a pelo y efecto polvo. Define el contorno con precisión máxima y aporta densidad volumétrica con un acabado de alta costura.",
      },
      {
        name: "Eyeliner Semipermanente",
        description:
          "Delineado semipermanente que intensifica y enmarca tu mirada sin esfuerzo cotidiano. Despierta cada mañana con una mirada definida, natural y perfecta.",
      },
      {
        name: "Micropigmentación de Labios",
        description:
          "Redefine, armoniza y colorea tus labios con pigmentos de alta duración. Acabado natural o más intenso — completamente adaptado a tu visión de belleza.",
      },
      {
        name: "Neutralización de Cejas y Labios",
        description:
          "Corrección especializada de micropigmentaciones anteriores con tonos no deseados. Recuperamos el equilibrio cromático natural mediante pigmentos neutros de máxima precisión.",
      },
      {
        name: "Paramedicales",
        description:
          "Técnicas avanzadas de pigmentación para areolas, cicatrices y zonas posquirúrgicas. Un enfoque humano, discreto y transformador con resultados naturales que devuelven la confianza.",
      },
    ],
  },
  {
    id: "cejas-pestanas",
    label: "Cejas & Pestañas",
    tagline: "Miradas que no necesitan presentación",
    description:
      "Nuestros tratamientos de cejas y pestañas están diseñados para realzar y definir tu mirada con la máxima precisión artesanal. Trabajamos con cada clienta de forma individual para encontrar el equilibrio perfecto entre estructura y naturalidad, definición y suavidad.",
    services: [
      {
        name: "Diseño de Cejas y Tinte",
        description:
          "Arquitectura facial personalizada basada en la geometría única de tu rostro. Diseñamos la forma ideal para tus facciones y aplicamos tinte de larga duración para un resultado perfectamente definido.",
      },
      {
        name: "Laminado de Cejas",
        description:
          "Tratamiento que peina, fija y nutre cada pelo para unas cejas voluminosas y perfectamente disciplinadas con un acabado digno de portada. El efecto dura hasta 8 semanas.",
      },
      {
        name: "Lifting de Pestañas",
        description:
          "Curvado semipermanente que eleva y abre la mirada de forma completamente natural. Sin extensiones ni máscaras — solo tus pestañas, magnificadas durante 6 a 8 semanas.",
      },
    ],
  },
  {
    id: "depilacion",
    label: "Depilación",
    tagline: "Suavidad duradera con la máxima precisión",
    description:
      "Ofrecemos las técnicas de depilación más efectivas y cuidadosas del sector. Desde la eliminación definitiva con láser hasta la precisión artesanal del hilo, cada método está completamente adaptado a las necesidades específicas de tu piel para el resultado más confortable y duradero.",
    services: [
      {
        name: "Depilación Láser",
        description:
          "Eliminación definitiva del vello con tecnología láser de última generación. Segura para todos los fototipos de piel, con resultados permanentes y la piel perfectamente suave que siempre has deseado.",
      },
      {
        name: "Depilación con Hilo",
        description:
          "Técnica oriental de precisión milimétrica para depilación facial y de cejas. Sin químicos, sin irritación — resultado limpio, preciso y de mayor duración que la depilación convencional.",
      },
      {
        name: "Depilación con Cera",
        description:
          "Depilación con ceras de alta gama que respetan al máximo la sensibilidad de la piel. Piel suave, sedosa y libre de vello durante semanas, con el mínimo disconfort.",
      },
    ],
  },
  {
    id: "facial",
    label: "Tratamientos Faciales",
    tagline: "Tecnología estética de vanguardia para tu piel más radiante",
    description:
      "Nuestros protocolos faciales y de tecnología estética avanzada están diseñados para abordar los signos del tiempo, las irregularidades del tono y la pérdida de firmeza con los tratamientos más efectivos y no invasivos del mercado. Cada sesión es una experiencia sensorial que transforma tu piel desde dentro.",
    services: [
      {
        name: "Tratamientos Faciales Personalizados",
        description:
          "Protocolos exclusivos de limpieza profunda, hidratación intensiva y luminosidad adaptados a las necesidades únicas de tu piel y estilo de vida. Una experiencia que se siente desde la primera sesión.",
      },
      {
        name: "IPL — Fotorrejuvenecimiento",
        description:
          "Tecnología de luz pulsada intensa que trata manchas, rojeces, couperosis y los primeros signos del envejecimiento de forma eficaz y completamente no invasiva.",
      },
      {
        name: "Radiofrecuencia",
        description:
          "Estimulación de colágeno mediante calor controlado y profundo. Piel más firme, redensificada y visiblemente más joven sin ningún procedimiento invasivo ni tiempo de recuperación.",
      },
      {
        name: "Eliminación de Tatuajes",
        description:
          "Remoción progresiva y segura con tecnología láser Q-switched. Tratamiento discreto, altamente eficaz y con el mínimo tiempo de recuperación posible.",
      },
    ],
  },
  {
    id: "bienestar",
    label: "Bienestar Corporal",
    tagline: "Rituales de cuidado que nutren cuerpo y mente",
    description:
      "Más allá de la estética, en YULI COLORS creemos en el bienestar integral. Nuestros rituales de masoterapia son un regalo para el cuerpo y la mente — diseñados para recuperar el equilibrio, la calma y la vitalidad que mereces tras el estrés cotidiano o una intervención estética.",
    services: [
      {
        name: "Masajes Relajantes",
        description:
          "Un ritual de bienestar profundo que libera la tensión acumulada y devuelve el equilibrio a cuerpo y mente. Técnicas combinadas adaptadas a tus zonas de mayor tensión.",
      },
      {
        name: "Masajes Posoperatorios",
        description:
          "Drenaje linfático y masoterapia especializada para optimizar los resultados de cirugías estéticas y acelerar la recuperación. Resultados más definidos, recuperación más rápida.",
      },
    ],
  },
]

export function ServicesSection() {
  const [activeId, setActiveId] = useState(categories[0].id)
  const [isVisible, setIsVisible] = useState(true)
  const { ref, isInView } = useInView({ threshold: 0.05 })

  const activeCategory = categories.find((c) => c.id === activeId)!

  const handleTabChange = (id: string) => {
    if (id === activeId) return
    setIsVisible(false)
    setTimeout(() => {
      setActiveId(id)
      setIsVisible(true)
    }, 160)
  }

  return (
    <section id="servicios" className="py-28 lg:py-40 bg-background">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">

        {/* Section header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <p className="text-primary text-xs tracking-[0.35em] uppercase font-light">
              Todos los Tratamientos
            </p>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-light text-foreground mb-5 text-balance leading-[1.15]">
            Una experiencia completa de belleza
          </h2>
          <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
            Explora nuestra cartera completa de tratamientos premium, organizados por
            especialidad para ayudarte a encontrar exactamente lo que necesitas.
          </p>
        </div>

        {/* Category tabs */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative mb-12">
            {/* Underline track */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
            <nav
              className="flex overflow-x-auto scrollbar-hide"
              aria-label="Categorías de tratamientos"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className={`flex-none px-5 lg:px-7 py-4 text-xs tracking-[0.15em] uppercase whitespace-nowrap border-b-2 transition-all duration-300 ${
                    activeId === cat.id
                      ? "border-primary text-foreground font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground/80"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`ml-2 text-[10px] font-light transition-colors duration-300 ${
                      activeId === cat.id ? "text-primary/60" : "text-muted-foreground/50"
                    }`}
                  >
                    {cat.id === "micropigmentacion"
                      ? "8"
                      : cat.id === "cejas-pestanas"
                      ? "3"
                      : cat.id === "depilacion"
                      ? "3"
                      : cat.id === "facial"
                      ? "4"
                      : "2"}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Category content — fades on tab switch */}
          <div
            className={`transition-opacity duration-150 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Category intro */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3 font-light leading-snug">
                  {activeCategory.tagline}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {activeCategory.description}
                </p>
              </div>
              <div className="flex lg:justify-end lg:items-start">
                <Link
                  href={`https://wa.me/34622886878?text=Hola,%20me%20gustaría%20saber%20más%20sobre%20los%20tratamientos%20de%20${encodeURIComponent(activeCategory.label)}%20en%20YULI%20COLORS`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border text-foreground/60 hover:border-primary hover:text-primary px-6 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-0.5 self-start"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5 flex-shrink-0"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Consultar categoría
                </Link>
              </div>
            </div>

            {/* Service cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {activeCategory.services.map((service, index) => (
                <div
                  key={service.name}
                  className="group relative bg-card border border-border/60 hover:border-primary/30 transition-all duration-400 hover:shadow-md hover:-translate-y-0.5 flex flex-col"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <div className="p-7 lg:p-8 flex flex-col flex-1">
                    {/* Service name */}
                    <h4 className="font-serif text-[1.05rem] text-foreground mb-3 leading-snug font-light group-hover:text-primary/90 transition-colors duration-300">
                      {service.name}
                    </h4>

                    {/* Description */}
                    <p className="text-muted-foreground text-[0.825rem] leading-relaxed flex-1">
                      {service.description}
                    </p>

                    {/* CTAs */}
                    <div className="flex items-center gap-5 pt-5 mt-5 border-t border-border/40">
                      <Link
                        href="#contacto"
                        className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-foreground/50 hover:text-primary transition-colors duration-300 group/link"
                      >
                        Reservar cita
                        <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href={`${WA_BASE}${encodeURIComponent(service.name)}%20en%20YULI%20COLORS`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-muted-foreground/45 hover:text-[#25D366] transition-colors duration-300"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3 flex-shrink-0"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        WhatsApp
                      </Link>
                    </div>
                  </div>

                  {/* Hover bottom accent */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section footer CTA */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-8 mt-16 pt-12 border-t border-border transition-all duration-1000 delay-400 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <p className="font-serif text-lg md:text-xl text-foreground font-light mb-1">
              ¿No sabes qué tratamiento es el ideal para ti?
            </p>
            <p className="text-muted-foreground text-sm">
              Nuestras especialistas te asesoran sin compromiso en una consulta personalizada.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Solicitar Valoración
            </Link>
            <Link
              href="https://wa.me/34622886878?text=Hola,%20me%20gustaría%20que%20me%20asesorasen%20sobre%20los%20tratamientos%20de%20YULI%20COLORS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-foreground/20 text-foreground/60 hover:border-[#25D366] hover:text-[#25D366] px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
