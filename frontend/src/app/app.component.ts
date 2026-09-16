import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface ServiceGroup {
  eyebrow: string;
  title: string;
  description: string;
  color: string;
  cards: { icon: string; title: string; description: string }[];
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly services: ServiceGroup[] = [
    {
      eyebrow: 'Presencia digital',
      title: 'Sitios Web Corporativos',
      description:
        'Ideal para que la gente conozca tu negocio, vea tu menú o catálogo y te contacte por WhatsApp.',
      color: 'blue',
      cards: [
        {
          icon: '✦',
          title: 'Diseño Premium',
          description:
            'Una imagen única que hace ver a tu negocio más profesional que la competencia.',
        },
        {
          icon: '↗',
          title: 'Velocidad Extrema',
          description: 'Tecnología moderna para que tu página cargue en menos de un segundo.',
        },
        {
          icon: '⌕',
          title: 'Aparece en Google',
          description: 'Optimización para conectar con clientes potenciales.',
        },
      ],
    },
    {
      eyebrow: 'Ventas automáticas',
      title: 'Tiendas en Línea',
      description: 'Deja de tomar pedidos manuales. Deja que el sistema venda por ti las 24 horas.',
      color: 'orange',
      cards: [
        {
          icon: '▣',
          title: 'Pagos con Tarjeta',
          description: 'Acepta pagos seguros directamente en tu sitio web.',
        },
        {
          icon: '▤',
          title: 'Gestión de Pedidos',
          description: 'Recibe los detalles de pedidos, dirección y productos vendidos.',
        },
        {
          icon: '◷',
          title: 'Ventas 24/7',
          description: 'Tu tienda sigue abierta incluso mientras duermes.',
        },
      ],
    },
    {
      eyebrow: 'Ingeniería de software',
      title: 'Web Apps / Sistemas',
      description: 'Herramientas a la medida para resolver problemas de tu operación diaria.',
      color: 'purple',
      cards: [
        {
          icon: '✓',
          title: 'Citas y Reservas',
          description: 'Permite que tus clientes elijan un horario disponible.',
        },
        {
          icon: '$',
          title: 'Cotizadores',
          description: 'Calcula precios exactos según las opciones elegidas.',
        },
        {
          icon: '▦',
          title: 'Panel de Control',
          description: 'Administra clientes, productos o servicios desde un panel privado.',
        },
      ],
    },
  ];
  readonly form;
  submitted = false;
  isSending = false;
  errorMessage = '';
  constructor(
    formBuilder: FormBuilder,
    private readonly http: HttpClient,
  ) {
    this.form = formBuilder.nonNullable.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
    });
  }
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSending = true;
    this.submitted = false;
    this.errorMessage = '';
    this.http
      .post('https://formspree.io/f/xdanlzbp', this.form.getRawValue(), {
        headers: { Accept: 'application/json' },
      })
      .subscribe({
        next: () => {
          this.submitted = true;
          this.isSending = false;
          this.form.reset();
        },
        error: () => {
          this.errorMessage = 'No pudimos enviar tu solicitud. Inténtalo de nuevo.';
          this.isSending = false;
        },
      });
  }
}
